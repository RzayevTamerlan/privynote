"use server";

import { NoteDto } from '@lib/dto/NoteDto';
import { createNewNoteRepository } from '@repositories/createNewNoteRepository';
import { validateDto } from '@utils/validateDto';

export const createNewNoteService = async (note: NoteDto) => {
  const validatedNote = validateDto<NoteDto>(NoteDto, note);

  if(validatedNote.error) {
    return validatedNote;
  }

  return createNewNoteRepository(validatedNote.data);
};