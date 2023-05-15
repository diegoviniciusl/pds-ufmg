import { HeaderCell } from '../../../interfaces';
import Company from '../../../models/company';

const headerCells: HeaderCell<Company>[] = [
  {
    key: 'companyId',
    label: 'ID',
    sortable: true,
    width: '10%',
  },
  {
    key: 'name',
    label: 'Nome',
    sortable: true,
    width: '20%',
  },
  {
    key: 'email',
    label: 'Email Padrão',
    sortable: true,
    width: '25%',
  },
  {
    key: 'phone',
    label: 'Telefone',
    sortable: false,
    width: '15%',
  },
  {
    key: 'taxNumber',
    label: 'CPF/CNPJ',
    sortable: false,
    width: '20%',
  },
  {
    label: 'Editar',
    sortable: false,
    width: '10%',
  },
];

const columnsAmount = headerCells.length;

const companiesTableService = {
  headerCells,
  columnsAmount,
};

export default companiesTableService;
