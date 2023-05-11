import getFormattedTaxValue from "./get-formatted-tax-number";
import isValidTaxNumber from "./is-valid-tax-number";


describe('company functions tests', () => {
  describe('getFormattedTaxValue', () => {
    it('shoud use CPF format when lenth is 11', () => {
      const cpf = '11111111111';
      const formatedCPF = getFormattedTaxValue(cpf);
      expect(formatedCPF).toBe('111.111.111-11');
    })

    it('shoud use CNPJ format when lenth is 14', () => {
      const cnpj = '11111111111111';
      const formatedCNPJ = getFormattedTaxValue(cnpj);
      expect(formatedCNPJ).toBe('11.111.111/1111-11');
    })

    it('shoud not format when lenth is not 11 or 14', () => {
      const tax = '1111';
      const formatedTax = getFormattedTaxValue(tax);
      expect(formatedTax).toBe('1111');
    })
  })

  describe('isValidTaxNumber', () => {
    it('should returns true for valid CPF', () => {
      const taxNumber = '12345678909';
      const result = isValidTaxNumber(taxNumber);
      expect(result).toBe(true);
    });

    it('should returns true for valid CNPJ', () => {
      const taxNumber = '12345678000123';
      const result = isValidTaxNumber(taxNumber);
      expect(result).toBe(true);
    });

    it('should returns false for invalid tax number', () => {
      const taxNumber = '123';
      const result = isValidTaxNumber(taxNumber);
      expect(result).toBe(false);
    });

    it('should returns false for empty input', () => {
      const taxNumber = '';
      const result = isValidTaxNumber(taxNumber);
      expect(result).toBe(false);
    });
  });
})