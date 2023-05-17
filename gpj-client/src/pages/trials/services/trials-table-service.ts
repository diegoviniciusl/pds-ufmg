import { HeaderCell } from '../../../interfaces';
import { Trial } from '../../../models';

const headerCells: HeaderCell<Trial>[] = [
  {
    key: 'trialId',
    label: 'ID',
    sortable: true,
    width: 'auto',
  },
  {
    key: 'user',
    label: 'Responsável',
    sortable: true,
    width: 'auto',
  },
  {
    key: 'deadline',
    label: 'Prazo',
    sortable: true,
    width: 'auto',
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    width: 'auto',
  },
  {
    key: 'taskType',
    label: 'Serviço',
    sortable: true,
    width: 'auto',
  },
  {
    key: 'office',
    label: 'Escritório',
    sortable: true,
    width: 'auto',
  },
  {
    key: 'lawyer',
    label: 'Advogado',
    sortable: true,
    width: 'auto',
  },
  {
    key: 'client',
    label: 'Cliente',
    sortable: true,
    width: 'auto',
  },
  {
    key: 'region',
    label: 'Região',
    sortable: true,
    width: 'auto',
  },
  {
    key: 'trialType',
    label: 'Tipo do Processo',
    sortable: true,
    width: 'auto',
  },
  {
    key: 'trialNumber',
    label: 'Processo',
    sortable: true,
    width: 'auto',
  },
  {
    key: 'side',
    label: 'Parte',
    sortable: true,
    width: 'auto',
  },
  {
    key: 'plaintiff',
    label: 'Autor',
    sortable: true,
    width: 'auto',
  },
  {
    key: 'defendant',
    label: 'Réu',
    sortable: true,
    width: 'auto',
  },
  {
    key: 'privateAnnotations',
    label: 'Descrição Privada',
    sortable: true,
    width: 'auto',
  },
  {
    key: 'publicAnnotations',
    label: 'Descrição Pública',
    sortable: true,
    width: 'auto',
  },
];

const columnsAmount = headerCells.length;

const trialsTableService = {
  headerCells,
  columnsAmount,
};

export default trialsTableService;
