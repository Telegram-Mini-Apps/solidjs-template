import { TonConnectUI } from '@tonconnect/ui';
import { createMemo } from 'solid-js';
import type { TonConnectUiOptions } from '@tonconnect/ui';
import type { Component, ParentProps } from 'solid-js';

import { TonConnectUIContext } from '~/tonconnect/TonConnectUIContext.js';

export interface TonConnectUIProviderProps extends ParentProps {
  manifestUrl: string;
}

export const TonConnectUIProvider: Component<TonConnectUIProviderProps> = (props) => {
  const tonConnectUI = createMemo(() => {
    return new TonConnectUI({
      manifestUrl: props.manifestUrl,
    });
  });

  return (
    <TonConnectUIContext.Provider
      value={[
        tonConnectUI,
        {
          setUIOptions(options: TonConnectUiOptions) {
            tonConnectUI().uiOptions = options;
          },
        },
      ]}
    >
      {props.children}
    </TonConnectUIContext.Provider>
  );
};
