import { useState, useEffect } from "react";
import translateMelody from "./translateMelody";
import loadInstrument from "./loadInstrument";
import * as Tone from "tone";

export default function Keyboard({ notes, instrument, octave }) {
  // console.log('instrumentinstrumentinstrumentinstrument', instrument);
  const [notesString, setNotesString] = useState("");
  const synth = loadInstrument(instrument);

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
        synth.then((key) => {
          key.triggerAttackRelease(note, "4n");
        });
      });
      // instrument.triggerAttack(note);
    }
  };

  const handleKeyUp = async (note) => {
    if (instrument) {
      await Tone.ToneAudioBuffer.loaded().then(() => {
        synth.then((key) => {
          key.triggerRelease(note, "4n");
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
          onMouseDown={() => handleKeyDown("C" + octave)}
          onMouseUp={() => handleKeyUp("C" + octave)}
        >
          C
        </div>
        <div
          data-note="C#"
          className="key black"
          onMouseDown={() => handleKeyDown("C#" + octave)}
          onMouseUp={() => handleKeyUp("C#" + octave)}
        ></div>
        <div
          data-note="D"
          className="key white"
          onMouseDown={() => handleKeyDown("D" + octave)}
          onMouseUp={() => handleKeyUp("D" + octave)}
        >
          D
        </div>
        <div
          data-note="D#"
          className="key black"
          onMouseDown={() => handleKeyDown("D#" + octave)}
          onMouseUp={() => handleKeyUp("D#" + octave)}
        ></div>
        <div
          data-note="E"
          className="key white"
          onMouseDown={() => handleKeyDown("E" + octave)}
          onMouseUp={() => handleKeyUp("E" + octave)}
        >
          E
        </div>
        <div
          data-note="F"
          className="key white"
          onMouseDown={() => handleKeyDown("F" + octave)}
          onMouseUp={() => handleKeyUp("F" + octave)}
        >
          F
        </div>
        <div
          data-note="F#"
          className="key black"
          onMouseDown={() => handleKeyDown("F#" + octave)}
          onMouseUp={() => handleKeyUp("F#" + octave)}
        ></div>
        <div
          data-note="G"
          className="key white"
          onMouseDown={() => handleKeyDown("G" + octave)}
          onMouseUp={() => handleKeyUp("G" + octave)}
        >
          G
        </div>
        <div
          data-note="G#"
          className="key black"
          onMouseDown={() => handleKeyDown("G#" + octave)}
          onMouseUp={() => handleKeyUp("G#" + octave)}
        ></div>
        <div
          data-note="A"
          className="key white"
          onMouseDown={() => handleKeyDown("A" + octave)}
          onMouseUp={() => handleKeyUp("A" + octave)}
        >
          A
        </div>
        <div
          data-note="A#"
          className="key black"
          onMouseDown={() => handleKeyDown("A#" + octave)}
          onMouseUp={() => handleKeyUp("A#" + octave)}
        ></div>
        <div
          data-note="B"
          className="key white"
          onMouseDown={() => handleKeyDown("B" + octave)}
          onMouseUp={() => handleKeyUp("B" + octave)}
        >
          B
        </div>
      </div>
    </div>
  );
}
