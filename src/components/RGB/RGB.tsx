import { classNames, type RGB as RGBType } from '@tma.js/sdk';
import { splitProps } from 'solid-js';
import type { Component, JSX } from 'solid-js';

import './RGB.css';

export type RGBProps = JSX.IntrinsicElements['div'] & {
  color: RGBType;
};

export const RGB: Component<RGBProps> = (props) => (
  <span {...splitProps(props, ['class'])[0]} class={classNames('rgb', props.class)}>
    <i class="rgb__icon" style={{ 'background-color': props.color }}/>
    {props.color}
  </span>
);
