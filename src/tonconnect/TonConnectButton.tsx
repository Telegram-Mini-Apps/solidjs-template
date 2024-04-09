import { onCleanup, onMount } from 'solid-js';
import type { Component } from 'solid-js';

import { useTonConnectUI } from '~/tonconnect/TonConnectUIContext.js';

export const TonConnectButton: Component = () => {
  const [_, { setUIOptions }] = useTonConnectUI();
  const buttonRootId = 'ton-connect-button';

  onMount(() => {
    setUIOptions({ buttonRootId });
  });

  onCleanup(() => {
    setUIOptions({ buttonRootId: null });
  });

  return <div id={buttonRootId} style={{ width: 'fit-content' }}/>;
};
