import { FC, Suspense } from 'react';
import { NoteInner } from '@components/note-inner';

type NotePageProps = {
  params: Promise<{ id: string }>;
};

const NotePage: FC<NotePageProps> = async props => {
  const params = await props.params;
  const { id } = params;

  return (
    <main className="py-10">
      <div className="container">
        <Suspense fallback='Loading...'>
          <NoteInner id={id} />
        </Suspense>
      </div>
    </main>
  );
};

export default NotePage;