import { initData, type User, useSignal } from '@tma.js/sdk-solid';
import { createMemo, Show, type Component } from 'solid-js';

import {
  DisplayData,
  type DisplayDataRow,
} from '@/components/DisplayData/DisplayData.js';
import { Link } from '@/components/Link/Link.js';
import { Page } from '@/components/Page/Page.js';

import './InitDataPage.css';

function getUserRows(user: User): DisplayDataRow[] {
  return Object.entries(user).map(([title, value]) => ({ title, value }));
}

export const InitDataPage: Component = () => {
  const initDataState = useSignal(initData.state);
  const initDataRaw = useSignal(initData.raw);

  const initDataRows = createMemo<DisplayDataRow[] | undefined>(() => {
    const state = initDataState();
    const raw = initDataRaw();
    if (!state || !raw) {
      return;
    }
    return [
      { title: 'raw', value: raw },
      ...Object.entries(initDataState).reduce<DisplayDataRow[]>((acc, [title, value]) => {
        if (value instanceof Date) {
          acc.push({ title, value: value.toISOString() });
        } else if (!value || typeof value !== 'object') {
          acc.push({ title, value });
        }
        return acc;
      }, []),
    ];
  });

  const userRows = createMemo<DisplayDataRow[] | undefined>(() => {
    const user = initDataState()?.user;
    return user ? getUserRows(user) : undefined;
  });

  const receiverRows = createMemo<DisplayDataRow[] | undefined>(() => {
    const receiver = initDataState()?.receiver;
    return receiver ? getUserRows(receiver) : undefined;
  });

  const chatRows = createMemo<DisplayDataRow[] | undefined>(() => {
    const chat = initDataState()?.chat;
    return chat
      ? Object.entries(chat).map(([title, value]) => ({ title, value }))
      : undefined;
  });

  return (
    <Page
      title="Init Data"
      disclaimer={(
        <>
          This page displays application
          {' '}
          <Link href="https://docs.telegram-mini-apps.com/platform/init-data">
            init data
          </Link>
          .
        </>
      )}
    >
      <Show
        when={initDataRows()}
        fallback={<i>Application was launched with missing init data</i>}
      >
        {(rows) => (
          <>
            <div class="init-data-page__section">
              <h2 class="init-data-page__section-title">Init data</h2>
              <DisplayData rows={rows()}/>
            </div>

            <div class="init-data-page__section">
              <h2 class="init-data-page__section-title">User</h2>
              <Show when={userRows()}
                    fallback={<i>User information missing</i>}>
                {(uRows) => <DisplayData rows={uRows()}/>}
              </Show>
            </div>

            <div class="init-data-page__section">
              <h2 class="init-data-page__section-title">Receiver</h2>
              <Show when={receiverRows()}
                    fallback={<i>Receiver information missing</i>}>
                {(rRows) => <DisplayData rows={rRows()}/>}
              </Show>
            </div>

            <div class="init-data-page__section">
              <h2 class="init-data-page__section-title">Chat</h2>
              <Show when={chatRows()}
                    fallback={<i>Chat information missing</i>}>
                {(cRows) => <DisplayData rows={cRows()}/>}
              </Show>
            </div>
          </>
        )}
      </Show>
    </Page>
  );
};
