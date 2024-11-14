import crypto from 'crypto';

type DecryptContent = {
  encryptedContent: string;
  password: string;
  hashAlgorithm: string;
  algorithm: string;
}

export const decryptContent = ({
  encryptedContent,
  password,
  hashAlgorithm,
  algorithm,
}: DecryptContent) => {
  const [ivHex, encryptedText] = encryptedContent.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const key = crypto.createHash(hashAlgorithm).update(password).digest();

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};