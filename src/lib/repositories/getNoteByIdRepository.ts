'use server';

import { GetNoteByIdDto } from '@lib/dto/GetNoteByIdDto';

import { prisma } from '@/prisma';
import { ActionResponse } from '@/types/ActionResponse';
import { ClientNote } from '@/types/ClientNote';

export const getNoteByIdRepository = async (dto: GetNoteByIdDto): Promise<ActionResponse<ClientNote>> => {
  const note = await prisma.note.findUnique({
    where: {
      id: dto.id,
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

  return {
    data: {
      id: note.id,
      content: note.content,
      createdAt: note.createdAt,
      isEditable: note.isEditable,
      isPrivate: note.isPrivate,
    },
    error: null,
  };
};