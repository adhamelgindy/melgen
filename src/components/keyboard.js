import { useState, useEffect } from "react";
import translateMelody from "./translateMelody";

export default function Keyboard({ notes }) {
  const [notesString, setNotesString] = useState("");

  useEffect(() => {
    setNotesString(notes);
  }, [notes]);

  useEffect(() => {
    const keys = document.querySelectorAll(".key");
    keys.forEach((key) => {
      const note = key.dataset.note;
      if (notesString) {
        const translatedMelody = translateMelody(notesString);
        if (translatedMelody.includes(note)) {
          key.classList.add("active");
        } else {
          key.classList.remove("active");
        }
      }
    });
  }, [notesString]);

  return (
    <div>
      <div className="piano">
        <div data-note="C" className="key white">
          C
        </div>
        <div data-note="C#" className="key black"></div>
        <div data-note="D" className="key white">
          D
        </div>
        <div data-note="D#" className="key black"></div>
        <div data-note="E" className="key white">
          E
        </div>
        <div data-note="F" className="key white">
          F
        </div>
        <div data-note="F#" className="key black"></div>
        <div data-note="G" className="key white">
          G
        </div>
        <div data-note="G#" className="key black"></div>
        <div data-note="A" className="key white">
          A
        </div>
        <div data-note="A#" className="key black"></div>
        <div data-note="B" className="key white">
          B
        </div>
      </div>
    </div>
  );
}
