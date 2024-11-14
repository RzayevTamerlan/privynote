import { EditNote } from '@components/edit-note';
import { GetNoteByIdDto } from '@lib/dto/GetNoteByIdDto';
import { ContentProvider } from '@providers/ContentProvider';
import { getNoteByIdService } from '@services/getNoteByIdService';
import { ModalProvider } from '@ui/animated-modal';
import Error from '@ui/Error';
import type { FC } from 'react';

type EditNoteInnerProps = {
  id: string;
};

const EditNoteInner: FC<EditNoteInnerProps> = async ({ id }) => {
  const note = await getNoteByIdService(new GetNoteByIdDto({ id }));

  if (note?.error && note.error.statusCode === 404) {
    return <div className="w-[100vw] h-[100dvh]">
      <h1 className="text-center text-4xl dark:text-white font-semibold text-main-black">Note not found</h1>
    </div>;
  }

  if (note?.error) {
    return (
      <Error
        className="mt-36"
        gotoLink="/"
        gotoText="Go to the main page"
        error={note.error.message}
      />
    );
  }

  if (note?.data?.isEditable === false) {
    return (
      <Error
        className="mt-36"
        gotoLink={`/note/${note?.data?.id}`}
        gotoText="Go to the note"
        error="This note is not editable!" />
    );
  }

  return (
    <ContentProvider>
      <ModalProvider>
        <EditNote
          note={note.data}
        />
      </ModalProvider>
    </ContentProvider>
  );
};

export { EditNoteInner };