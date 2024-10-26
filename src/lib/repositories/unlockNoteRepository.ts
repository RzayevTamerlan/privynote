'use server';

import { UnlockNoteDto } from '@lib/dto/UnlockNoteDto';
import { prisma } from '@/prisma';
import { ActionResponse } from '@/types/ActionResponse';
import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const hashAlgorithm = 'sha256';

// Функция для хеширования пароля (такая же, как при шифровании)
const hashPassword = (password: string) => {
  return crypto.createHash(hashAlgorithm).update(password).digest('hex');
};

// Функция для расшифровки контента
const decryptContent = (encryptedContent: string, password: string) => {
  const [ivHex, encryptedText] = encryptedContent.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const key = crypto.createHash(hashAlgorithm).update(password).digest();

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};

type UnlockNoteRepositoryResponse = {
  content: string;
}

export const unlockNoteRepository = async (dto: UnlockNoteDto): Promise<ActionResponse<UnlockNoteRepositoryResponse>> => {
  const { password, id } = dto;
  const note = await prisma.note.findUnique({
    where: {
      id: id,
    },
  });

  if (!note) {
    return {
      data: null,
      error: {
        statusCode: 404,
        message: 'Note not found',
      },
    };
  }

  const hashedPassword = hashPassword(password);

  if (hashedPassword !== note.password) {
    return {
      data: null,
      error: {
        statusCode: 400,
        message: 'Invalid password',
      },
    };
  }

  const decryptedContent = decryptContent(note.content, password);

  return {
    data: {
      content: decryptedContent,
    },
    error: null,
  };
};