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
import translateMelodyMidi from "../components/translateMelodyMidi";
import connectMidi from "../components/connectMidi";
import MidiUtils from "../components/midiUtils";
import loadInstrument from "../components/loadInstrument";
import Instrument from "../components/instrument";
import Genre from "../components/genre";
import { connect, initDevices } from "../components/midiUtils";

export default function Home() {
  const [notes, setNotes] = useState(""); // pitch notes
  const [midiNotes, setMidiNotes] = useState([]);
  const [keyboardNotes, setKeyboardNotes] = useState([]);
  const [selectedScale, setSelectedScale] = useState(5);
  const [selectedGenre, setSelectedGenre] = useState(5);
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
  const [prevMelodyCollection, setPrevMelodyCollection] = useState([]);
  const [midiIn, setMidiIn] = useState("");
  let melodysCollection = {
    melodies: [],
  };
  // const [isButtonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    // set an interval that keeps repeatining
    //  connectMidi(instrument);
    // connectMidi(instrument).then(midi => {
    //   setMidiIn(midi);
    // })
    //  console.log('connectMidi(instrument)', connectMidi(instrument));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // if(prevMelody !== midiNotes && midiNotes.length !== 0){
    //   console.log('55555555555555555555555');
    //   setMidiNotes(melodyCollection);
    //   const keyNotes = melodyCollection;
    //   setKeyboardNotes(melodyCollection);
    //   setNotes(translateMelody(melodyCollection)?.join(" "));
    // } else {
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
    melodysCollection.melodies.beofrePrevMelody = melodyCollection;
    setMelodyCollection(melodysCollection.melodies.prevMelody);
    setPrevMelodyCollection(melodysCollection.melodies.beofrePrevMelody);
    // setPrevMelody(melodysCollection.melodies.prevMelody);
  }
  // console.log("hazaka melody", melody);
   console.log("melodysCollection", melodysCollection);
  const melodyCopy = [...melody]; // Create a copy of the melody array
  melodysCollection.melodies.push(melodyCopy);
  // if(prevMelody !== midiNotes ){
  //   melody = prevMelody
  //   setMidiNotes(prevMelody)
  //   setNotes(translateMelody(prevMelody)?.join(" "))
  //   console.log('5555555555555555555555555555555555555555555', prevMelody);
  //    console.log("prevMelodyCollection", prevMelodyCollection);
  // } else {
    setMidiNotes(melody);
    const keyNotes = melody;
    setKeyboardNotes(keyNotes);
    setNotes(translateMelody(melody)?.join(" "));
  // }
  console.log('midiNotes', midiNotes);
  console.log('prev', prevMelody);
  console.log('prevMelodyCollection', prevMelodyCollection);
    // }
  
  }

  //#########################################//
  //                Player                   //
  //#########################################//

  const playDrums = () => {
    const snare = new Tone.Player(
      "/sampler/snare/snare808.mp3"
    ).toDestination();
    Tone.Transport.start();
    const snarePattern = new Tone.Pattern(
      (time, note) => {
        // Tone.ToneAudioBuffer.loaded().then(() => {
        //   snare?.start(time);
        // });
      },
      Array(4).fill(null),
      "8n"
    );
    snarePattern.start();
    snarePattern.stop();
  };

  const playNotes = async (notes) => {
    const synth = loadInstrument(instrument);
    let index = 0;
    console.log("melody3", midiNotes);
    // setKeyboardNotes(midiNotes);
    const translatedMidiNotes = translateMelody(midiNotes, selectedGenre);
    translatedMidiNotes?.forEach((note, index) => {
      if (!note.includes(octave)) {
        midiNotes[index] = note + octave;
      }
    });

    console.log("melody4", midiNotes);
    setMidiNotes(midiNotes);

    // Snare setup
    const playNote = async () => {
      await Tone.ToneAudioBuffer.loaded().then(() => {
        synth.then((instrument) => {
          Tone.Transport.start();
          // let duration;
          const validValues = ["1", "2", "3", "4", "5", "6"];
          const duration = validValues.includes(notes[index]) ? "1n" : "4n";
          instrument.triggerAttackRelease(notes[index], duration);
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

    for (let i = 0; i < notes.length * cycles; i++) {
      // await playNote();
      // await new Promise((playAgain) =>
      //   setTimeout(playAgain, mirrorValue(bpm))
      // );
      await Promise.all([playNote(), playDrums()]);
      await new Promise((resolve) => setTimeout(resolve, mirrorValue(bpm)));
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

  const handleScaleChange = (selectedScale) => {
    setSelectedScale(selectedScale);
  };

  const handleGenreChange = (selectedGenre) => {
    console.log("555", selectedGenre);
    setSelectedGenre(selectedGenre);
  };

  const handleRootNoteChange = (selectedRootNote) => {
    console.log("selectedRootNote selectedRootNote:", selectedRootNote);
    setRootNote(selectedRootNote);
  };

  const handleCyclesChange = (selectedCycles) => {
    setcycles(selectedCycles);
  };

  // const handleMidiCheckbox = (event) => {
  //   setIsChecked(event.target.checked);
  //   location.reload();
  // };

  const reverseMelody = () => {
    // console.log("prevMelody", translateMelody(prevMelody)?.join(" "));
    console.log("midiNotes", midiNotes);
    console.log("prev", melodyCollection);
    console.log("before prev", prevMelodyCollection);
    
    if (prevMelody === midiNotes) {
      setMidiNotes(melodyCollection);
      if (melodyCollection.length > midiNotes.length) {
        const midiNote = translateMelodyMidi(melodyCollection);
        setNotes(translateMelody(midiNote)?.join(" "));
      } else {
        setNotes(translateMelody(melodyCollection)?.join(" "));
      }
    }

    // console.log("prevMelody", prevMelody);
    // console.log("midiNotes", midiNotes);
    // console.log("melodyCollection", melodyCollection);
    // console.log("melodyCollection", prevMelodyCollection);
    // console.log('melodyZobrrrr',midiNote);
    // else {
    //   console.log('melodyCollection',melodyCollection);
    //   setMidiNotes(prevMelody);
    //   setNotes(translateMelody(prevMelody)?.join(" "))
    // }
  };

  const handleToggleDropdowns = () => {
    setShowDropdowns(!showDropdowns);
  };

  return (
    <div className="melody">
      <div>
        <MidiUtils instrument={instrument} />
        <button
          className="menuButton"
          hidden={midiNotes.length === 0}
          disabled={prevMelody !== midiNotes}
          onClick={() => reverseMelody()}
        >
          <Reverse />
        </button>

        <button className="menuButton" onClick={handleToggleDropdowns}>
          <Edit />
        </button>

        {showDropdowns && (
          <div className="menuOptions">
            <div>
              Scale <Scale onChange={handleScaleChange} />
            </div>
            <div>
              Genre <Genre onChange={handleGenreChange} />
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
        <button className="round-button" onClick={generateMelody}>
          <Shuffle />
        </button>
        <button
          className="round-button"
          hidden={midiNotes.length === 0}
          onClick={() => playNotes(midiNotes)}
          // disabled={isButtonDisabled}
        >
          <Play />
        </button>
        <br />
        <div>
          <input
            type="range"
            className="slider"
            min="220"
            max="380"
            value={bpm}
            onChange={handleBpmChange}
          />
        </div>
      </div>
    </div>
  );
}
