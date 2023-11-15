import {
  Routes,
  Route,
  Navigate,
  Router,
} from '@solidjs/router';
import { createIntegration } from '@tma.js/solid-router-integration';

import { InitDataPage } from './pages/InitDataPage';
import { ThemeParamsPage } from './pages/ThemeParamsPage';

import { createNavigator } from './createNavigator';

export function App() {
  // We should create navigator to pass it to integration creation.
  const navigator = createNavigator();

  // Then, to allow this navigator update current browser history, we should attach it. Otherwise,
  // it will work in memory mode.
  void navigator.attach();

  return (
    <Router source={createIntegration(() => navigator)}>
      <Routes>
        <Route path={'/init-data'} component={InitDataPage}/>
        <Route path={'/theme-params'} component={ThemeParamsPage}/>
        <Route path={'*'} element={<Navigate href={'/init-data'}/>}/>
      </Routes>
    </Router>
  );
}