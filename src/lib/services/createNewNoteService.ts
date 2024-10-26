"use server";

import { validateDto } from '@utils/validateDto';
import { NoteDto } from '@lib/dto/NoteDto';
import { createNewNoteRepository } from '@repositories/createNewNoteRepository';

export const createNewNoteService = async (note: NoteDto) => {
  const validatedNote = validateDto<NoteDto>(NoteDto, note);

  if(validatedNote.error) {
    return validatedNote;
  }

  return createNewNoteRepository(validatedNote.data);
}