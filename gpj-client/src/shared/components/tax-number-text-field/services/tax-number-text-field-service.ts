const getStandarizedTaxNumber = (taxNumber: string) => {
  const standirezedPhone = taxNumber.replaceAll(' ', '').replaceAll('-', '').replaceAll('.', '').replaceAll('/', '');

  if (taxNumber.length === 0) return null;

  return standirezedPhone;
};

const taxNumberTextFieldService = {
  getStandarizedTaxNumber,
};

export default taxNumberTextFieldService;
