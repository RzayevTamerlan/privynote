'use client';

import { NotePrivateModal } from '@components/note-private-modal';
import { useFontSize } from '@hooks/useFontSize';
import { usePrivate } from '@hooks/usePrivate';
import { useContent } from '@providers/ContentProvider';
import { Button } from '@ui/button';
import { clearHtml } from '@utils/clearHtml';
import Link from 'next/link';
import { FC } from 'react';

import { ClientNote } from '@/types/ClientNote';

type NoteContentProps = {
  note: ClientNote;
};

const NoteContent: FC<NoteContentProps> = ({ note }) => {
  const { content } = useContent();
  const { setIsUnlocked, isUnlocked } = usePrivate(note);

  const {
    fontSize,
    FontSizeControlsComponent,
  } = useFontSize();

  return (
    <div className="my-[90px] flex flex-col gap-5">
      {!isUnlocked && note?.isPrivate && (
        <NotePrivateModal
          setIsUnlocked={setIsUnlocked}
          id={note.id}
        />
      )}

      <div className="flex items-center justify-between">
        {FontSizeControlsComponent}
        {note?.isEditable && (
          <Button className="p-0" variant="ghost">
            <Link href={`/note/edit/${note?.id}`} className="text-xl py-3 px-5 font-semibold">
              Edit this note
            </Link>
          </Button>
        )}
      </div>

      <article
        style={{
          whiteSpace: 'pre-wrap',
          fontSize: `${fontSize}px`,
          lineHeight: '1.8',
        }}
        dangerouslySetInnerHTML={clearHtml(content)}
      />
    </div>
  );
};

export { NoteContent };
