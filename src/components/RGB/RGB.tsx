import type { RGB as RGBType } from '@tma.js/sdk-solid';
import { type Component, type JSX, splitProps } from 'solid-js';

import { classNames } from '@/css/classnames.js';

import './RGB.css';

export type RGBProps = JSX.IntrinsicElements['span'] & {
  color: RGBType;
};

export const RGB: Component<RGBProps> = (props) => (
  <span {...splitProps(props, ['class'])[0]} class={classNames('rgb', props.class)}>
    <i class="rgb__icon" style={{ 'background-color': props.color }} />
    {props.color}
  </span>
);
