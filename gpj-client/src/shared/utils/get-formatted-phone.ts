import { PHONE_LENGTH } from './constants';

const getFormattedPhone = (phone: string): string => {
  const isPhoneNumeric = !Number.isNaN(Number(phone));

  if (!isPhoneNumeric || phone.length !== PHONE_LENGTH) return '';

  const areaNumber = phone.slice(0, 2);
  const phoneFirstHalf = phone.slice(2, 7);
  const phoneSecondHalf = phone.slice(7, PHONE_LENGTH);

  return `(${areaNumber}) ${phoneFirstHalf}-${phoneSecondHalf}`;
};

export default getFormattedPhone;
