/* @refresh reload */
import { setDebug } from '@tma.js/sdk';
import { render } from 'solid-js/web';

import { Root } from '~/components/Root.js';

import './index.css';

// Enable SDK debug mode to see all the TMA API calls.
setDebug(true);

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => (<Root/>), root!);
