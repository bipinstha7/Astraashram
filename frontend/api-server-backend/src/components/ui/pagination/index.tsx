import { useEffect, useState } from 'react';

import SelectInput from '../form/select';
import styles from './pagination.module.scss';

interface iPagination {
  pageSize: number;
  totalData: number;
  totalPage: number;
  currentPage: number;
  handlePageChange: (pageNumber: number) => void;
  handlePageSizeChange: (pageSize: number) => void;
}

interface iPager {
  pages: any[];
  endPage: number;
  startPage: number;
  totalPages: number;
  currentPage: number;
}

const showPerPageOptions = [
  { name: 10, value: '10' },
  { name: 20, value: '20' },
  { name: 50, value: '50' },
];

export default function Pagination(props: iPagination) {
  const [pager, setPager] = useState<iPager>({
    pages: [],
    endPage: 1,
    startPage: 1,
    totalPages: 0,
    currentPage: 1,
  });

  useEffect(() => {
    setPagerData(props.currentPage);
  }, [props.totalPage]);

  const setPagerData = (page: number) => {
    // get new pager object for specified page
    const pagerData = getPager(props.totalPage, page);

    setPager(pagerData);
  };

  const handlePageChange = (page: number) => {
    setPagerData(page);
    props.handlePageChange(page);
  };

  const getPager = (totalPages: number, currentPage: number) => {
    // default to first page
    currentPage = currentPage || 1;

    let startPage, endPage;

    if (totalPages <= 5) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    // create an array of pages to n-repeat in the pager control
    const pages = Array(endPage + 1 - startPage)
      .fill(1)
      .map((_, i) => startPage + i);

    // return object with all pager properties required by the view
    return {
      pages: pages,
      endPage: endPage,
      startPage: startPage,
      totalPages: totalPages,
      currentPage: currentPage,
    };
  };

  return (
    <div className={styles.pagination_wrapper}>
      <div className={styles.select_page_size}>
        Show on pages:
        <SelectInput
          hideBorder
          options={showPerPageOptions}
          selected={props.pageSize.toString()}
          onSelect={size => props.handlePageSizeChange(Number(size))}
          contentStyles={{ '--content-item-padding': '0 5px', '--content-padding': '0px' }}
          triggerStyles={{ '--width': '40px', '--height': '24px', '--padding': '0 4px 0 6px' }}
        />
      </div>
      <p className={styles.total_page}>
        Total <span>{props.totalData}</span>
      </p>
      <div className={styles.pagination_number_wrapper}>
        <button
          disabled={pager.currentPage <= 1}
          onClick={() => handlePageChange(pager.currentPage - 1)}
        >
          <span className={styles.icon}>&lt;</span>
        </button>
        {pager.pages[0] !== 1 ? (
          <>
            <button disabled={pager.currentPage <= 1} onClick={() => handlePageChange(1)}>
              1
            </button>
            <span>...</span>
          </>
        ) : null}
        {pager.pages.map((page, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(page)}
            data-active-id={page === pager.currentPage}
          >
            {page}
          </button>
        ))}
        {pager.pages[pager.pages.length - 1] !== pager.totalPages ? (
          <>
            <span>...</span>
            <button
              disabled={pager.currentPage >= pager.totalPages}
              onClick={() => handlePageChange(pager.totalPages)}
            >
              {props.totalPage}
            </button>
          </>
        ) : null}
        <div>
          <button
            disabled={pager.currentPage >= pager.totalPages}
            onClick={() => handlePageChange(pager.currentPage + 1)}
          >
            <span className={styles.icon}>&gt;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
