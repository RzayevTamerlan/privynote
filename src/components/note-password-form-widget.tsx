import type { FC } from 'react';
import useUnlockNote from '@hooks/useUnlockNote';
import NotePasswordForm from '@components/note-password-form';
import { useModal } from '@ui/animated-modal';

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
  };

  return (
    <NotePasswordForm
      loading={loading}
      onSubmit={handleSubmit}
    />
  );
};

export { NotePasswordFormWidget };