import React from 'react';
import { LabelDisplayedRowsArgs, TablePagination as TablePaginationMUI } from '@mui/material';
import useTableContext from '../../../../context/table/context';

interface Props {
  rowsPerPage?: number;
  recordsAmount: number;
  page: number;
  setPage: (page: number) => void;
}

function TablePagination({
  rowsPerPage, recordsAmount, page, setPage,
}: Props) {
  const { defaultRowsPerPage } = useTableContext();
  const effectiveRowsPerPage = rowsPerPage || defaultRowsPerPage;

  const getDisplayedLable = (paginationInfo: LabelDisplayedRowsArgs) => {
    const { from, to, count } = paginationInfo;

    return `${from}-${to} de ${count}`;
  };

  return (
    <TablePaginationMUI
      classes={{ root: 'bg-grey-100 border-t-[1px]' }}
      rowsPerPageOptions={[effectiveRowsPerPage]}
      component="div"
      count={recordsAmount}
      rowsPerPage={effectiveRowsPerPage}
      page={page}
      labelDisplayedRows={getDisplayedLable}
      onPageChange={(_, newPage) => setPage(newPage)}
    />
  );
}

export default TablePagination;
