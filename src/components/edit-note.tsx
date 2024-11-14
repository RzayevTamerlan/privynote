'use client';

import { EditNoteFormWidget } from '@components/edit-note-form-widget';
import { NotePrivateModal } from '@components/note-private-modal';
import { usePrivate } from '@hooks/usePrivate';
import { useContent } from '@providers/ContentProvider';
import type { FC } from 'react';

import { ClientNote } from '@/types/ClientNote';


type NoteEditProps = {
  note: ClientNote;
}

const EditNote: FC<NoteEditProps> = ({ note }) => {
  const { content } = useContent();
  const { setIsUnlocked, isUnlocked } = usePrivate(note);

  return (
    <div className="my-[90px] flex flex-col gap-5">
      {!isUnlocked && note?.isPrivate && (
        <NotePrivateModal
          setIsUnlocked={setIsUnlocked}
          id={note.id}
        />
      )}

      {isUnlocked && (
        <EditNoteFormWidget
          note={{
            ...note,
            content: content!,
          }}
        />
      )}
    </div>
  );
};

export { EditNote };