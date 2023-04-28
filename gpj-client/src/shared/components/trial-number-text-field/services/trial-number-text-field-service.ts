const getStandartizedTrialNumber = (trialNumber: string) => {
  const standirezedTrialNumber = trialNumber.replaceAll('-', '').replaceAll('.', '');

  if (standirezedTrialNumber.length === 0) return null;

  return standirezedTrialNumber;
};

const trialNumberTextFieldService = {
  getStandartizedTrialNumber,
};

export default trialNumberTextFieldService;
