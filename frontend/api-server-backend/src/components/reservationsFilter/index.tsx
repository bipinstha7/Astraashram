'use client';

import { useState } from 'react';
import { format } from 'date-fns';

import Button from '../ui/button';
import TextInput from '../ui/form/textInput';
import Calendar from '@/components/ui/date/calendar';
import SelectInput from '@/components/ui/form/select';
import styles from './reservationsFilter.module.scss';
import { DatePicker } from '@/components/ui/date/date';
import searchIcon from '/public/icons/search.svg';
import MobileFilter from '../mobileFilter';

const propertyOptions = [
  { name: 'All', value: 'all' },
  { name: 'Property 1', value: 'Property 1' },
  { name: 'Property 2', value: 'Property 2' },
  { name: 'Property 3', value: 'Property 3' },
];

interface iFilter {
  textLabel: string;
}

const dateInputStyles = { inputStyles: { width: '100%', border: '1px solid #E0E0E0' } };

export default function Filter(props: iFilter) {
  const [property, setProperty] = useState('all');
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);

  const { textLabel } = props;

  return (
    <div className={styles.filter_wrapper}>
      <div className={styles.search}>
        <TextInput
          showIcon
          name="search"
          label={textLabel}
          icon={searchIcon}
          iconPosition="left"
          className={styles.search_input}
          inputStyles={{ '--input-bg-color': '#fff', '--border-color': '#CDCDCD' }}
        />
        <div className={styles.add_button}>
          <Button icon="&#43;" text="Add" />
        </div>
      </div>

      <div className={styles.select_wrapper}>
        <div className={styles.select_properties}>
          <SelectInput
            selected={property}
            onSelect={setProperty}
            showValueAndPlaceholder
            options={propertyOptions}
            triggerStyles={{ '--width': '100%' }}
            placeholder="Real estate properties"
          />
        </div>
        <div className={styles.date_picker}>
          <DatePicker
            {...dateInputStyles}
            dateSelected={!!fromDate}
            inputText={fromDate ? format(fromDate, 'LLL dd, y') : 'Start Date'}
          >
            <Calendar
              mode="single"
              initialFocus
              selected={fromDate}
              classNames={{ month: '' }}
              onSelect={date => setFromDate(date)}
            />
          </DatePicker>
        </div>
        <div className={styles.date_picker}>
          <DatePicker
            {...dateInputStyles}
            dateSelected={!!toDate}
            inputText={toDate ? format(toDate, 'LLL dd, y') : 'End Date'}
          >
            <Calendar
              mode="single"
              initialFocus
              selected={toDate}
              classNames={{ month: '' }}
              onSelect={date => setToDate(date)}
            />
          </DatePicker>
        </div>
        <button className={styles.reset}>Reset</button>
      </div>
      <div className={styles.mobile_filter}>
        <MobileFilter>
          <SelectInput
            selected={property}
            onSelect={setProperty}
            showValueAndPlaceholder
            options={propertyOptions}
            triggerStyles={{ '--width': '100%' }}
            placeholder="Real estate properties"
          />
          <DatePicker
            {...dateInputStyles}
            dateSelected={!!fromDate}
            inputText={fromDate ? format(fromDate, 'LLL dd, y') : 'Start Date'}
          >
            <Calendar
              mode="single"
              initialFocus
              selected={fromDate}
              classNames={{ month: '' }}
              onSelect={date => setFromDate(date)}
            />
          </DatePicker>
          <DatePicker
            {...dateInputStyles}
            dateSelected={!!toDate}
            inputText={toDate ? format(toDate, 'LLL dd, y') : 'End Date'}
          >
            <Calendar
              mode="single"
              initialFocus
              selected={toDate}
              classNames={{ month: '' }}
              onSelect={date => setToDate(date)}
            />
          </DatePicker>
        </MobileFilter>
      </div>
    </div>
  );
}
