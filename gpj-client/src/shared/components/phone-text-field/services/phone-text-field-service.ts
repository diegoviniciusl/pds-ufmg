const getStandarizedPhone = (phone: string) => {
  const standirezedPhone = phone.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '');

  if (standirezedPhone.length === 0) return null;

  return standirezedPhone;
};

const phoneTextFieldService = {
  getStandarizedPhone,
};

export default phoneTextFieldService;
