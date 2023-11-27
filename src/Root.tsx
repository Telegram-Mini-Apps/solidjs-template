import {
  createMemo,
  Switch,
  Match,
  type ParentProps,
} from 'solid-js';
import { InitOptions, SDKProvider, useSDKContext } from '@tma.js/sdk-solid';
import { App } from './App';
import { setDebug } from '@tma.js/sdk';

/**
 * This component is the layer controlling the application display.
 * It displays application in case, the SDK is initialized, displays an error
 * if something went wrong, and a loader if the SDK is warming up.
 */
function Loader(props: ParentProps) {
  const {
    loading,
    error,
    initResult,
  } = useSDKContext();
  const errorMessage = createMemo(() => {
    const err = error();
    if (!err) {
      return null;
    }

    return err instanceof Error ? err.message : 'Unknown error';
  });

  return (
    <Switch fallback={props.children}>
      <Match when={errorMessage()}>
        <p>
          SDK was unable to initialize. Probably, current application
          is being used not in Telegram Mini Apps environment.
        </p>
        <blockquote>
          <p>{errorMessage()}</p>
        </blockquote>
      </Match>
      <Match when={loading()}>
        <div>Loading..</div>
      </Match>
      <Match when={!loading() && !error() && !initResult()}>
        <div>SDK init function is not yet called.</div>
      </Match>
    </Switch>
  );
}

/**
 * Root component of the whole project.
 */
export function Root() {
  const options: InitOptions = {
    async: true,
    cssVars: true,
    acceptCustomStyles: true,
  };

  // Enable debug mode.
  setDebug(true);

  return (
    <SDKProvider options={options}>
      <Loader>
        <App/>
      </Loader>
    </SDKProvider>
  );
}