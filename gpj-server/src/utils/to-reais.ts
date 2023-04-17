// eslint-disable-next-line max-len
const toReais = (amount?: number): string => {
  if (amount === undefined) {
    return '';
  }
  if (amount === 0) {
    return 'R$0,00';
  }
  return `R$${amount.toString().slice(0, amount.toString().length - 2)},${amount.toString().slice(amount.toString().length - 2, amount.toString().length)}`;
};

export default toReais;
