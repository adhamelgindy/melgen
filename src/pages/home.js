import React, { useEffect } from "react";
import { useState } from "react";
import { Shuffle } from "../icons/shuffle";
import { Play } from "../icons/play";
import { Reverse } from "../icons/reverse";
import { Edit } from "../icons/edit";
import * as Tone from "tone";
import Keyboard from "../components/keyboard";
import Scale from "../components/scale";
import RootNote from "../components/rootNote";
import Octave from "../components/octave";
import Cycles from "../components/cycles";
import MelodyLength from "../components/melodyLength";
import translateMelody from "../components/translateMelody";
import connectMidi from "../components/connectMidi";
import loadInstrument from "../components/loadInstrument";
import Instrument from "../components/instrument";

export default function Home() {
  const [notes, setNotes] = useState(""); // pitch notes
  const [midiNotes, setMidiNotes] = useState([]);
  const [keyboardNotes, setKeyboardNotes] = useState([]);
  const [selectedScale, setSelectedScale] = useState(5);
  const [melodyLength, setMelodyLength] = useState(6);
  const [rootNote, setRootNote] = useState(48);
  const [bpm, setBpm] = useState(280);
  const [cycles, setcycles] = useState(2);
  const [octave, setOctave] = useState(4);
  const [instrument, setInstrument] = useState("Sampler");
  const [isChecked, setIsChecked] = useState(false);
  const [prevMelody, setPrevMelody] = useState([]);
  const [showDropdowns, setShowDropdowns] = useState(false);
  const [melodyCollection, setMelodyCollection] = useState([]);
  let melodysCollection = {
    melodies: [],
  };
  // const [isButtonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    connectMidi(instrument);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // let root = rootNote;
  let scale = [
    [0, 2, 4, 5, 7, 9, 11, 12], // 'Major'
    [0, 2, 4, 7, 9], // 'Major Pentatonic'
    [0, 2, 3, 5, 7, 8, 10, 12], // 'Minor'
    [0, 3, 5, 7, 10], // 'Minor Pentatonic'
    [0, 2, 3, 5, 7, 9, 11, 12], // 'Melodic Minor'
    [0, 2, 3, 5, 7, 8, 11, 12], // 'Natural Minor'
    [0, 2, 3, 5, 7, 9, 10, 12], // 'Dorian'
    [0, 1, 3, 5, 7, 8, 10, 12], //'Phrygian'
    [0, 2, 4, 6, 7, 9, 11, 12], // 'Lydian'
    [0, 2, 4, 5, 7, 9, 10, 12], // 'Mixolydian'
    [0, 1, 3, 5, 6, 8, 10, 12], // 'Locrian'
  ];

  let melody = [];
  let randomNumber;
  let note;

  //#########################################//
  //               GENERATOR                 //
  //#########################################//

  async function generateMelody() {
    // melody array is already at the desired length
    if (melody.length === melodyLength) {
      // reset
      melody.splice(0, melody.length);
    }

    for (let i = 0; i < melodyLength; i++) {
      // Random integer between 0 and the length of array
      randomNumber = Math.floor(Math.random() * scale[selectedScale]?.length);
      // Add Scale
      note = rootNote + scale[selectedScale][randomNumber];
      melody.push(note);

      if (melodyLength > 5 && melody.length < melodyLength) {
        // Repeat the last 2 or 4 notes with a probability of 30%
        if (i > 1 && Math.random() < 0.3 && melody.length < melodyLength) {
          let repeatLength = Math.random() < 0.5 ? 2 : 4;
          let repeatStart = Math.max(0, i - repeatLength);
          let repeatNotes = melody.slice(repeatStart, i + 1);
          melody.splice(i + 1, 0, ...repeatNotes);
          i += repeatNotes.length;
        }
        // Repeat a 3-note pattern with a probability of 20%
        if (i > 2 && Math.random() < 0.2 && melody.length < melodyLength) {
          let patternStart = Math.max(0, i - 2);
          let patternNotes = melody.slice(patternStart, i + 1);
          melody.splice(i + 1, 0, ...patternNotes);
          i += patternNotes.length;
        }
      }
    }
    if (melody.length > melodyLength) {
      melody.splice(melodyLength, melody.length - melodyLength);
    }
    if (prevMelody !== null && prevMelody !== melody) {
      setPrevMelody(melody);
      melodysCollection.melodies.prevMelody = prevMelody;
      setMelodyCollection(melodysCollection.melodies.prevMelody);
      // setPrevMelody(melodysCollection.melodies.prevMelody);
      console.log(
        "prevMelody",
        prevMelody,
        "melody",
        melody
      );
    }
     console.log("melody", melody);
     const melodyCopy = [...melody]; // Create a copy of the melody array
     melodysCollection.melodies.push(melodyCopy);
     console.log('melodysCollectionnnnnnnn', melodysCollection);
     setMidiNotes(melody);
     const kkkNotes = melody;
     setKeyboardNotes(kkkNotes)
    // setMidiNotes([48, 49, 50, 50, 50, 50, 50, 55, 56]);
    setNotes(translateMelody(melody)?.join(" "));
    return midiNotes;
  }

  //#########################################//
  //                Player                   //
  //#########################################//

  const playNotes = async (notes) => {
    const synth = loadInstrument(instrument);
    let index = 0;
    // setKeyboardNotes(midiNotes);
    // find another solution so the keyboard does not stop playing
    const translatedMidiNotes = translateMelody(midiNotes);
    translatedMidiNotes?.forEach((note, index) => {
      if (!note.includes(octave)) {
        midiNotes[index] = note + octave;
      }
    });

    console.log("melody4", midiNotes);
    setMidiNotes(midiNotes);

    const playNote = async () => {
      await Tone.ToneAudioBuffer.loaded().then(() => {
        synth.then((instrument) => {
          Tone.Transport.start();
          instrument.triggerAttackRelease(
            notes[index],
            "4n"
            // Math.floor(Math.random() * 4) + 1 + "n"
          );
          // console.log('Tone.Transport.state', Tone.Transport.state);
        });
      });
      index++;
      // setButtonDisabled(true);
      // setTimeout(() => {
      //   setButtonDisabled(false);
      // }, 4000);
      if (index >= notes.length) {
        index = 0; // Reset index to replay from the beginning
      }
    };

      for (let i = 0; i < (notes.length * cycles) ; i++) {
        await playNote();
        await new Promise((playAgain) =>
          setTimeout(playAgain, mirrorValue(bpm))
        );
      }
  };

  function mirrorValue(value) {
    var range = 480 - 160;
    var mirroredValue = range - (value - 160);
    return mirroredValue;
  }

  //#########################################//
  //             HANDLE CHANGES              //
  //#########################################//

  function handleBpmChange(event) {
    setBpm(event.target.value);
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.bpm.rampTo(bpm, 0.001);
  };

  const handleOctaveChange = (selectedOctave) => {
    setOctave(selectedOctave);
  };

  const handleMelodyLengthChange = (selectedLength) => {
    setMelodyLength(selectedLength);
  };

  const handleInstrumentChange = (selectedInstrument) => {
    setInstrument(selectedInstrument);
  };

  const handleScaleChange = (selectedScale) => {
    setSelectedScale(selectedScale);
  };

  const handleRootNoteChange = (selectedRootNote) => {
    console.log("selectedRootNote selectedRootNote:", selectedRootNote);
    setRootNote(selectedRootNote);
  };

  const handleCyclesChange = (selectedCycles) => {
    setcycles(selectedCycles);
  };

  const handleMidiCheckbox = (event) => {
    setIsChecked(event.target.checked);
    location.reload();
  };

  const reverseMelody = () => {
   
    console.log('prevMelody', prevMelody);
    console.log('midiNotes', midiNotes);
    console.log('melodyCollection',melodyCollection);
    if(prevMelody === midiNotes){
      setMidiNotes(melodyCollection);
      setNotes(translateMelody(melodyCollection)?.join(" "))
    }else {
      setMidiNotes(prevMelody);
      setNotes(translateMelody(prevMelody)?.join(" "))
    }
    console.log('melodysCollection.prevMelody', melodysCollection);
  };

  const handleToggleDropdowns = () => {
    setShowDropdowns(!showDropdowns);
  };

  return (
    <div class="melody">
      <label>MIDI:</label>
      <input
        className="slider"
        type="checkbox"
        id="midi-checkbox"
        checked={isChecked}
        onChange={handleMidiCheckbox}
      />
      <br />
      <div>
      <button class="menuButton" onClick={handleToggleDropdowns}>
        <Edit/>
      </button>
      {showDropdowns && (
        <div class="menuOptions">
          <div>
            Scale <Scale onChange={handleScaleChange} />
          </div>
          <div>
            Octave <Octave onChange={handleOctaveChange} />
          </div>
          <div>
            Length <MelodyLength onChange={handleMelodyLengthChange} />
          </div>
          <div>
            Root <RootNote onChange={handleRootNoteChange} />
          </div>
          <div>
            Cycles <Cycles onChange={handleCyclesChange} />
          </div>
          <div>
            Instrument <Instrument onChange={handleInstrumentChange} />
          </div>
        </div>
      )}
    </div>
    <br/>
      <div>
        
        <Keyboard notes={keyboardNotes} instrument={instrument} octave={octave} bpm={bpm} cycles={cycles}/>
        <p class="melody">{notes}</p>
        {/* <p class="melody">{translateMelody(prevMelody)?.join(" ")}</p> */}
        <button
          className="rewindButton"
          hidden={midiNotes.length === 0}
          onClick={() => reverseMelody()}
        >
          <Reverse />
        </button>
        <button class="round-button" onClick={generateMelody}>
          <Shuffle />
        </button>
        <button
          className="rewindButton"
          hidden={midiNotes.length === 0}
          onClick={() => playNotes(midiNotes)}
          // disabled={isButtonDisabled}
        >
          <Play />
        </button>
        <br/>
        <div>
          <input
            type="range"
            class="slider"
            min="160"
            max="380"
            value={bpm}
            onChange={handleBpmChange}
          />
          {/* <p>BPM: {bpm*0.5}</p> */}
        </div>
      </div>
    </div>
  );
}
