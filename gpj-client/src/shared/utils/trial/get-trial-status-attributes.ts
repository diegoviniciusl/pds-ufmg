import { TrialStatus } from '../../enums';

const trialStatusMapping = {
  [TrialStatus.PENDING]: {
    color: 'bg-yellow-light',
    text: 'Pendente',
  },
  [TrialStatus.IN_PROGRESS]: {
    color: 'bg-gray-100',
    text: 'Em progresso',
  },
  [TrialStatus.TO_CHECK]: {
    color: 'bg-cyan-light',
    text: 'A conferir',
  },
  [TrialStatus.IN_CONFERENCE]: {
    color: 'bg-red-lightest',
    text: 'Em conferência',
  },
  [TrialStatus.CHECKED]: {
    color: 'bg-purple-light',
    text: 'Conferido',
  },
  [TrialStatus.SENT]: {
    color: 'bg-lime-lightest',
    text: 'Enviado',
  },
};

const getTrialStatusAttributes = (trialStatus: TrialStatus) => trialStatusMapping[trialStatus];

export default getTrialStatusAttributes;
