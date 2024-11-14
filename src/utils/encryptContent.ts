import crypto from 'crypto';

type EncryptContent = {
  content: string;
  password: string;
  hashAlgorithm: string;
  algorithm: string;
  ivLength: number;
}

// Функция для шифрования контента
export const encryptContent = ({
  content,
  password,
  ivLength,
  hashAlgorithm,
  algorithm,
}: EncryptContent) => {
  const key = crypto.createHash(hashAlgorithm).update(password).digest(); // получаем 256-битный ключ
  const iv = crypto.randomBytes(ivLength); // создаем случайный IV
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(content, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return `${iv.toString('hex')}:${encrypted}`; // соединяем IV и зашифрованный текст
};