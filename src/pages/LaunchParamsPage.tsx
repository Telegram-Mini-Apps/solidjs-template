import { retrieveLaunchParams } from '@tma.js/sdk-solid';
import type { Component } from 'solid-js';

import { DisplayData } from '@/components/DisplayData/DisplayData.js';
import { Link } from '@/components/Link/Link.js';
import { Page } from '@/components/Page/Page.js';

export const LaunchParamsPage: Component = () => {
  const lp = retrieveLaunchParams();

  return (
    <Page
      title="Launch Params"
      disclaimer={(
        <>
          This page displays application
          {' '}
          <Link href="https://docs.telegram-mini-apps.com/platform/launch-parameters">
            launch parameters
          </Link>
          .
        </>
      )}
    >
      <DisplayData
        rows={[
          { title: 'tgWebAppPlatform', value: lp.tgWebAppPlatform },
          { title: 'tgWebAppShowSettings', value: lp.tgWebAppShowSettings },
          { title: 'tgWebAppVersion', value: lp.tgWebAppVersion },
          { title: 'tgWebAppBotInline', value: lp.tgWebAppBotInline },
          { title: 'tgWebAppStartParam', value: lp.tgWebAppStartParam },
          { title: 'tgWebAppData', value: <Link href="/init-data">View</Link> },
          { title: 'tgWebAppThemeParams', value: <Link href="/theme-params">View</Link> },
        ]}
      />
    </Page>
  );
};
