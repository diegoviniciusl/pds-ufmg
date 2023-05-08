import { createContext, useContext } from 'react';

interface TableContextInformation {
  defaultRowsPerPage: number;
}

export const TABLE_CONTEXT_DEFAULT_VALUE = {
  defaultRowsPerPage: 10,
} as TableContextInformation;

export const TableContext = createContext<TableContextInformation>(TABLE_CONTEXT_DEFAULT_VALUE);

const useTableContext = () => useContext(TableContext);

export default useTableContext;
