import { NoteDto } from '@lib/dto/NoteDto';
import { updateNoteService } from '@services/updateNoteService';
import { showToasts } from '@utils/showToasts';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type UseFetchUpdateNote = [boolean, (note: NoteDto) => Promise<void>];

const useFetchUpdateNote = (): UseFetchUpdateNote => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchUpdateNote = async (note: NoteDto) => {
    setIsLoading(() => true);

    const res = await updateNoteService(note);

    if (res.error) {
      showToasts(res.error.message, 'error');
      setIsLoading(() => false);
      return;
    }

    showToasts('Note updated successfully!', 'success');

    router.refresh();
    router.push(`/note/${res.data.id}`);

    setIsLoading(() => false);
  };

  return [isLoading, fetchUpdateNote];
};

export { useFetchUpdateNote };