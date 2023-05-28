import { useState, useEffect } from "react";
import translateMelody from "./translateMelody";
import loadInstrument from "./loadInstrument";
import * as Tone from "tone";

export default function Keyboard({ notes }) {
  const [notesString, setNotesString] = useState("");
  const instrument = loadInstrument("Sampler");

  useEffect(() => {
    setNotesString(notes);
  }, [notes]);

  useEffect(() => {
    const keys = document.querySelectorAll(".key");
    keys.forEach((key) => {
      const note = key.dataset.note;
      if (notesString) {
        const translatedMelody = translateMelody(notesString);
        if (translatedMelody?.includes(note)) {
          key.classList.add("active");
        } else {
          key.classList.remove("active");
        }
      }
    });
  }, [notesString]);

  const handleKeyDown = async (note) => {
    if (instrument) {
      await Tone.ToneAudioBuffer.loaded().then(() => {
        instrument.then((synth) => {
          synth.triggerAttackRelease(note, "4n");
        });
      });
      // instrument.triggerAttack(note);
    }
  };

  const handleKeyUp = async (note) => {
    if (instrument) {
      await Tone.ToneAudioBuffer.loaded().then(() => {
        instrument.then((synth) => {
          synth.triggerRelease(note, "4n");
        });
      });
      // instrument.triggerRelease(note);
    }
  };

  return (
    <div>
      <div className="piano">
        <div
          data-note="C"
          className="key white"
          onMouseDown={() => handleKeyDown("C4")}
          onMouseUp={() => handleKeyUp("C4")}
        >
          C
        </div>
        <div
          data-note="C#"
          className="key black"
          onMouseDown={() => handleKeyDown("C#4")}
          onMouseUp={() => handleKeyUp("C#4")}
        ></div>
        <div
          data-note="D"
          className="key white"
          onMouseDown={() => handleKeyDown("D4")}
          onMouseUp={() => handleKeyUp("D4")}
        >
          D
        </div>
        <div
          data-note="D#"
          className="key black"
          onMouseDown={() => handleKeyDown("D#4")}
          onMouseUp={() => handleKeyUp("D#4")}
        ></div>
        <div
          data-note="E"
          className="key white"
          onMouseDown={() => handleKeyDown("E4")}
          onMouseUp={() => handleKeyUp("E4")}
        >
          E
        </div>
        <div
          data-note="F"
          className="key white"
          onMouseDown={() => handleKeyDown("F#4")}
          onMouseUp={() => handleKeyUp("F#4")}
        >
          F
        </div>
        <div
          data-note="F#"
          className="key black"
          onMouseDown={() => handleKeyDown("F#4")}
          onMouseUp={() => handleKeyUp("F#4")}
        ></div>
        <div
          data-note="G"
          className="key white"
          onMouseDown={() => handleKeyDown("G4")}
          onMouseUp={() => handleKeyUp("G4")}
        >
          G
        </div>
        <div
          data-note="G#"
          className="key black"
          onMouseDown={() => handleKeyDown("G#4")}
          onMouseUp={() => handleKeyUp("G#4")}
        ></div>
        <div
          data-note="A"
          className="key white"
          onMouseDown={() => handleKeyDown("A4")}
          onMouseUp={() => handleKeyUp("A4")}
        >
          A
        </div>
        <div
          data-note="A#"
          className="key black"
          onMouseDown={() => handleKeyDown("A#4")}
          onMouseUp={() => handleKeyUp("A#4")}
        ></div>
        <div
          data-note="B"
          className="key white"
          onMouseDown={() => handleKeyDown("B4")}
          onMouseUp={() => handleKeyUp("B4")}
        >
          B
        </div>
      </div>
    </div>
  );
}
