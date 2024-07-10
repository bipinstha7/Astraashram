'use client';

import {
  Row,
  Body,
  Cell,
  Header,
  HeaderCell,
  HeaderRow,
} from '@table-library/react-table-library/table';

import styles from './reservations.module.scss';
import CustomTable from '@/components/ui/table';
import { reservationsData } from '@/lib/mockData';
import searchIcon from '/public/icons/search.svg';
import Filter from '@/components/reservationsFilter';
import TextInput from '@/components/ui/form/textInput';

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

export default function Reservation() {
  return (
    <main className={styles.reservation_main}>
      <Filter textLabel="Search by sales" />

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
