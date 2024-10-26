'use server';

import { validateDto } from '@utils/validateDto';
import { GetNoteByIdDto } from '@lib/dto/GetNoteByIdDto';
import { getNoteByIdRepository } from '@repositories/getNoteByIdRepository';

export const getNoteByIdService = async (dto: GetNoteByIdDto) => {
  const validatedNoteId = validateDto<GetNoteByIdDto>(GetNoteByIdDto, dto);

  if(validatedNoteId.error) {
    return validatedNoteId;
  }

  return getNoteByIdRepository(dto);
};