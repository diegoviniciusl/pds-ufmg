import { TrialStatus } from '@prisma/client';

const trialStatusMapping = {
  [TrialStatus.PENDING]: 'Pendente',
  [TrialStatus.IN_PROGRESS]: 'Em progresso',
  [TrialStatus.TO_CHECK]: 'A conferir',
  [TrialStatus.IN_CONFERENCE]: 'Em conferência',
  [TrialStatus.CHECKED]: 'Conferido',
  [TrialStatus.SENT]: 'Enviado',
};

const getTrialStatusAttributes = (trialStatus: TrialStatus) => trialStatusMapping[trialStatus];

export default getTrialStatusAttributes;
