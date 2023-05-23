import { useState, useEffect } from 'react';

export default function Keyboard({ notes }) {
  const [notesString, setNotesString] = useState('');

  useEffect(() => {
    setNotesString(notes);
  }, [notes]);

  useEffect(() => {
    const keys = document.querySelectorAll('.key');
    keys.forEach((key) => {
      const note = key.dataset.note;
      console.log('notesString', notesString);
      if (notesString.includes(note)) {
        key.classList.add('active');
      } else {
        key.classList.remove('active');
      }
    });
  }, [notesString]);

  return (
    <div>
      <div className="piano">
        <div data-note="C" className="key white"></div>
        <div data-note="C#" className="key black"></div>
        <div data-note="D" className="key white"></div>
        <div data-note="D#" className="key black"></div>
        <div data-note="E" className="key white"></div>
        <div data-note="F" className="key white"></div>
        <div data-note="F#" className="key black"></div>
        <div data-note="G" className="key white"></div>
        <div data-note="G#" className="key black"></div>
        <div data-note="A" className="key white"></div>
        <div data-note="A#" className="key black"></div>
        <div data-note="B" className="key white"></div>
      </div>
    </div>
  );
}
