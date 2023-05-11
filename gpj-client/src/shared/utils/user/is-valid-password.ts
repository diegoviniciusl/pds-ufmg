import { MIN_PASSWORD_LENGTH } from '../constants';

const isValidPassword = (password: string): boolean => password.length >= MIN_PASSWORD_LENGTH;

export default isValidPassword;
