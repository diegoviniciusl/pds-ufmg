import { PHONE_LENGTH } from './constants';
import { onlyNumbersRegex } from './regex';

const isValidPhone = (phone: string): boolean => (phone.length === PHONE_LENGTH || phone.length === PHONE_LENGTH - 1) && onlyNumbersRegex.test(phone);

export default isValidPhone;
