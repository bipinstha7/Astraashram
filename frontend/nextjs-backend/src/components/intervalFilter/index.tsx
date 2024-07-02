'use client';

import { useState } from 'react';

import Badge from '../badge';
import styles from './intervalFilter.module.scss';
import { DatePickerWithRange } from '../ui/date/date-picker-range';
import SelectInput from '../ui/form/select';

const intervals = [
  { name: 'Day', value: 'day' },
  { name: 'Week', value: 'week' },
  { name: 'Month', value: 'month' },
  { name: 'Year', value: 'year' },
];

export default function IntervalFilter() {
  const [selectedInterval, setSelectedInterval] = useState<{
    value: string;
    data?: {};
    name?: string;
  }>(intervals[0]);

  return (
    <>
      <section className={styles.mobile_intervals}>
        <SelectInput
          options={intervals}
          onSelect={data => setSelectedInterval({ value: data })}
          showValueAndPlaceholder={true}
          placeholder="Filter by interval"
          selected={selectedInterval.value}
        />
      </section>
      <section className={styles.intervals}>
        {intervals.map(interval => (
          <Badge
            key={interval.value}
            text={interval.name}
            customStyles={{
              '--padding': '8px 16px',
              '--border-radius': '10px',
              '--text-font-weight': 400,
              '--text-font-size': '0.875rem',
              '--text-color': selectedInterval.value === interval.value ? '#fff' : '#6E6E6E',
              '--background-color':
                selectedInterval.value === interval.value ? 'var(--primary-bg-color)' : '#fff',
            }}
            onClick={() => setSelectedInterval(interval)}
          />
        ))}
        <DatePickerWithRange
          handleDate={setSelectedInterval}
          dateSelected={selectedInterval.value === 'custom'}
        />
      </section>
    </>
  );
}
