'use server';

import { GetNoteByIdDto } from '@lib/dto/GetNoteByIdDto';
import { Note } from '@prisma/client';

import { prisma } from '@/prisma';
import { ActionResponse } from '@/types/ActionResponse';

export const getNoteByIdRepository = async (dto: GetNoteByIdDto): Promise<ActionResponse<Note>> => {
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
    data: note,
    error: null,
  };
};