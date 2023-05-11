import { TrialSide } from '../enums';

const trialSideMapping = {
  [TrialSide.PLAINTIFF]: 'Autor',
  [TrialSide.DEFENDANT]: 'Réu',
  [TrialSide.OFFICIAL]: 'Oficial',

};

const getTrialSideLabel = (trialSide: TrialSide) => trialSideMapping[trialSide];

export default getTrialSideLabel;
