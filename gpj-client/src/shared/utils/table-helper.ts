import { ComparatorMethod, SortDirection } from '../../interfaces';
import { TABLE_CELL_LIMIT_LENGTH } from './constants';

const descendingComparator = <ModelSchema>(a: ModelSchema, b: ModelSchema, orderBy: keyof ModelSchema) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = <ModelSchema>(
  sortDirection: SortDirection,
  orderBy: keyof ModelSchema,
): ComparatorMethod<ModelSchema> => (sortDirection === 'desc'
    ? (a, b) => descendingComparator<ModelSchema>(a, b, orderBy)
    : (a, b) => -descendingComparator<ModelSchema>(a, b, orderBy));

const stableSort = <ModelSchema>(array: readonly ModelSchema[], comparatorMethod: ComparatorMethod<ModelSchema>) => {
  const stabilizedThis = array.map((el, index) => [el, index] as [ModelSchema, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparatorMethod(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const getTablePageRecords = <ModelSchema>(records: ModelSchema[], page: number, rowsPerPage: number, sortDirection?: SortDirection, orderByKey?: keyof ModelSchema) => {
  const sortedRecords = (sortDirection && orderByKey) ? stableSort(records, getComparator(sortDirection, orderByKey)) : records;
  const tablePageRecords = sortedRecords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return tablePageRecords;
};

const getLimitedCellTextContent = (text: string, limitLength?: number) => {
  const effectiveLimitLength = limitLength || TABLE_CELL_LIMIT_LENGTH;

  if (text.length < effectiveLimitLength) return text;

  return text.slice(0, effectiveLimitLength).concat('...');
};

const tableHelper = {
  getTablePageRecords,
  getLimitedCellTextContent,
};

export default tableHelper;
