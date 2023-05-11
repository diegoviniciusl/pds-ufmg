import { HeaderCell } from '../../../interfaces';
import { User } from '../../../models';

const headerCells: HeaderCell<User>[] = [
  {
    key: 'userId',
    label: 'ID',
    sortable: true,
    width: '10%',
  },
  {
    label: 'Avatar',
    sortable: false,
    width: '10%',
  },
  {
    key: 'name',
    label: 'Nome',
    sortable: true,
    width: '20%',
  },
  {
    key: 'role',
    label: 'Permissão',
    sortable: true,
    width: '10%',
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true,
    width: '20%',
  },
  {
    key: 'phone',
    label: 'Telefone',
    sortable: true,
    width: '10%',
  },
  {
    key: 'active',
    label: 'Status',
    sortable: true,
    width: '10%',
  },
  {
    label: 'Editar',
    sortable: false,
    width: '10%',
  },
];

const columnsAmount = headerCells.length;

const usersTableService = {
  headerCells,
  columnsAmount,
};

export default usersTableService;
