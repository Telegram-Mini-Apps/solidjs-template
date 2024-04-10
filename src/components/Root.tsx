import { setDebug } from '@tma.js/sdk';
import { DisplayGate, SDKProvider, useLaunchParams } from '@tma.js/sdk-solid';
import type { Component } from 'solid-js';

import { App } from '~/components/App.js';
import { TonConnectUIProvider } from '~/tonconnect/TonConnectUIProvider.js';

const Err: Component<{ error: unknown }> = (props) => (
  <div>
    <p>An error occurred while initializing the SDK</p>
    <blockquote>
      <code>
        {props.error instanceof Error
          ? props.error.message
          : JSON.stringify(props.error)}
      </code>
    </blockquote>
  </div>
);

const Loading: Component = () => (
  <div>Application is loading</div>
);

export const Root: Component = () => {
  if (useLaunchParams().startParam === 'debug') {
    setDebug(true);
    import('eruda').then((lib) => lib.default.init());
  }

  return (
    <TonConnectUIProvider
      manifestUrl={new URL('tonconnect-manifest.json', window.location.href).toString()}
    >
      <SDKProvider options={{ acceptCustomStyles: true, cssVars: true, complete: true }}>
        <DisplayGate error={Err} loading={Loading} initial={Loading}>
          <App/>
        </DisplayGate>
      </SDKProvider>
    </TonConnectUIProvider>
  );
};
