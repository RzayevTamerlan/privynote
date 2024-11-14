'use server';

import { algorithm, hashAlgorithm } from '@constants/hash-algorithms';
import { UnlockNoteDto } from '@lib/dto/UnlockNoteDto';
import { decryptContent } from '@utils/decryptContent';
import { hashPassword } from '@utils/hashPassword';

import { prisma } from '@/prisma';
import { ActionResponse } from '@/types/ActionResponse';

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

  const hashedPassword = hashPassword(password, hashAlgorithm);

  if (hashedPassword !== note.password) {
    return {
      data: null,
      error: {
        statusCode: 400,
        message: 'Invalid password',
      },
    };
  }

  const decryptedContent = decryptContent({
    encryptedContent: note.content,
    password,
    hashAlgorithm: hashAlgorithm,
    algorithm: algorithm,
  });

  return {
    data: {
      content: decryptedContent,
    },
    error: null,
  };
};