import crypto from 'crypto';

export const hashPassword = (password: string, hashAlgorithm: string) => {
  return crypto.createHash(hashAlgorithm).update(password).digest('hex');
};