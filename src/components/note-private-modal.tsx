'use client';

import { NotePasswordFormWidget } from '@components/note-password-form-widget';
import { useContent } from '@providers/ContentProvider';
import { ModalBody } from '@ui/animated-modal';
import type { FC } from 'react';

import { jetBrainsMono } from '@/fonts';

type NotePrivateModalProps = {
  setIsUnlocked: (isUnlocked: boolean) => void;
  id: string;
};

const NotePrivateModal: FC<NotePrivateModalProps> = ({ setIsUnlocked, id }) => {
  const { setContent } = useContent();

  return (
    <ModalBody>
      <div className="flex flex-col gap-4 p-10 items-center">
        <h2 className="text-2xl dark:text-white text-main-black font-semibold">
          🔒 Shhh! It&apos;s a <span className={`text-[#3B82F6] text-3xl font-bold ${jetBrainsMono.className}`}>Privy Note</span>!
        </h2>
        <p className="text-lg dark:text-white text-main-black text-center">
          🕵️‍♂️ This content is as private as your best-kept secret! <br />
          Please enter the <span className="text-yellow-500 font-bold">magic password</span> to unlock the treasure
          inside! ✨
        </p>
        <NotePasswordFormWidget
          id={id}
          setIsUnlocked={setIsUnlocked}
          setContent={setContent}
        />
      </div>
    </ModalBody>
  );
};

export { NotePrivateModal };