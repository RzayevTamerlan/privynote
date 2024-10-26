'use client';

import { NewNoteForm } from '@components/new-note-form';
import { useFetchNewNote } from '@hooks/useFetchNewNote';

const NewNoteWidget = () => {
  const [loading, fetchNewNote] = useFetchNewNote();

  return (
    <NewNoteForm
      loading={loading}
      onSubmit={fetchNewNote}
    />
  );
};

export { NewNoteWidget };