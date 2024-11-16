import {
  type Component,
  createEffect,
  createMemo,
  type JSX,
  type ParentProps,
} from 'solid-js';
import { backButton } from '@telegram-apps/sdk-solid';

import { useNavigate } from '@solidjs/router';

import './Page.css';

export interface PageProps extends ParentProps {
  title: string;
  disclaimer?: JSX.Element;
  /**
   * True if it is allowed to go back from this page.
   * @default true
   */
  back?: boolean;
}

export const Page: Component<PageProps> = (props) => {
  const navigate = useNavigate();
  const back = createMemo(() => typeof props.back === 'boolean' ? props.back : true);

  createEffect(() => {
    if (back()) {
      backButton.show();
      return backButton.onClick(() => {
        navigate(-1);
      });
    }
    backButton.hide();
  });

  return (
    <div class="page">
      <h1>{props.title}</h1>
      {props.disclaimer && <div class="page__disclaimer">{props.disclaimer}</div>}
      {props.children}
    </div>
  );
};
