import { NoteDto } from '@lib/dto/NoteDto';
import { createNewNoteService } from '@services/createNewNoteService';
import { showToasts } from '@utils/showToasts';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type UseFetchNewNote = [boolean, (note: NoteDto) => Promise<void>];

const useFetchNewNote = (): UseFetchNewNote => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchNewNote = async (note: NoteDto) => {
    setIsLoading(() => true);
    const res = await createNewNoteService(note);

    if (res.error) {
      showToasts(res.error.message, 'error');
      setIsLoading(() => false);
      return;
    }

    showToasts('Note created successfully!', 'success');

    router.refresh();
    router.push(`/note/${res.data.id}`);

    setIsLoading(() => false);
  };

  return [isLoading, fetchNewNote];
};

export { useFetchNewNote };