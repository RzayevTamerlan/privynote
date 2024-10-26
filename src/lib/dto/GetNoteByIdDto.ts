import { NoteIdSchema } from '@schemas/NoteIdSchema';

export class GetNoteByIdDto {
  public id: string;

  constructor(dto: { id: string }) {
    this.id = dto.id;
  }

  static validate(dto: { id: string }) {
    const parsedData = NoteIdSchema.parse(dto); // Zod will validate the data and throw if invalid
    return new GetNoteByIdDto(parsedData); // Returns an instance of Note if validation
  }
}