import React from 'react';
import {
  Skeleton, TableBody, TableCell, TableRow,
} from '@mui/material';
import useTableContext from '../../../../context/table/context';

interface Props {
  rowsPerPage?: number;
  columnsAmount: number;
}

function TableBodySkeleton({ rowsPerPage, columnsAmount }: Props) {
  const { defaultRowsPerPage } = useTableContext();
  const effectiveRowsPerPage = rowsPerPage || defaultRowsPerPage;

  return (
    <TableBody>
      {Array(effectiveRowsPerPage).fill(0).map((_, index) => {
        const rowCounter = index;

        return (
          <TableRow key={rowCounter}>
            <TableCell colSpan={columnsAmount}>
              <Skeleton animation="wave" classes={{ root: 'w-full h-12' }} />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}

export default TableBodySkeleton;
