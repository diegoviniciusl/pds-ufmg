// eslint-disable-next-line max-len
const formatTrialNumber = (trialNumber: string) => `${trialNumber.slice(0, 7)}-${trialNumber.slice(7, 9)}.${trialNumber.slice(9, 13)}.${trialNumber.slice(13, 14)}.${trialNumber.slice(14, 16)}.${trialNumber.slice(16, 20)}`;

export default formatTrialNumber;
