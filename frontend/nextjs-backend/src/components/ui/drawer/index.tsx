'use client';

// import * as React from 'react';
import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';

import styles from './drawer.module.scss';
import hamburgerIcon from '/public/icons/hamburger.svg';
import arrowLeftIcon from '/public/icons/arrow-left.svg';

interface iDrawer {
  children: JSX.Element;
}

export default function Drawer({ children }: iDrawer) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className={styles.hamburger_icon}>
          <Image src={hamburgerIcon} alt="hamburger-icon" />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialog_overlay} />
        <Dialog.Content className={styles.dialog_content}>
          <Dialog.Title></Dialog.Title>
          <Dialog.Description></Dialog.Description>
          <Dialog.Close asChild>
            <button className={styles.close_icon}>
              <Image src={arrowLeftIcon} alt="arrow-left-icon" />
            </button>
          </Dialog.Close>

          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
