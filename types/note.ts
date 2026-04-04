export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}
