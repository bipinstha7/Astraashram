'use client';

import {
  Row,
  Body,
  Cell,
  Table,
  Header,
  HeaderRow,
  HeaderCell,
} from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';
import { usePagination } from '@table-library/react-table-library/pagination';
import { useCallback, useEffect, useState } from 'react';

import Pagination from '../pagination';
import styles from './table.module.scss';

interface iNodes {
  id: string | number;
  name: string;
  one: number;
  two: number;
  three: number;
  four: number;
  five: number;
  six: number;
  seven: number;
  eight: number;
  nine: number;
  ten: number;
  eleven: number;
  twelve: number;
}

interface iData {
  nodes: iNodes[];
  pageInfo?: any;
}

interface iParams {
  pageSize?: number;
  pageNumber?: number;
}

interface iCustomTable {
  fetchData: (T: iParams) => Promise<iData>;
  tableStyles?: {
    '--header-bg-color'?: string;
    '--first-td-bg-color'?: string;
    '--first-td-font-weight'?: number;
    '--grid-template-columns'?: string;
  };
}

export default function CustomTable(props: iCustomTable) {
  const { tableStyles, fetchData } = props;

  const [data, setData] = useState<iData>({
    nodes: [],
    pageInfo: { total: 0 },
  });

  const getData = useCallback(async (params: iParams) => {
    setData(await fetchData(params));
  }, []);

  useEffect(() => {
    getData({
      pageNumber: 1,
      pageSize: pagination.state.size,
    });
  }, [getData]);

  const pagination = usePagination(
    data,
    {
      state: {
        page: 1,
        size: 10,
      },
      onChange: onPaginationChange,
    },
    {
      isServer: true,
    }
  );

  function onPaginationChange(action: any) {
    getData({
      pageSize: pagination.state.size,
      pageNumber: action.payload.page,
    });
  }

  const theme = useTheme({
    Table: `--data-table-library_grid-template-columns: ${tableStyles?.['--grid-template-columns']}`,
  });

  return (
    <div className={styles.table_wrapper}>
      <Table
        data={data}
        theme={theme}
        style={tableStyles}
        pagination={pagination}
        className={styles.astraashram_table}
        layout={{ custom: true, horizontalScroll: true }}
      >
        {(tableList: iNodes[]) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Service</HeaderCell>
                <HeaderCell>01.01.23</HeaderCell>
                <HeaderCell>02.01.23</HeaderCell>
                <HeaderCell>03.01.23</HeaderCell>
                <HeaderCell>04.01.23</HeaderCell>
                <HeaderCell>05.01.23</HeaderCell>
                <HeaderCell>06.01.23</HeaderCell>
                <HeaderCell>07.01.23</HeaderCell>
                <HeaderCell>08.01.23</HeaderCell>
                <HeaderCell>09.01.23</HeaderCell>
                <HeaderCell>10.01.23</HeaderCell>
                <HeaderCell>11.01.23</HeaderCell>
                <HeaderCell>12.01.23</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row item={item} key={item.id}>
                  <Cell>{item.name} </Cell>
                  <Cell>{item.one}</Cell>
                  <Cell>{item.two}</Cell>
                  <Cell>{item.three}</Cell>
                  <Cell>{item.four}</Cell>
                  <Cell>{item.five}</Cell>
                  <Cell>{item.six}</Cell>
                  <Cell>{item.seven}</Cell>
                  <Cell>{item.eight}</Cell>
                  <Cell>{item.nine}</Cell>
                  <Cell>{item.ten}</Cell>
                  <Cell>{item.eleven}</Cell>
                  <Cell>{item.twelve}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>

      {data.pageInfo && (
        <Pagination
          pageSize={pagination.state.size}
          currentPage={pagination.state.page}
          handlePageChange={page => pagination.fns.onSetPage(page)}
          handlePageSizeChange={pageSize => pagination.fns.onSetSize(pageSize)}
          totalPage={Math.ceil(data.pageInfo.total / pagination.state.size)}
        />
      )}
    </div>
  );
}
