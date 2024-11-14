import { useContent } from '@providers/ContentProvider';
import { unlockNoteService } from '@services/unlockNoteService';
import { useModal } from '@ui/animated-modal';
import Cookies from 'js-cookie';
import { useLayoutEffect, useState } from 'react';

import { ClientNote } from '@/types/ClientNote';

const usePrivate = (note: ClientNote) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(!note.isPrivate);
  const { setContent } = useContent();
  const { setOpen } = useModal();

  useLayoutEffect(() => {
    (async () => {
      if (note.isPrivate && !isUnlocked) {
        const storedPassword = Cookies.get(`note_${note.id}`);

        if (!storedPassword) {
          setOpen(true);
          return;
        }

        const isUnlocked = await unlockNoteService({
          id: note.id,
          password: storedPassword,
        });

        if (isUnlocked?.error) {
          setOpen(true);
          Cookies.remove(`note_${note.id}`);
          return;
        }

        setContent(isUnlocked?.data?.content);
        setIsUnlocked(true);
        return;
      }

      if(!note.isPrivate) {
        setContent(note.content);
      }
    })();
  }, [isUnlocked, note.isPrivate, setOpen, note.content, note.id, setContent]);


  return {
    isUnlocked,
    setIsUnlocked,
  };
};

export { usePrivate };