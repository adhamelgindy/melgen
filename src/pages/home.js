import React, { useEffect } from "react";
import { useState } from "react";
import { Shuffle } from "../icons/shuffle";
import { Play } from "../icons/play";
import * as Tone from "tone";
import Keyboard from "../components/keyboard";
import Scale from "../components/scale";
import Octave from "../components/octave";
import MelodyLength from "../components/melodyLength";
import translateMelody from "../components/translateMelody";
import connectMidi from "../components/connectMidi";
import loadInstrument from "../components/loadInstrument";
import Instrument from "../components/instrument";
import generateMelodyy from "../components/generateMelody";
import { Piano } from "../icons/piano";
import { Sampler } from "tone";

export default function Home() {
  const [notes, setNotes] = useState("");
  const [midiNotes, setMidiNotes] = useState([]);
  const [selectedScale, setSelectedScale] = useState(4);
  const [melodyLength, setMelodyLength] = useState(8);
  const [bpm, setBpm] = useState(280);
  const [octave, setOctave] = useState(4);
  const [instrument, setInstrument] = useState("Sampler");
  const [isChecked, setIsChecked] = useState(false);
  const [prevMelody, setPrevMelody] = useState([]);

  useEffect(() => {
    connectMidi(instrument);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let root = 52;
  let scale = [
    [0, 2, 4, 5, 7, 9, 11, 12], // 'Major'
    [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24], // 'Major Pentatonic
    [0, 2, 3, 5, 7, 8, 10, 12], // 'Minor'
    [0, 3, 5, 7, 10, 12, 15, 17, 19, 22, 24], // 'Minor Pentatonic'
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
  //                Player                   //
  //#########################################//

  const playNotes = async (notes) => {
    const synth = loadInstrument(instrument);
    let index = 0;
    const translatedMidiNotes = translateMelody(midiNotes);
    translatedMidiNotes?.forEach((note, index) => {
      if (!note.includes(octave)) {
        midiNotes[index] = note + octave;
      }
    });

    console.log("melody4", midiNotes);
    setMidiNotes(midiNotes);

    const playNote = async () => {
      
      //     new Tone.Loop(time => {
      //         synth.triggerAttackRelease(notes[index], "8n", time);
      //     }, "4n").start("8n");
      await Tone.ToneAudioBuffer.loaded().then(() => {

        synth.then((instrument) => {
          instrument.triggerAttackRelease(notes[index], "6n");
          // synth.triggerAttackRelease(notes[index], Math.floor(Math.random() * 8) + 1 + "n");
        });
      });
      index++;
      if (index < notes.length) {
        setTimeout(playNote, mirrorValue(bpm));
      }
    };
    await playNote();
  };

  function mirrorValue(value) {
    var range = 480 - 160;
    var mirroredValue = range - (value - 160);
    return mirroredValue;
  }

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
      note = root + scale[selectedScale][randomNumber];
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
    if (prevMelody !== null && melody !== prevMelody) {
        setPrevMelody(melody);
         console.log("prevMelody",translateMelody(prevMelody));
      }

      
        setMidiNotes(melody);
    setNotes(translateMelody(melody).join(" "));
  }

  //#########################################//
  //             HANDLE CHANGES              //
  //#########################################//

  function handleBpmChange(event) {
    setBpm(event.target.value);
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.bpm.rampTo(bpm, 0.001);
  }

  const handleOctaveChange = (selectedOctave) => {
    setOctave(selectedOctave);
    // set melody to new cotave value
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

  const handleMidiCheckbox = (event) => {
    setIsChecked(event.target.checked);
    location.reload();
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
      <br/>
        <Scale onChange={handleScaleChange} />
        <Octave onChange={handleOctaveChange} />
      <button class="round-button" onClick={generateMelody}>
        <Shuffle />
      </button>
      <br />
      <MelodyLength onChange={handleMelodyLengthChange} />
      <p class="melody">{notes}</p>
      <Instrument onChange={handleInstrumentChange} />
      <br />
      <button
        className="playButton"
        hidden={midiNotes.length === 0}
        onClick={() => playNotes(midiNotes)}
      >
        <Play />
      </button>
      <br/>
      <button
        className="playButton"
        onClick={() => setNotes(translateMelody(prevMelody))}
      >
        rewind
      </button>
      <div>
        <input
          type="range"
          class="slider"
          min="160"
          max="360"
          value={bpm}
          onChange={handleBpmChange}
        />
        <p>BPM: {bpm * 0.5}</p>
        <Keyboard notes={midiNotes} />
      </div>
    </div>
  );
}
