import { useState, useEffect } from "react";
import translateMelody from "./translateMelody";
import loadInstrument from "./loadInstrument";
import * as Tone from "tone";
import translateMelodyMidi from "./translateMelodyMidi";

export default function Keyboard({ notes, instrument, octave, bpm, cycles }) {
  // console.log('instrumentinstrumentinstrumentinstrument', instrument);
  const [notesString, setNotesString] = useState("");
  const [stableNotes, setStableNotes] = useState([]);
  const synth = loadInstrument(instrument);

  useEffect(() => {
    // if (notes.some((item) => typeof item === "number")){
    //   setStableNotes(notes)
    // }
    setNotesString(notes);
  }, [notes]);

  useEffect(() => {
    const keys = document.querySelectorAll(".key");
      let index = 0;

      const activateKeys = () => {
        const midiNotes = translateMelodyMidi(notes)
        keys.forEach((key) => {
          const note = key.dataset.note;
          if (midiNotes) {
            const translatedMelody = translateMelody(midiNotes);
            if (translatedMelody?.includes(note)) {
              key.classList.add("active");
            } else {
              key.classList.remove("active");
            }
          }
        });
      }
      
      const activateNextKey = () => {
        if (notes.some((item) => typeof item === "number")){
          setStableNotes(notes)
        } else {
          setStableNotes("")
        }
        // console.log("notesString", notesString);
        let translatedMelody;
        let filteredTranslatedMelody;
        // const hasNumbers = arr => arr.some(item => typeof item === 'number');
        for (let i = 0; i < notesString.length; i++) {
          if (typeof notesString[i] === "number") {
            translatedMelody = translateMelody(notesString);
          } else {
            translatedMelody = notesString;
          }
        }
        filteredTranslatedMelody = translatedMelody?.filter(
          (element) => element !== ""
        );
        if (translatedMelody) {
          filteredTranslatedMelody?.forEach((notaa) => {
            keys.forEach((key) => {
              const note = key.dataset.note;
              const noteIndex = filteredTranslatedMelody?.indexOf(note);
              //  console.log('noteIndex', noteIndex);
              // if (notaa === note) {
              if (noteIndex === index) {
                // console.log('i', index);
                if (!key.classList.contains("active")) {
                  key.classList.add("active");
                }
              } else {
                key.classList.remove("active");
              }
            });
          });
        } else {
          console.log("removeeeeeeeeeeee");
        }
        index++;
        // keep repeating
        if (index >= filteredTranslatedMelody?.length) {
          index = 0;
        }
      };

      const interval = setInterval(() => {
        if (notes.some((item) => typeof item === "number")) {
          activateNextKey();
        } else {
          activateKeys();
        }
        // setTimeout(() => {
        //   activateNextKey();
        // }, 500000); // Hold half a second on each key
      }, 600); 

      return () => {
        clearInterval(interval); // Clean up the interval when the component unmounts
      };
    // }
  }, [notesString]);

  // useLayoutEffect(() => {});

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

  function mirrorValue(value) {
    var range = 480 - 160;
    var mirroredValue = range - (value - 160);
    return mirroredValue;
  }

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
