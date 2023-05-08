import React, { useMemo } from 'react';
import { TableContext } from './context';
import ContextProviderProps from '../ContextProviderProps';
import { useWindowDimensions } from '../../shared/hooks';
import { MAX_ROWS_PER_PAGE, ROW_HEIGHT_SIZE } from '../../shared/utils/constants';

const themeConfiguration = require('../../theme/themeConfiguration');

function TableContextProvider({ children }: ContextProviderProps) {
  const getRowsPerPage = (height: number) => {
    const OFFSIDE_TABLE_SIZE = 330;
    const rowsPerPage = Math.round((height - OFFSIDE_TABLE_SIZE) / (ROW_HEIGHT_SIZE * themeConfiguration.spacingMultiplier));

    if (rowsPerPage > MAX_ROWS_PER_PAGE) return MAX_ROWS_PER_PAGE;
    if (rowsPerPage <= 0) return 1;

    return rowsPerPage;
  };

  const { height } = useWindowDimensions();
  const defaultRowsPerPage = getRowsPerPage(height);

  const value = useMemo(
    () => ({
      defaultRowsPerPage,
    }),
    [defaultRowsPerPage],
  );

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
}

export default TableContextProvider;
