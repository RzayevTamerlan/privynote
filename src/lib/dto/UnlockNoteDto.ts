import { NotePasswordSchema } from '@schemas/NotePasswordSchema';
import { NoteIdSchema } from '@schemas/NoteIdSchema';

export class UnlockNoteDto {
  public password: string;
  public id: string;

  constructor(dto: { password: string, id: string }) {
    this.password = dto.password;
    this.id = dto.id;
  }

  static validate(dto: { password: string, id: string }) {
    const parsedPassword = NotePasswordSchema.parse(dto);
    const parsedId = NoteIdSchema.parse(dto);
    return new UnlockNoteDto({ password: parsedPassword.password, id: parsedId.id });
  }
}