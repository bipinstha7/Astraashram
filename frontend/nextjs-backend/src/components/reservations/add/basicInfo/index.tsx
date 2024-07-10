'use client';

import { useState } from 'react';
import { format } from 'date-fns';

import styles from './basicInfo.module.scss';
import Calendar from '@/components/ui/date/calendar';
import SelectInput from '@/components/ui/form/select';
import { DatePicker } from '@/components/ui/date/date';

const propertyOptions = [
  { name: 'All', value: 'all' },
  { name: 'Apartment 1', value: 'Apartment 1' },
  { name: 'Apartment 2', value: 'Apartment 2' },
  { name: 'Apartment 3', value: 'Apartment 3' },
];
const serviceOptions = [
  { name: 'All', value: 'all' },
  { name: 'AirBNB Avg', value: 'AirBNB Avg' },
  { name: 'AirBNB Smart', value: 'AirBNB Smart' },
  { name: 'Booking.com', value: 'Booking.com' },
  { name: 'Bayut', value: 'Bayut' },
  { name: 'Hotel 5', value: 'Hotel 5' },
  { name: 'HHr', value: 'HHr' },
  { name: 'Our Price 10', value: 'Our Price 10' },
  { name: 'Our Price Daily', value: 'Our Price Daily' },
];

const dateInputStyles = { width: '100%', border: '1px solid #E0E0E0' };

export default function BasicInfo() {
  const [service, setService] = useState('all');
  const [property, setProperty] = useState('all');
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  return (
    <section>
      <h4>Basic Information</h4>

      <div className={styles.input_wrapper}>
        <div>
          <SelectInput
            selected={property}
            onSelect={setProperty}
            showValueAndPlaceholder
            options={propertyOptions}
            placeholder="Select Property"
            triggerStyles={{ '--width': '100%' }}
          />
        </div>
        <div>
          <SelectInput
            selected={service}
            onSelect={setService}
            showValueAndPlaceholder
            options={serviceOptions}
            placeholder="Select Service"
            triggerStyles={{ '--width': '100%' }}
          />
        </div>
      </div>

      <div className={styles.calendar_input}>
        <div>
          <DatePicker
            dateSelected={!!fromDate}
            inputStyles={{ ...dateInputStyles, padding: fromDate ? '2px 16px' : '' }}
            inputText={
              fromDate ? (
                <div className={styles.date_input_text}>
                  <p>Start Date</p>
                  <span>{format(fromDate, 'LLL dd, y')}</span>
                </div>
              ) : (
                'Start Date'
              )
            }
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
        <div>
          <DatePicker
            dateSelected={!!toDate}
            inputStyles={{ ...dateInputStyles, padding: toDate ? '2px 16px' : '' }}
            inputText={
              toDate ? (
                <div className={styles.date_input_text}>
                  <p>End Date</p>
                  <span>{format(toDate, 'LLL dd, y')}</span>
                </div>
              ) : (
                'End Date'
              )
            }
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
      </div>
    </section>
  );
}
