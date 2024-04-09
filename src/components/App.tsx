import { Navigate, Route } from '@solidjs/router';
import { For, onCleanup } from 'solid-js';

import { createNavigator } from '~/navigation/createNavigator.js';
import { createRouter } from '~/navigation/createRouter.js';
import { routes } from '~/navigation/routes.js';

export function App() {
  // Create new application navigator and attach it to the browser history, so it could modify
  // it and listen to its changes.
  const navigator = createNavigator();
  void navigator.attach();

  onCleanup(() => {
    navigator.detach();
  });

  const Router = createRouter(navigator);

  return (
    <Router>
      <For each={routes}>
        {(route) => <Route path={route.path} component={route.Component}/>}
      </For>
      <Route path="*" component={() => <Navigate href={'/'}/>}/>
    </Router>
  );
}
