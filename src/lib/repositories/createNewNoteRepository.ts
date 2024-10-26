'use server';


import { NoteDto } from '@lib/dto/NoteDto';
import crypto from 'crypto';

import { prisma } from '@/prisma';
import { ActionResponse } from '@/types/ActionResponse';

const algorithm = 'aes-256-cbc';
const hashAlgorithm = 'sha256';
const ivLength = 16; // длина инициализационного вектора

// Функция для хеширования пароля
const hashPassword = (password: string) => {
  return crypto.createHash(hashAlgorithm).update(password).digest('hex');
};

// Функция для шифрования контента
const encryptContent = (content: string, password: string) => {
  const key = crypto.createHash(hashAlgorithm).update(password).digest(); // получаем 256-битный ключ
  const iv = crypto.randomBytes(ivLength); // создаем случайный IV
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(content, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return `${iv.toString('hex')}:${encrypted}`; // соединяем IV и зашифрованный текст
};

export type CreateNewNoteRepositoryResponse = {
  id: string;
}

export const createNewNoteRepository = async (note: NoteDto): Promise<ActionResponse<CreateNewNoteRepositoryResponse>> => {
  const { content, isPrivate, password } = note;

  if (isPrivate) {
    const hashedPassword = hashPassword(password!);
    const encryptedContent = encryptContent(content, password!);

    const newNote = await prisma.note.create({
      data: {
        ...note,
        content: encryptedContent,
        password: hashedPassword,
      },
    });

    return {
      data: {
        id: newNote.id,
      },
      error: null,
    };
  }

  const newNote = await prisma.note.create({
    data: {
      ...note,
    },
  });

  return {
    data: {
      id: newNote.id,
    },
    error: null,
  };
};