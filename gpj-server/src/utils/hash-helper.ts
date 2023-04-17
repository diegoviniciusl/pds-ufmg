import bcrypt from 'bcrypt';

export const hashMessage = (message: string) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(message, salt);
};

export const compareMessage = (message: string, hashedMessage: string) => bcrypt.compareSync(message, hashedMessage);
