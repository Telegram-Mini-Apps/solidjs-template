import { initData, type User, useSignal } from '@telegram-apps/sdk-solid';
import { createMemo, Show, type Component } from 'solid-js';

import {
  DisplayData,
  type DisplayDataRow,
} from '@/components/DisplayData/DisplayData.js';
import { Link } from '@/components/Link/Link.js';
import { Page } from '@/components/Page/Page.js';

import './InitDataPage.css';

function getUserRows(user: User): DisplayDataRow[] {
  return [
    { title: 'id', value: user.id.toString() },
    { title: 'username', value: user.username },
    { title: 'photo_url', value: user.photoUrl },
    { title: 'last_name', value: user.lastName },
    { title: 'first_name', value: user.firstName },
    { title: 'is_bot', value: user.isBot },
    { title: 'is_premium', value: user.isPremium },
    { title: 'language_code', value: user.languageCode },
    { title: 'allows_to_write_to_pm', value: user.allowsWriteToPm },
    { title: 'added_to_attachment_menu', value: user.addedToAttachmentMenu },
  ];
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
    const {
      authDate,
      hash,
      queryId,
      chatType,
      chatInstance,
      canSendAfter,
      startParam,
    } = state;
    return [
      { title: 'raw', value: raw },
      { title: 'auth_date', value: authDate.toLocaleString() },
      { title: 'auth_date (raw)', value: authDate.getTime() / 1000 },
      { title: 'hash', value: hash },
      { title: 'can_send_after', value: initData.canSendAfterDate()?.toISOString() },
      { title: 'can_send_after (raw)', value: canSendAfter },
      { title: 'query_id', value: queryId },
      { title: 'start_param', value: startParam },
      { title: 'chat_type', value: chatType },
      { title: 'chat_instance', value: chatInstance },
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
      ? [
        { title: 'id', value: chat.id.toString() },
        { title: 'title', value: chat.title },
        { title: 'type', value: chat.type },
        { title: 'username', value: chat.username },
        { title: 'photo_url', value: chat.photoUrl },
      ]
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
