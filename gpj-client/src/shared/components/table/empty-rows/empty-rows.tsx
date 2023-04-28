import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import useTableContext from '../../../../context/table/context';

interface Props {
  rowsPerPage?: number;
  recordsAmount: number;
  columnsAmount: number;
  page: number;
}

function EmptyRows({
  rowsPerPage, recordsAmount, columnsAmount, page,
}: Props) {
  const { defaultRowsPerPage } = useTableContext();
  const effectiveRowsPerPage = rowsPerPage || defaultRowsPerPage;

  const emptyRows = Math.max(0, (1 + page) * effectiveRowsPerPage - recordsAmount);

  return (
    <>
      {Array(emptyRows).fill(0).map((_, index) => {
        const rowCounter = index;

        return (
          <TableRow hover={false} key={rowCounter}>
            <TableCell colSpan={columnsAmount} />
          </TableRow>
        );
      })}
    </>
  );
}

export default EmptyRows;
