'use client';

import React from 'react';
import * as Popover from '@radix-ui/react-popover';

import styles from './date.module.scss';
import Badge from '@/components/ui/badge';
import CalendarIcon from '../../../../public/icons/calendar';

interface iDatePicker {
  dateSelected: Boolean;
  children: React.ReactNode;
  inputText: string | JSX.Element;
  inputStyles?: {
    width?: string;
    border?: string;
    justifyContent?: string;
  };
}

export function DatePicker({ dateSelected, inputText, children, inputStyles }: iDatePicker) {
  return (
    <Popover.Root>
      <Popover.Anchor asChild>
        <Popover.Trigger className={styles.date_picker_popover_trigger}>
          <Badge
            dynamicIcon
            text={inputText}
            icon={<CalendarIcon color={dateSelected ? '#fff' : undefined} />}
            customStyles={{
              '--padding': '8px 16px',
              '--border': inputStyles?.border || 'none',
              '--border-radius': '10px',
              '--text-font-weight': 400,
              '--text-font-size': '0.87578rem',
              '--width': inputStyles?.width || '264px',
              '--justify-content': inputStyles?.justifyContent || 'space-between',
              '--text-color': dateSelected ? '#fff' : '#6E6E6E',
              '--background-color': dateSelected ? 'var(--primary-bg-color)' : '#fff',
            }}
          />
        </Popover.Trigger>
      </Popover.Anchor>
      <Popover.Portal>
        <Popover.Content align="start" className={styles.date_picker_popover_content}>
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
