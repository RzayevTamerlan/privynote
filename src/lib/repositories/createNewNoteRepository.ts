'use server';


import { algorithm, hashAlgorithm, ivLength } from '@constants/hash-algorithms';
import { NoteDto } from '@lib/dto/NoteDto';
import { encryptContent } from '@utils/encryptContent';
import { hashPassword } from '@utils/hashPassword';

import { prisma } from '@/prisma';
import { ActionResponse } from '@/types/ActionResponse';

export type CreateNewNoteRepositoryResponse = {
  id: string;
}

export const createNewNoteRepository = async (note: NoteDto): Promise<ActionResponse<CreateNewNoteRepositoryResponse>> => {
  let { content, password, editPassword } = note;
  const { isPrivate } = note;

  if (isPrivate) {
    const hashedPassword = hashPassword(password!, hashAlgorithm);
    const encryptedContent = encryptContent({
      content,
      hashAlgorithm: hashAlgorithm,
      password: password!,
      ivLength: ivLength,
      algorithm: algorithm,
    });

    password = hashedPassword;
    content = encryptedContent;
  }

  if(editPassword) {
    editPassword = hashPassword(editPassword, hashAlgorithm);
  }

  const newNote = await prisma.note.create({
    data: {
      ...note,
      content,
      password,
      editPassword,
    },
  });

  return {
    data: {
      id: newNote.id,
    },
    error: null,
  };
};