'use client';

import {
  Body,
  Cell,
  Header,
  HeaderCell,
  HeaderRow,
  Row,
} from '@table-library/react-table-library/table';

import styles from './owners.module.scss';
import Button from '@/components/ui/button';
import { ownersData } from '@/lib/mockData';
import CustomTable from '@/components/ui/table';
import searchIcon from '/public/icons/search.svg';
import TextInput from '@/components/ui/form/textInput';

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
      <div className={styles.owners_filter}>
        <TextInput
          showIcon
          name="search"
          icon={searchIcon}
          iconPosition="left"
          label="Search by owner"
          className={styles.search_input}
          inputStyles={{ '--input-bg-color': '#fff', '--border-color': '#CDCDCD' }}
        />
        <div className={styles.add_button}>
          <Button icon="&#43;" text="Add Owner" />
        </div>
      </div>
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
