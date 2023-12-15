import { SDKProvider, DisplayGate } from '@tma.js/sdk-solid';
import { App } from './App';
import { setDebug } from '@tma.js/sdk';

interface SDKProviderErrorProps {
  error: unknown;
}

function SDKProviderError(props: SDKProviderErrorProps) {
  const message = () => {
    return props.error instanceof Error
      ? props.error.message
      : JSON.stringify(props.error);
  };

  return (
    <div>
      Oops. Something went wrong.
      <blockquote>
        <code>
          {message()}
        </code>
      </blockquote>
    </div>
  );
}

function SDKProviderLoading() {
  return <div>SDK is loading.</div>;
}

function SDKInitialState() {
  return <div>Waiting for initialization to start.</div>;
}

/**
 * Root component of the whole project.
 */
export function Root() {
  // Enable debug mode.
  setDebug(true);

  return (
    <SDKProvider
      options={{
        async: true,
        cssVars: true,
        acceptCustomStyles: true,
      }}
    >
      <DisplayGate
        error={SDKProviderError}
        loading={SDKProviderLoading}
        initial={SDKInitialState}
      >
        <App/>
      </DisplayGate>
    </SDKProvider>
  );
}