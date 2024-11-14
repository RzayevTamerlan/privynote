'use client';

import { NoteForm } from '@components/note-form';
import { useFetchNewNote } from '@hooks/useFetchNewNote';

const NewNoteWidget = () => {
  const [loading, fetchNewNote] = useFetchNewNote();

  return (
    <NoteForm
      loading={loading}
      onSubmit={fetchNewNote}
    />
  );
};

export { NewNoteWidget };