import { CNPJ_LENGTH, CPF_LENGTH } from '../constants';
import { onlyNumbersRegex } from '../regex';

const isValidTaxNumber = (phone: string): boolean => (phone.length === CPF_LENGTH || phone.length === CNPJ_LENGTH) && onlyNumbersRegex.test(phone);

export default isValidTaxNumber;
