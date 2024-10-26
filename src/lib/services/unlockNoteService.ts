'use server';

import { UnlockNoteDto } from '@lib/dto/UnlockNoteDto';
import { validateDto } from '@utils/validateDto';
import { unlockNoteRepository } from '@repositories/unlockNoteRepository';

export const unlockNoteService = async (dto: UnlockNoteDto) => {
  const validatedUnlockNote = validateDto<UnlockNoteDto>(UnlockNoteDto, dto);

  if (validatedUnlockNote.error) {
    return validatedUnlockNote;
  }

  return unlockNoteRepository(dto);
};