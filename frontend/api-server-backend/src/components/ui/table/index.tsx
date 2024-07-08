'use client';

import { Table, ExtendedNode, TableNode } from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';
import { usePagination } from '@table-library/react-table-library/pagination';
import { useCallback, useEffect, useState } from 'react';

import Pagination from '../pagination';
import styles from './table.module.scss';

interface iData {
  nodes: ExtendedNode<TableNode>[];
  pageInfo?: any;
}

interface iParams {
  pageSize?: number;
  pageNumber?: number;
}

interface iCustomTable {
  tableData: (nodes: any[]) => JSX.Element;
  fetchData: (T: iParams) => Promise<iData>;
  tableStyles?: {
    '--header-bg-color'?: string;
    '--first-td-bg-color'?: string;
    '--first-td-font-weight'?: number;
    '--grid-template-columns'?: string;
  };
}

export default function CustomTable(props: iCustomTable) {
  const { tableStyles, fetchData, tableData } = props;

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
        data-first-td-bg-color={tableStyles?.['--first-td-bg-color'] ? true : false}
      >
        {(tableList: ExtendedNode<TableNode>[]) => tableData(tableList)}
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
