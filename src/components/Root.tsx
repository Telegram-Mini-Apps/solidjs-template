import { ErrorBoundary, type Component, Switch, Match } from 'solid-js';

import { App } from '@/components/App.js';
import { TonConnectUIProvider } from '@/tonconnect/TonConnectUIProvider.js';
import { publicUrl } from '@/helpers/publicUrl.js';

function ErrorBoundaryError(props: { error: unknown }) {
  return (
    <div>
      <p>ErrorBoundary handled error:</p>
      <blockquote>
        <code>
          <Switch fallback={JSON.stringify(props.error)}>
            <Match when={typeof props.error === 'string' ? props.error : false}>
              {v => v()}
            </Match>
            <Match
              when={props.error instanceof Error ? props.error.message : false}>
              {v => v()}
            </Match>
          </Switch>
        </code>
      </blockquote>
    </div>
  );
}

export const Root: Component = () => {
  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <TonConnectUIProvider manifestUrl={publicUrl('tonconnect-manifest.json')}>
        <App/>
      </TonConnectUIProvider>
    </ErrorBoundary>
  );
};
