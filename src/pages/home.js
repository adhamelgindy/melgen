import React, { useEffect } from "react";
import { useState } from "react";
import { Shuffle } from "../icons/shuffle";
import { Play } from "../icons/play";
import { Reverse } from "../icons/reverse";
import { Edit } from "../icons/edit";
import { Drum } from "../icons/drums";
import * as Tone from "tone";
import Keyboard from "../components/keyboard";
import Scale from "../components/scale";
import RootNote from "../components/rootNote";
import Octave from "../components/octave";
import Cycles from "../components/cycles";
import Drums from "../components/drums";
import MelodyLength from "../components/melodyLength";
import translateMelody from "../components/translateMelody";
import translateMelodyMidi from "../components/translateMelodyMidi";
import MidiUtils from "../components/midiUtils";
import loadInstrument from "../components/loadInstrument";
import Instrument from "../components/instrument";
import Genre from "../components/genre";
import mirrorValue from "@/methods/mirrorValue";

export default function Home() {
  const [notes, setNotes] = useState(""); // pitch notes
  const [midiNotes, setMidiNotes] = useState([]);
  const [keyboardNotes, setKeyboardNotes] = useState([]);
  const [selectedScale, setSelectedScale] = useState(5);
  const [selectedGenre, setSelectedGenre] = useState('classic');
  const [melodyLength, setMelodyLength] = useState(8);
  const [rootNote, setRootNote] = useState(48);
  const [bpm, setBpm] = useState(220);
  const [cycles, setcycles] = useState(3);
  const [drums, setDrums] = useState("kick");
  const [octave, setOctave] = useState(4);
  const [instrument, setInstrument] = useState("Sampler");
  const [prevMelody, setPrevMelody] = useState([]);
  const [showDropdowns, setShowDropdowns] = useState(false);
  const [melodyCollection, setMelodyCollection] = useState([]);
  const [prevMelodyCollection, setPrevMelodyCollection] = useState([]);
  const [isButtonActivated, setIsButtonActivated] = useState(true);
  let melodysCollection = {
    melodies: [],
  };
  //#########################################//
  //     ????????????????????????????
  // more pausing between notes
  //======?????????????????????              //
  //#########################################//

  useEffect(() => {}, []);

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
      melodysCollection.melodies.beofrePrevMelody = melodyCollection;
      setMelodyCollection(melodysCollection.melodies.prevMelody);
      setPrevMelodyCollection(melodysCollection.melodies.beofrePrevMelody);
    }

    // console.log("melodysCollection", melodysCollection);
    const melodyCopy = [...melody]; // Create a copy of the melody array
    melodysCollection.melodies.push(melodyCopy);
    setMidiNotes(melody);
    const keyNotes = melody;
    setKeyboardNotes(keyNotes);
    setNotes(translateMelody(melody)?.join(" "));
    console.log("melody", melody);
    console.log('notess', notes);
  }

  //#########################################//
  //                Player                   //
  //#########################################//

  const playDrums = () => {
    if (isButtonActivated) {
      // play another snare 0.5 sec after the release of the first one
      const snare = new Tone.Player(`/sampler/drums/${drums}.mp3`).toDestination();

      // Play the snare immediately
      Tone.ToneAudioBuffer.loaded().then(() => {
        snare.start();
      });

      // Stop the snare after a specified duration
      const duration = "1m"; // Adjust the duration based on your desired length
      Tone.Transport.scheduleOnce(() => {
        snare.stop();
      }, duration);
    }
  };

  const playSnare = () => {
    if (isButtonActivated) {
      // play another snare 0.5 sec after the release of the first one
      const snare = new Tone.Player(`/sampler/drums/snare808.mp3`).toDestination();

      // Play the snare immediately
      Tone.ToneAudioBuffer.loaded().then(() => {
        snare.start();
      });

      // Stop the snare after a specified duration
      const duration = "1m"; // Adjust the duration based on your desired length
      Tone.Transport.scheduleOnce(() => {
        snare.stop();
      }, duration);
    }
  };

  const playNotes = async (notes) => {
    const synth = await loadInstrument(instrument);
    let index = 0;
    const translatedMidiNotes = translateMelody(midiNotes, selectedGenre);
    translatedMidiNotes?.forEach((note, index) => {
      if (!note.includes(octave)) {
        midiNotes[index] = note + octave;
      }
    });
    setMidiNotes(midiNotes);

    const playNote = async () => {
      const durationValues = ["4", "3", "5", "2", "6"];
      let duration = "4n";
      
      if (durationValues.includes(notes[index + 1])) {
        duration = "2n";
      }
      await Tone.ToneAudioBuffer.loaded().then(() => {
        synth.triggerAttackRelease(notes[index], duration);
      });
      index++;
      if (index >= notes.length) {
        index = 0; // Reset index to replay from the beginning
      }
    };

    Tone.Transport.start();
    console.log('genre ', selectedGenre);
    for (let i = 0; i < cycles; i++) {
      if (selectedGenre === 'hiphop') {
        playDrums();
          playSnare();
      }
      for (let j = 0; j < notes.length; j++) {
        if (selectedGenre === "electronic") {
          playDrums();
          playSnare();
        }
        playNote();
        await new Promise((resolve) => setTimeout(resolve, mirrorValue(bpm)));
      }
    }

    Tone.Transport.stop();
    index = 0; // Reset index after playing melody
  };

  

  const reverseMelody = () => {
    if (prevMelody === midiNotes) {
      setMidiNotes(melodyCollection);
      if (melodyCollection.length > midiNotes.length) {
        const midiNote = translateMelodyMidi(melodyCollection);
        setNotes(translateMelody(midiNote)?.join(" "));
      } else {
        setNotes(translateMelody(melodyCollection)?.join(" "));
      }
    }
  };

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
  };

  const handleMelodyLengthChange = (selectedLength) => {
    setMelodyLength(selectedLength);
  };

  const handleInstrumentChange = (selectedInstrument) => {
    setInstrument(selectedInstrument);
  };

  const handleDrumsChange = (selectedDrum) => {
    setDrums(selectedDrum);
  };

  const handleScaleChange = (selectedScale) => {
    setSelectedScale(selectedScale);
  };

  const handleGenreChange = (selectedGenre) => {
    setSelectedGenre(selectedGenre);
  };

  const handleRootNoteChange = (selectedRootNote) => {
    setRootNote(selectedRootNote);
  };

  const handleCyclesChange = (selectedCycles) => {
    setcycles(selectedCycles);
  };

  const handleActivateDrumsClick = () => {
    if (isButtonActivated === false) {
      setIsButtonActivated(true);
    } else {
      setIsButtonActivated(false);
    }
  };

  const handleToggleDropdowns = () => {
    setShowDropdowns(!showDropdowns);
  };

  return (
    <div className="melody">
      <div>
        <button
          className="menuButton"
          hidden={midiNotes.length === 0}
          disabled={prevMelody !== midiNotes || prevMelody.length === 0}
          onClick={() => reverseMelody()}
        >
          <Reverse />
        </button>
        <button className="menuButton" onClick={handleToggleDropdowns}>
          <Edit />
        </button>
        <div
          style={{
            display: "inline-block",
            position: "relative",
            top: "-14px",
          }}
        >
          <MidiUtils instrument={instrument} />
        </div>
        {showDropdowns && (
          <div className="menuOptions">
            <div>
              Scale <Scale onChange={handleScaleChange} />
            </div>
            <div>
              Root <RootNote onChange={handleRootNoteChange} />
            </div>
            <div>
              Octave <Octave onChange={handleOctaveChange} />
            </div>
            <div>
              Length <MelodyLength onChange={handleMelodyLengthChange} />
            </div>
            <div>
              Instrument <Instrument onChange={handleInstrumentChange} />
            </div>
            <div>
              Genre <Genre onChange={handleGenreChange} />
            </div>
            <div>
              Drums <Drums onChange={handleDrumsChange} />
            </div>
            <div>
              Repeatition <Cycles onChange={handleCyclesChange} />
            </div>
          </div>
        )}
      </div>
      <br />
      <div>
        <Keyboard
          notes={midiNotes}
          instrument={instrument}
          octave={octave}
          bpm={bpm}
          cycles={cycles}
        />
        <p className="melody">{notes}</p>
        <button
          className="round-button"
          // style={{ opacity: isButtonActivated ? "100%" : "50%" , bottom: '4px', position: "relative",}}
          hidden={midiNotes.length === 0}
          onClick={playDrums}
        >
          <Drum />
        </button>
        <button className="round-button-generator" onClick={generateMelody}>
          <Shuffle />
        </button>
        <button
          className="round-button"
          hidden={midiNotes.length === 0}
          onClick={() => playNotes(midiNotes)}
        >
          <Play />
        </button>
        <br />
        <div>
          <input
            type="range"
            className="slider"
            min="180"
            max="380"
            value={bpm}
            onChange={handleBpmChange}
          />
        </div>
      </div>
    </div>
  );
}
