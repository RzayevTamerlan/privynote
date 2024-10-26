'use client';

import { NotePasswordFormWidget } from '@components/note-password-form-widget';
import { ModalBody } from '@ui/animated-modal';
import type { FC } from 'react';

type NotePrivateModalProps = {
  setIsUnlocked: (isUnlocked: boolean) => void;
  setContent: (content: string) => void;
  id: string;
};

const NotePrivateModal: FC<NotePrivateModalProps> = ({ setIsUnlocked, setContent, id }) => {
  return (
    <ModalBody>
      <div className="flex flex-col gap-5 p-10 items-center">
        <h2 className="text-2xl dark:text-white text-main-black font-semibold">
          🔒 Shhh! It&apos;s a Secret Note!
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