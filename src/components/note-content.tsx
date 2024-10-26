'use client';

import type { Note } from '@prisma/client';
import { FC, useLayoutEffect, useState } from 'react';
import { useModal } from '@ui/animated-modal';
import { NotePrivateModal } from '@components/note-private-modal';
import { clearHtml } from '@utils/clearHtml';
import { FontSizeControls } from '@ui/font-size-controls';

type NoteContentProps = {
  note: Note;
};

const DEFAULT_FONT_SIZE = 18;

const NoteContent: FC<NoteContentProps> = ({ note }) => {
  const [content, setContent] = useState<string | null>(note.isPrivate ? null : note.content);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(!note.isPrivate);
  const { setOpen } = useModal();

  // State for font size
  const [fontSize, setFontSize] = useState<number>(DEFAULT_FONT_SIZE); // Default font size in pixels

  useLayoutEffect(() => {
    if (note.isPrivate && !isUnlocked) {
      setOpen(true);
    }
  }, [isUnlocked, note.isPrivate, setOpen]);

  // Handlers for font size control
  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 33)); // Increase by 2px but not above 30px
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 10)); // Decrease by 2px but not below 10px
  };

  const resetFontSize = () => {
    setFontSize(DEFAULT_FONT_SIZE); // Reset to default size
  };

  return (
    <div className="my-[90px] flex flex-col gap-5">
      <NotePrivateModal
        setIsUnlocked={setIsUnlocked}
        setContent={setContent}
        id={note.id}
      />

      {/* Font size control buttons */}
      <FontSizeControls
        fontSize={fontSize}
        increaseFontSize={increaseFontSize}
        resetFontSize={resetFontSize}
        decreaseFontSize={decreaseFontSize}
      />

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
