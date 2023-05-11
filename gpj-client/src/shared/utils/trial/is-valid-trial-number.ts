import { TRIAL_NUMBER_LENGTH } from '../constants';

const isValidTrialNumber = (trialNumber: number) => trialNumber.toString().length === TRIAL_NUMBER_LENGTH;

export default isValidTrialNumber;
