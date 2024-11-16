/* @refresh reload */
import { render } from 'solid-js/web';
import { retrieveLaunchParams } from '@telegram-apps/sdk-solid';

import { Root } from '@/components/Root.js';
import { init } from '@/init.js';

import './index.css';

// Mock the environment in case, we are outside Telegram.
import './mockEnv.js';

// Configure all application dependencies.
init(retrieveLaunchParams().startParam === 'debug' || import.meta.env.DEV);

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => (<Root/>), root!);

