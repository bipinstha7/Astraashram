'use client';

import Image from 'next/image';
import { useState } from 'react';

import Badge from '../ui/badge';
import SelectInput from '../ui/form/select';
import pdfIcon from '/public/icons/pdf.svg';
import styles from './intervalFilter.module.scss';
import { DatePickerWithRange } from '../ui/date/date-picker-range';

export default function IntervalFilter({ hideDay }: { hideDay?: Boolean }) {
  const intervals = [
    { name: 'Week', value: 'week' },
    { name: 'Month', value: 'month' },
    { name: 'Year', value: 'year' },
  ];
  if (!hideDay) intervals.unshift({ name: 'Day', value: 'day' });

  const [selectedInterval, setSelectedInterval] = useState<{
    value: string;
    data?: {};
    name?: string;
  }>(intervals[0]);

  return (
    <div className={styles.intervals_section}>
      <section className={styles.mobile_intervals}>
        <SelectInput
          hideBorder
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
        <div>
          <DatePickerWithRange
            handleDate={setSelectedInterval}
            dateSelected={selectedInterval.value === 'custom'}
          />
        </div>
      </section>
      <a href="" className={styles.download_pdf}>
        <Image src={pdfIcon} alt="pdf-icon" />
        <span>Dowload PDF</span>
      </a>
    </div>
  );
}
