'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import {
  Body,
  Cell,
  Header,
  HeaderCell,
  HeaderRow,
  Row,
} from '@table-library/react-table-library/table';

import styles from './reservations.module.scss';
import CustomTable from '@/components/ui/table';
import { reservationsData } from '@/lib/mockData';
import Calendar from '@/components/ui/date/calendar';
import SelectInput from '@/components/ui/form/select';
import { DatePicker } from '@/components/ui/date/date';
import TextInput from '@/components/ui/form/textInput';
import searchIcon from '/public/icons/search.svg';

interface ireservationsData {
  id: string;
  propertyName: string;
  startDate: string;
  completionDate: string;
  amount: string;
  deposit: string;
  status: string;
}

const tableHeaders = [
  'ID',
  'Property Name',
  'Start Date',
  'Completion Date',
  'Amount, USD',
  'Deposit, USD',
  'Status',
];

const propertyOptions = [
  { name: 'All', value: 'all' },
  { name: 'Property 1', value: 'Property 1' },
  { name: 'Property 2', value: 'Property 2' },
  { name: 'Property 3', value: 'Property 3' },
];

const dateInputStyles = { inputStyles: { width: '100%', border: '1px solid #E0E0E0' } };

export default function Reservation() {
  const [property, setProperty] = useState('all');
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);

  return (
    <main className={styles.reservation_main}>
      <TextInput
        showIcon
        name="search"
        icon={searchIcon}
        iconPosition="left"
        label="Search by sales"
        inputStyles={{ '--input-bg-color': '#fff', '--border-color': '#CDCDCD' }}
      />
      <section className={styles.reservation_header}>
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
      </section>

      <CustomTable
        fetchData={reservationsData}
        tableData={(tableList: ireservationsData[]) => (
          <>
            <Header>
              <HeaderRow>
                {tableHeaders.map(header => (
                  <HeaderCell key={header}>{header}</HeaderCell>
                ))}
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row item={item} key={item.id}>
                  <Cell>{item.id}</Cell>
                  <Cell>{item.propertyName}</Cell>
                  <Cell>{item.startDate}</Cell>
                  <Cell>{item.completionDate}</Cell>
                  <Cell>{item.amount}</Cell>
                  <Cell>{item.deposit}</Cell>
                  <Cell className={styles.table_status} data-status={item.status}>
                    <p>{item.status}</p>
                  </Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
        tableStyles={{
          '--header-bg-color': '#ECF7F7',
          '--grid-template-columns':
            '65px minmax(228px, 1fr) minmax(183px, 1fr) minmax(183px, 1fr) minmax(108px, 1fr) minmax(122px, 1fr) minmax(131px, 1fr)',
        }}
      />
    </main>
  );
}
