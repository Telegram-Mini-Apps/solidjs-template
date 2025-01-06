import { retrieveLaunchParams } from '@telegram-apps/sdk-solid';
import { ErrorBoundary, type Component, Switch, Match } from 'solid-js';

import { App } from '@/components/App.js';
import { TonConnectUIProvider } from '@/tonconnect/TonConnectUIProvider.js';
import { publicUrl } from '@/helpers/publicUrl.js';

const Inner: Component = () => {
  const debug = retrieveLaunchParams().startParam === 'debug';
  if (debug) {
    import('eruda').then((lib) => lib.default.init());
  }

  return (
    <TonConnectUIProvider manifestUrl={publicUrl('tonconnect-manifest.json')}>
      <App/>
    </TonConnectUIProvider>
  );
};

export const Root: Component = () => {
  return (
    <ErrorBoundary
      fallback={err => {
        console.error('ErrorBoundary handled error:', err);

        return (
          <div>
            <p>ErrorBoundary handled error:</p>
            <blockquote>
              <code>
                <Switch fallback={JSON.stringify(err)}>
                  <Match when={typeof err === 'string' ? err : false}>
                    {v => v()}
                  </Match>
                  <Match when={err instanceof Error ? err.message : false}>
                    {v => v()}
                  </Match>
                </Switch>
              </code>
            </blockquote>
          </div>
        );
      }}
    >
      <Inner/>
    </ErrorBoundary>
  );
};
