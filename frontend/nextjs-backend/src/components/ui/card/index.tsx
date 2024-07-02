import Image from 'next/image';
import { CSSProperties } from 'react';

import styles from './card.module.scss';
import arrowUpIcon from '/public/icons/arrow-up.svg';

interface iCard {
  header: String;
  body: string;
  footer: string;
  icon?: string;
  footerStyles?: {
    '--footer-color'?: string;
  };
}

export default function Card({ header, body, footer, icon, footerStyles }: iCard) {
  return (
    <div className={styles.card}>
      <section className={styles.card_header}>
        <span className={styles.card_header_text}>{header}</span>
      </section>
      <section className={styles.card_body}>
        <span>{body}</span>
      </section>
      <section className={styles.card_footer} style={footerStyles as CSSProperties | undefined}>
        <Image src={icon || arrowUpIcon} alt="pdf-icon" /> <span>{footer}</span>
      </section>
    </div>
  );
}
