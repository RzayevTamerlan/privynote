import { NoteFormSchema } from '@schemas/NoteFormSchema';

export class NoteDto {
  public content: string;
  public isPrivate: boolean;
  public password?: string;
  createdAt?: Date; // Optional, provided if note exists
  id?: string; // Optional, provided if note exists

  constructor(dto: { content: string; isPrivate: boolean; password?: string }) {
    this.content = dto.content;
    this.isPrivate = dto.isPrivate;
    this.password = dto.password;
  }

  static validate(dto: { content: string; isPrivate: boolean; password?: string }) {
    const parsedData = NoteFormSchema.parse(dto); // Zod will validate the data and throw if invalid
    return new NoteDto(parsedData); // Returns an instance of Note if validation passes
  }
}