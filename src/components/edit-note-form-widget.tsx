import { EditNoteForm } from '@components/edit-note-form';
import { useFetchUpdateNote } from '@hooks/useFetchUpdateNote';
import { EditNoteFormSchema } from '@schemas/EditNoteFormSchema';
import Cookies from 'js-cookie';
import { FC } from 'react';
import { z } from 'zod';

import { ClientNote } from '@/types/ClientNote';

type EditNoteFormWidgetProps = {
  note: ClientNote;
}

const EditNoteFormWidget: FC<EditNoteFormWidgetProps> = ({ note }) => {
  const [loading, updateNote] = useFetchUpdateNote();

  const handleUpdateNote = async (data: z.infer<typeof EditNoteFormSchema>) => {
    const { content, isPrivate, editPassword } = data;
    const password = Cookies.get(`note_${note.id}`);

    const updateDto = {
      content,
      isPrivate,
      password: data?.password || password,
      editPassword,
      isEditable: true,
    };

    await updateNote({
      ...updateDto,
      id: note.id,
    });
  };

  return (
    <EditNoteForm
      note={note}
      onSubmit={handleUpdateNote}
      loading={loading}
    />
  );
};

export { EditNoteFormWidget };