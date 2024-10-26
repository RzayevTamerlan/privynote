import { NoteContent } from '@components/note-content';
import { GetNoteByIdDto } from '@lib/dto/GetNoteByIdDto';
import { getNoteByIdService } from '@services/getNoteByIdService';
import { ModalProvider } from '@ui/animated-modal';
import Error from '@ui/Error';
import type { FC } from 'react';

type NoteInnerProps = {
  id: string;
};

const NoteInner: FC<NoteInnerProps> = async ({ id }) => {
  const note = await getNoteByIdService(new GetNoteByIdDto({ id }));

  if (note?.error && note.error.statusCode === 404) {
    return <div className="w-[100vw] h-[100dvh]">
      <h1 className="text-center text-4xl dark:text-white font-semibold text-main-black">Note not found</h1>
    </div>;
  }

  if (note?.error) {
    return <Error gotoLink="/" gotoText="Go to the main page" error={note.error.message} />;
  }

  return (
    <ModalProvider>
      <NoteContent
        note={note.data}
      />
    </ModalProvider>
  );
};

export { NoteInner };