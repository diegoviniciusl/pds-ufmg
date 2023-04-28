import React from 'react';
import { visuallyHidden } from '@mui/utils';
import {
  Box, TableCell, TableHead, TableRow, TableSortLabel,
} from '@mui/material';
import { HeaderCell, SortDirection } from '../../../../interfaces';

interface Props<ModelSchema> {
  headerCells: HeaderCell<ModelSchema>[];
  sortDirection: SortDirection;
  orderByKey: keyof ModelSchema;
  setSortDirection: (sortDirection: SortDirection) => void;
  setOrderByKey: (orderByKey: keyof ModelSchema) => void;
}

function TableHeader<ModelSchema>({
  headerCells, sortDirection, orderByKey, setSortDirection, setOrderByKey,
}: Props<ModelSchema>) {
  const handleSortLableClick = (key: keyof ModelSchema) => {
    const isSortDirectionDesc = orderByKey === key && sortDirection === 'asc';
    setSortDirection(isSortDirectionDesc ? 'desc' : 'asc');
    setOrderByKey(key);
  };

  return (
    <TableHead classes={{ root: 'bg-white border-b-[1px]' }}>
      <TableRow hover={false}>
        {headerCells.map((headerCell) => {
          const isSortableLable = headerCell.key && headerCell.sortable;

          return (
            <TableCell
              key={headerCell.label}
              align="center"
              sortDirection={orderByKey === headerCell.key ? sortDirection : false}
              width={headerCell.width}
            >
              <TableSortLabel
                active={orderByKey === headerCell.key}
                direction={orderByKey === headerCell.key ? sortDirection : 'desc'}
                onClick={() => isSortableLable && headerCell.key && handleSortLableClick(headerCell.key)}
                hideSortIcon={!isSortableLable}
              >
                {headerCell.label}
                {orderByKey === headerCell.key ? (
                  <Box component="span" sx={visuallyHidden}>
                    {sortDirection === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
