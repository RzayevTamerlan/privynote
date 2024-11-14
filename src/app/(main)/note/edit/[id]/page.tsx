import { EditNoteInner } from '@components/edit-note-inner';
import { FC, Suspense } from 'react';

type NoteEditPageProps = {
  params: Promise<{ id: string }>;
}

const NoteEditPage:FC<NoteEditPageProps> = async props => {
  const params = await props.params;
  const { id } = params;

  return (
    <main className="py-10">
      <div className="container">
        <Suspense fallback="Loading...">
          <EditNoteInner
            id={id}
          />
        </Suspense>
      </div>
    </main>
  );
};

export default NoteEditPage;