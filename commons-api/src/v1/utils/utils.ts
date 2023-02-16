import bcryptjs from 'bcryptjs';

const checkPassword = async (password: string, hash: string) => {
  const isValidPassword = await bcryptjs.compare(password, hash);
  return isValidPassword;
};

export { checkPassword };
