import Image from 'next/image';
import { MouseEventHandler, ReactNode } from 'react';

import styles from './badge.module.scss';

interface iBadge {
  dynamicIcon?: Boolean;
  text: string | ReactNode;
  icon?: string | ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;

  customStyles?: {
    '--gap'?: string;
    '--padding'?: string;
    '--text-color'?: string;
    '--border-radius'?: string;
    '--text-font-size'?: string;
    '--background-color'?: string;
    '--text-font-weight'?: number;
  };
}

export default function Badge(props: iBadge) {
  return (
    <div
      onClick={props.onClick}
      className={styles.badge}
      style={props.customStyles as React.CSSProperties}
    >
      <span className={styles.text}>{props.text}</span>
      {props.icon ? (
        props.dynamicIcon ? (
          props.icon
        ) : (
          <Image src={props.icon as string} alt="calendar-icon" />
        )
      ) : null}
    </div>
  );
}
