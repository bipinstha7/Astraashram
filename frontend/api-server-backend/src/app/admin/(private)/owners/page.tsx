'use client';

import {
  Row,
  Body,
  Cell,
  Header,
  HeaderRow,
  HeaderCell,
} from '@table-library/react-table-library/table';

import styles from './owners.module.scss';
import { ownersData } from '@/lib/mockData';
import CustomTable from '@/components/ui/table';
import Filter from '@/components/reservations/reservationsFilter';

interface iownersData {
  id: string;
  name: string;
  email: string;
  telephone: string;
}

const tableHeaders = ['ID', 'Name', 'Telephone', 'E-mail'];

export default function Owners() {
  return (
    <main className={styles.owners_main}>
      <Filter textLabel="Search by owner" />
      <CustomTable
        fetchData={ownersData}
        tableData={(tableList: iownersData[]) => (
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
                  <Cell>{item.name}</Cell>
                  <Cell>{item.telephone}</Cell>
                  <Cell>{item.email}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
        tableStyles={{
          '--header-bg-color': '#ECF7F7',
          '--grid-template-columns': '65px 1fr 1fr 1fr',
        }}
      />
    </main>
  );
}
