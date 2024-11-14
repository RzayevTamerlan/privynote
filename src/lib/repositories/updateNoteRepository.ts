'use server';

import { algorithm, hashAlgorithm, ivLength } from '@constants/hash-algorithms';
import { NoteDto } from '@lib/dto/NoteDto';
import { encryptContent } from '@utils/encryptContent';
import { hashPassword } from '@utils/hashPassword';

import { prisma } from '@/prisma';
import { ActionResponse } from '@/types/ActionResponse';

export type UpdateNoteRepositoryResponse = {
  id: string;
}

export const updateNoteRepository = async (note: NoteDto): Promise<ActionResponse<UpdateNoteRepositoryResponse>> => {
  let { content, password  } = note;
  const { editPassword, isPrivate } = note;

  const noteToUpdate = await prisma.note.findUnique({
    where: {
      id: note.id,
    },
  });

  if (!noteToUpdate) {
    return {
      data: null,
      error: {
        message: 'Note not found',
        statusCode: 404,
      },
    };
  }

  const isEditPasswordCorrect = noteToUpdate.editPassword === hashPassword(editPassword!, hashAlgorithm);

  if(!isEditPasswordCorrect) {
    return {
      data: null,
      error: {
        message: 'Edit password is incorrect',
        statusCode: 401,
      },
    };
  }

  if (isPrivate) {
    const hashedPassword = hashPassword(password!, hashAlgorithm);
    const encryptedContent = encryptContent({
      content,
      password: password!,
      hashAlgorithm: hashAlgorithm,
      algorithm: algorithm,
      ivLength: ivLength,
    });

    password = hashedPassword;
    content = encryptedContent;
  }

  if(!isPrivate && noteToUpdate.isPrivate) {
    password = '';
  }

  if(!isPrivate && !noteToUpdate.isPrivate) {
    password = '';
    content = note.content;
  }

  const newNote = await prisma.note.update({
    where: {
      id: note.id,
    },
    data: {
      ...note,
      content,
      password,
      isEditable: true,
      editPassword: noteToUpdate?.editPassword,
    },
  });

  return {
    data: {
      id: newNote.id,
    },
    error: null,
  };
};