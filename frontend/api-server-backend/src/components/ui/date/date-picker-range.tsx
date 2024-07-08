'use client';

import { addDays, format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import React, { Dispatch, SetStateAction } from 'react';

import Calendar from './calendar';
import { DatePicker } from './date';

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
    <DatePicker
      dateSelected={dateSelected}
      inputText={
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
    >
      <Calendar
        mode="range"
        initialFocus
        selected={date}
        numberOfMonths={2}
        onSelect={handleSetDate}
      />
    </DatePicker>
  );
}
