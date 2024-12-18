import { NotePasswordForm } from '@components/note-password-form';
import { useUnlockNote } from '@hooks/useUnlockNote';
import { useModal } from '@ui/animated-modal';
import Cookies from 'js-cookie';
import type { FC } from 'react';

type NotePasswordFormWidgetProps = {
  setIsUnlocked: (isUnlocked: boolean) => void;
  setContent: (content: string) => void;
  id: string;
}

const NotePasswordFormWidget: FC<NotePasswordFormWidgetProps> = ({ setContent, setIsUnlocked, id }) => {
  const [loading, unlockNote] = useUnlockNote();
  const { setOpen } = useModal();

  const handleSubmit = async (data: { password: string }) => {
    const res = await unlockNote(data?.password, id);

    if (res.error) return;

    setContent(res.data.content);
    setIsUnlocked(true);
    setOpen(false);

    Cookies.set(`note_${id}`, data.password, {
      secure: false,
      sameSite: 'strict',
      expires: 3,
    });

  };

  return (
    <NotePasswordForm
      loading={loading}
      onSubmit={handleSubmit}
    />
  );
};

export { NotePasswordFormWidget };