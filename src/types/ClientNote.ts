export type ClientNote = {
  id: string;
  isPrivate: boolean;
  isEditable: boolean;
  content: string;
  createdAt: Date;
}