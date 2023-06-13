import { useState, useEffect } from "react";
import translateMelody from "./translateMelody";
import loadInstrument from "./loadInstrument";
import * as Tone from "tone";

export default function Keyboard({ notes, instrument, octave, bpm, cycles }) {
  // console.log('instrumentinstrumentinstrumentinstrument', instrument);
  const [notesString, setNotesString] = useState("");
  const synth = loadInstrument(instrument);

  useEffect(() => {
    setNotesString(notes);
  }, [notes]);

  useEffect(() => {
    const keys = document.querySelectorAll(".key");
    let index = 0;
  
    const activateNextKey = () => {
      const translatedMelody = translateMelody(notesString);
        const filteredTranslatedMelody = translatedMelody?.filter((element) => element !== "");
      if (notesString) { 
        filteredTranslatedMelody?.forEach(notaa => {
          
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
        }) 
       
      } 
      else {
        console.log('removeeeeeeeeeeee');
      }
      index++;
      // keep repeating 
      if (index >= filteredTranslatedMelody?.length) {
        index = 0;
      }
    };
  
    const interval = setInterval(() => {
      activateNextKey();
      // setTimeout(() => {
      //   activateNextKey();
      // }, 500000); // Hold half a second on each key
    }, 500); // Set the desired time interval between key activations
  
    // keys.forEach((key) => {
    //   const note = key.dataset.note;
    //   if (notesString) {
    //     const translatedMelody = translateMelody(notesString);
    //     if (translatedMelody?.includes(note)) {
    //       key.classList.add("active");
    //     } else {
    //       key.classList.remove("active");
    //     }
    //   }
    // });
    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
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
