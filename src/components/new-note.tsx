import { NewNoteWidget } from '@components/new-note-widget';

const NewNote = () => {
  return (
    <section id="note">
      <div className="container">
        <NewNoteWidget />
      </div>
    </section>
  );
};

export { NewNote };