'use client';

import { unlockNoteService } from '@services/unlockNoteService';
import { showToasts } from '@utils/showToasts';
import { useState } from 'react';

import { ActionResponse } from '@/types/ActionResponse';

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

export { useUnlockNote };