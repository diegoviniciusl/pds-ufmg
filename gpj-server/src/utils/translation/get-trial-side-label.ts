import { TrialSide } from '@prisma/client';

const trialSideMapping = {
  [TrialSide.PLAINTIFF]: 'Autor',
  [TrialSide.DEFENDANT]: 'Réu',
  [TrialSide.OFFICIAL]: 'Oficial',
};

const getTrialSideLabel = (trialSide: TrialSide | null) => (trialSide !== null ? trialSideMapping[trialSide] : '');

export default getTrialSideLabel;
