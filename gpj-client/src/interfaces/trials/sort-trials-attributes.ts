import TrialOrderableColumn from '../../shared/enums/trial-orderable-colum';
import SortDirection from '../table/sort-direction';

interface SortTrialsAttributes {
  orderByColumn?: TrialOrderableColumn;
  orderByDirection?: SortDirection;
}

export default SortTrialsAttributes;
