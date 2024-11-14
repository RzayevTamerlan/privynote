"use server";

import { NoteDto } from '@lib/dto/NoteDto';
import { updateNoteRepository } from '@repositories/updateNoteRepository';
import { validateDto } from '@utils/validateDto';

export const updateNoteService = async (note: NoteDto) => {
  const validatedNote = validateDto<NoteDto>(NoteDto, note);

  if(validatedNote.error) {
    return validatedNote;
  }

  return updateNoteRepository(validatedNote.data);
};