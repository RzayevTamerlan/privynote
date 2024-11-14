import { NoteFormSchema } from '@schemas/NoteFormSchema';

export class NoteDto {
  public content: string;
  public isPrivate: boolean;
  public isEditable?: boolean;
  public password?: string;
  public editPassword?: string; // Optional, provided if note exists
  createdAt?: Date; // Optional, provided if note exists
  id?: string; // Optional, provided if note exists

  constructor(dto: {
    content: string;
    isEditable?: boolean;
    isPrivate: boolean;
    password?: string;
    editPassword?: string;
    id?: string;
  }) {
    this.content = dto.content;
    this.isPrivate = dto.isPrivate;
    this.isEditable = dto.isEditable;
    this.password = dto.password;
    this.editPassword = dto.editPassword;
    if(dto.id) {
      this.id = dto.id;
    }
  }

  static validate(dto: {
    content: string;
    isPrivate: boolean;
    password?: string;
    isEditable?: boolean;
    editPassword?: string;
    id?: string;
  }) {
    const parsedData = NoteFormSchema.parse(dto); // Zod will validate the data and throw if invalid
    if(dto?.id) {
      return new NoteDto({
        ...parsedData,
        id: dto.id,
      });
    } else {
      return new NoteDto(parsedData);
    } // Returns an instance of Note if validation passes
  }
}