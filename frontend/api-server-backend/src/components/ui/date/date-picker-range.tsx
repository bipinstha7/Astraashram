'use client';

import { addDays, format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import * as Popover from '@radix-ui/react-popover';
import React, { Dispatch, SetStateAction } from 'react';

import Calendar from './calendar';
import Badge from '@/components/badge';
import styles from './date.module.scss';
import CalendarIcon from '../../../../public/icons/calendar';

interface iDatePickerWithRange {
  handleDate: Dispatch<
    SetStateAction<{
      value: string;
      data?: {} | undefined;
    }>
  >;
  dateSelected: Boolean;
}

export function DatePickerWithRange({ handleDate, dateSelected }: iDatePickerWithRange) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });

  const handleSetDate = (date: any) => {
    setDate(date);
    handleDate({ value: 'custom', data: date });
  };

  return (
    <div>
      <Popover.Root>
        <Popover.Anchor asChild>
          <Popover.Trigger className={styles.date_picker_range_popover_trigger}>
            <Badge
              dynamicIcon
              icon={<CalendarIcon color={dateSelected ? '#fff' : undefined} />}
              text={
                date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  'Pick a date'
                )
              }
              customStyles={{
                '--padding': '8px 16px',
                '--border-radius': '10px',
                '--text-font-weight': 400,
                '--text-font-size': '0.87578rem',
                '--text-color': dateSelected ? '#fff' : '#6E6E6E',
                '--background-color': dateSelected ? 'var(--primary-bg-color)' : '#fff',
              }}
            />
          </Popover.Trigger>
        </Popover.Anchor>
        <Popover.Portal>
          <Popover.Content align="start" className={styles.date_picker_popover_content}>
            <Calendar
              mode="range"
              initialFocus
              selected={date}
              pagedNavigation
              numberOfMonths={2}
              onSelect={handleSetDate}
              defaultMonth={date?.from}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
