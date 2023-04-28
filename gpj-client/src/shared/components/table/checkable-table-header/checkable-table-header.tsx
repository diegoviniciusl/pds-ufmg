import React from 'react';
import { visuallyHidden } from '@mui/utils';
import {
  Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel,
} from '@mui/material';
import { HeaderCell, SortDirection } from '../../../../interfaces';

interface Props<ModelSchema> {
  headerCells: HeaderCell<ModelSchema>[];
  sortDirection: SortDirection;
  orderByKey: keyof ModelSchema;
  setSortDirection: (sortDirection: SortDirection) => void;
  setOrderByKey: (orderByKey: keyof ModelSchema) => void;
  numSelected: number;
  rowCount: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function CheckableTableHeader<ModelSchema>({
  headerCells, sortDirection, orderByKey, setSortDirection, setOrderByKey, numSelected, rowCount, onSelectAllClick,
}: Props<ModelSchema>) {
  const handleSortLableClick = (key: keyof ModelSchema) => {
    const isSortDirectionDesc = orderByKey === key && sortDirection === 'asc';
    setSortDirection(isSortDirectionDesc ? 'desc' : 'asc');
    setOrderByKey(key);
  };

  return (
    <TableHead classes={{ root: 'bg-white border-b-[1px]' }}>
      <TableRow hover={false}>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected > 0}
            onChange={onSelectAllClick}
          />
        </TableCell>
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

export default CheckableTableHeader;
