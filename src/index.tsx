/* @refresh reload */
import { render } from 'solid-js/web';
import { retrieveLaunchParams } from '@tma.js/sdk-solid';

import { Root } from '@/components/Root.js';
import { init } from '@/init.js';

import './index.css';

// Mock the environment in case, we are outside Telegram.
import './mockEnv.js';

try {
  const launchParams = retrieveLaunchParams();
  const { tgWebAppPlatform: platform } = launchParams;
  const debug = (launchParams.tgWebAppStartParam || '').includes('debug')
    || import.meta.env.DEV;

  // Configure all application dependencies.
  await init({
    debug,
    eruda: debug && ['ios', 'android'].includes(platform),
    mockForMacOS: platform === 'macos',
  })
    .then(() => {
      const root = document.getElementById('root');

      if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
        throw new Error(
          'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
        );
      }

      render(() => (<Root />), root!);
    });
} catch (e) {
  // Handling the issue is on you :)
}


