import TrialOrderableColumn from '../../shared/enums/trial-orderable-colum';
import SortDirection from '../table/sort-direction';
import TrialsFilterAttributes from './trials-filter-attributes';

type GetTrialsAttributes = TrialsFilterAttributes & { search?: string, orderByColumn?: TrialOrderableColumn, orderByDirection?: SortDirection };

export default GetTrialsAttributes;
