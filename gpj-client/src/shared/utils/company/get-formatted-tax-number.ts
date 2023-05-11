import { CNPJ_LENGTH, CPF_LENGTH } from '../constants';

const getFormattedCpf = (cpf: string): string => {
  const cpfFirstPart = cpf.slice(0, 3);
  const cpfSecondPart = cpf.slice(3, 6);
  const cpfThirdPart = cpf.slice(6, 9);
  const cpfFourthPart = cpf.slice(9, CPF_LENGTH);

  return `${cpfFirstPart}.${cpfSecondPart}.${cpfThirdPart}-${cpfFourthPart}`;
};

const getFormattedCnpj = (cnpj: string): string => {
  const cnpjFirstPart = cnpj.slice(0, 2);
  const cnpjSecondPart = cnpj.slice(2, 5);
  const cnpjThirdPart = cnpj.slice(5, 8);
  const cnpjFourthPart = cnpj.slice(8, 12);
  const cnpjFifthPart = cnpj.slice(12, CNPJ_LENGTH);

  return `${cnpjFirstPart}.${cnpjSecondPart}.${cnpjThirdPart}/${cnpjFourthPart}-${cnpjFifthPart}`;
};

const getFormattedTaxValue = (taxValue: string): string => {
  if (taxValue.length === CPF_LENGTH) return getFormattedCpf(taxValue);
  if (taxValue.length === CNPJ_LENGTH) return getFormattedCnpj(taxValue);
  return taxValue;
};

export default getFormattedTaxValue;
