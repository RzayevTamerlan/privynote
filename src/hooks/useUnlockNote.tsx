'use client';

import { ActionResponse } from '@/types/ActionResponse';
import { useState } from 'react';
import { unlockNoteService } from '@services/unlockNoteService';
import { UnlockNoteDto } from '@lib/dto/UnlockNoteDto';
import { showToasts } from '@utils/showToasts';

type UseUnlockNoteProps = [
  boolean,
  (password: string, id: string) => Promise<ActionResponse<{ content: string }>>
]

const useUnlockNote = (): UseUnlockNoteProps => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUnlockNote = async (password: string, id: string): Promise<ActionResponse<{ content: string }>> => {
    setLoading(() => true);

    const dto = { password, id };
    const res = await unlockNoteService(dto);

    if (res.error) {
      showToasts(res.error.message, 'error');
      setLoading(() => false);
      return {
        error: res.error,
        data: null,
      };
    }

    showToasts('Note unlocked 🥳', 'success');
    setLoading(() => false);

    return {
      error: null,
      data: res.data,
    };
  };

  return [loading, fetchUnlockNote];
};

export default useUnlockNote;