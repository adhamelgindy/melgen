import React, { useEffect } from 'react';
import { useState } from 'react'
import { Shuffle } from '../icons/shuffle'
import Link from 'next/link';
import * as Tone from 'tone';

export default function Home() {
  const [notes, setNotes] = useState('');
  const [midiNotes, setMidiNotes] = useState([]);
  const [selectedScale, setSelectedScale] = useState(0);
  const [numNotes, setNumNotes] = useState(4);
  const [bpm, setBpm] = useState(360);
  const [octave, setOctave] = useState(5);
  const [instrument, setInstrument] = useState("PolySynth");
  
  useEffect(() => {
    let synth = new Tone.PolySynth().toDestination();
    
    // Initialize MIDI connection
    initializeMIDI();

    // Clean up the Tone.js synth when the component is unmounted
    // return () => {
    //   // synth.dispose();
    // };
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

let scaleNames = [
  "Major",
  "Major Pentatonic",
  "Minor",
  "Minor Pentatonic",
  "Melodic Minor",
  "Natural Minor",
  "Dorian",
  "Phrygian",
  "Lydian",
  "Mixolydian",
  "Locrian"
]

// let selectedScale = 0;

  // let numNotes = 4;
  let melody = [];

  let beat;

  let randomNumber;
  let note;

  let noteSlider;
  let noteText;

  let bpmSlider;
  let bpmText;
  // let bpm = 150;

  let pt = [];


  function translateNotes(melody) {
    const notes = [];
let musicNotes = melody.map(number => {
  switch (number) {
    case 51:
      notes.push('D#');
      break;
    case 52:
      notes.push('E');
      break;
    case 53:
      notes.push('F');
      break;
    case 54:
      notes.push('F#');
      break;
    case 55:
      notes.push('G');
      break;
    case 56:
      notes.push('G#');
      break;
    case 57:
      notes.push('A');
      break;
    case 58:
      notes.push('A#');
      break;
    case 59:
      notes.push('B');
      break;
    case 60:
      notes.push('C');
      break;
    case 61:
      notes.push('C#');
      break;
    case 62:
      notes.push('D');
    break;
    case 63:
      notes.push('B');
      break;
    case 64:
      notes.push('E');
    break;
    case 65:
      notes.push('F');
    break;
        
    default:
      break;
  }
  
})
musicNotes = [...notes]
console.log('music Notes',musicNotes);
setMidiNotes(musicNotes)
const melodyString = musicNotes.join(' ');
setNotes(melodyString)
}


const initializeMIDI = async () => {
  try {
    const access = await navigator.requestMIDIAccess();
    const inputs = access.inputs.values();
    const input = inputs.next().value;

    // Add an event listener to receive MIDI messages
    input.onmidimessage = (e) => {
      if (e.data[0] === 144 && e.data[2] !== 0) {
        // Convert MIDI note number to frequency
        const frequency = Tone.Midi(e.data[1]).toFrequency();

        // Trigger a Tone.js synth with the received frequency
        // synth.triggerAttack(frequency);
        synth.triggerAttackRelease(frequency,  "8n");
      } else if (e.data[0] === 128 || (e.data[0] === 144 && e.data[2] === 0)) {
        // Convert MIDI note number to frequency
        // const frequency = Tone.Midi(e.data[1]).toFrequency();

        // Release the Tone.js synth
        // synth.triggerRelease(frequency);
        // synth.triggerAttackRelease(frequency,  "8n");
      }
    };
  } catch (error) {
    console.log('Web MIDI API is not supported in this browser.');
  }
};

const playNotes = (notes) => {
  console.log('instrument', instrument);
  // const synth = new Tone.MonoSynth().toDestination();
   let synth;
  // const synth = new Tone.MembraneSynth().toDestination();
  // const synth = new Tone.Sampler().toDestination();
  //  const synth = new Tone.DuoSynth().toDestination();
  switch(instrument) {
    case 'MonoSynth':
      setInstrument('MonoSynth')
      synth = new Tone.MonoSynth().toDestination();
      break;
    case 'PolySynth':
      setInstrument('PolySynth')
      synth = new Tone.PolySynth().toDestination();
      break;
    case 'MembraneSynth':
      setInstrument('MembraneSynth')
      synth = new Tone.MembraneSynth().toDestination();
      break;
    case 'Sampler':
      setInstrument('Sampler')
      synth = new Tone.Sampler().toDestination();
      break;
    case 'DuoSynth':
      setInstrument('DuoSynth')
      synth = new Tone.DuoSynth().toDestination();
      break;              
  }


    let index = 0;
  
    console.log('midiNotes', midiNotes);
  
    midiNotes.forEach((note, index) => {
     if(!note.includes(octave)){
      midiNotes[index] = note + octave;
     }
     
    });
    console.log('melody4', midiNotes);
    setMidiNotes(midiNotes);
  
    const playNote = () => {
  
      // const IChord = constructMajorChord(AMinorScale, 4, 'A3'); //lets try that

      // const sampler = new Tone.Sampler({
      //   // urls: {
      //   //   A1: "A1.mp3",
      //   //   A2: "A2.mp3",
      //   // },
      //   // baseUrl: "https://tonejs.github.io/audio/casio/",
      //   onload: () => {
      //     sampler.triggerAttackRelease(["C1", "E1", "G1", "B1"], 0.5);
      //   }
      // }).toDestination();
      // synth.triggerAttackRelease(notes[index],  "0.1s");
      console.log('notes[index]', notes[index]);
       synth.triggerAttackRelease(notes[index],  "8n");
      index++;
  
      if (index < notes.length) {
        setTimeout(playNote, 500);
        
      }
    };
    playNote();
};


function chooseScale(event) {
  // selectScale = scaleNames.indexOf(selectedScale.value());
  setSelectedScale(event.target.value);
  //  generateMelody();
}

function handleBpmChange(event) {
  setBpm(event.target.value);
  Tone.Transport.bpm.rampTo(bpm, 0.1);
}


function generateMelody() {
  // Check if the melody array is already at the desired length
  if (melody.length == numNotes) {
    // If it is, remove all elements from the array to reset it
    melody.splice(0, melody.length);
  }
  // Loop through numNotes times to generate a new melody
  for (let i = 0; i < numNotes; i++) {
    // Choose a random integer between 0 and the length of the selected scale array
    randomNumber = Math.floor(Math.random() * scale[selectedScale]?.length)
    // Add the selected note from the scale to the melody array
    note = root + scale[selectedScale][randomNumber];
    melody.push(note);
    // Add repeating patterns if numNotes is bigger than 4
    if (numNotes > 5 && melody.length < numNotes) {
      // Repeat the last 2 or 4 notes with a probability of 30%
      if (i > 1 && Math.random() < 0.3 && melody.length < numNotes) {
        let repeatLength = Math.random() < 0.5 ? 2 : 4;
        let repeatStart = Math.max(0, i - repeatLength);
        let repeatNotes = melody.slice(repeatStart, i + 1);
        melody.splice(i + 1, 0, ...repeatNotes);
        i += repeatNotes.length;
      }
      // Repeat a 3-note pattern with a probability of 20%
      if (i > 2 && Math.random() < 0.2 && melody.length < numNotes) {
        let patternStart = Math.max(0, i - 2);
        let patternNotes = melody.slice(patternStart, i + 1);
        melody.splice(i + 1, 0, ...patternNotes);
        i += patternNotes.length;
      }
    }
  }
  // Truncate the melody array if it has more than numNotes elements
  if (melody.length > numNotes) {
    melody.splice(numNotes, melody.length - numNotes);
  }
  setMidiNotes(melody);
  translateNotes(melody);
  // Log the generated melody to the console
  console.log(melody);
}

  const handleScaleChange = (event) => {
    setNumNotes(event.target.value);
  };

  const handleOctaveChange = (event) => {
    setOctave(event.target.value);
  };

  const handleInstrumentChange = (event) => {
    setInstrument(event.target.value)   
    }

  return (
    <div class="melody">
    <label for="midi-checkbox">MIDI:</label>
    <input class="slider" type="checkbox" id="midi-checkbox"/>
     <div >
      <div class="parameters">
        <div class="dropdown">
        <select  id="number-dropdown" value={numNotes} onChange={handleScaleChange}>
         <option value="4">4</option>
         <option value="6">6</option>
         <option value="8">8</option>
         <option value="10">10</option>
         <option value="12">12</option>
        </select>
        </div>
      </div>
      <br/>
      <div class="parameters">
        <div class="dropdown">
        <select  id="number-dropdown" value={selectedScale} onChange={chooseScale}>
         <option value="0">Happy</option>
         <option value="1">Country</option>
         <option value="2">Sad</option>
         <option value="3">Rock</option>
         <option value="4">Jazz</option>
         <option value="5">Natural</option>
         <option value="6">Funky</option>
         <option value="7">Spanish</option>
         <option value="8">Dreamy</option>
         <option value="9">Blues</option>
         <option value="10">Dark</option>
        </select>
        </div>
      </div>
      <div class="parameters">
        <div class="dropdown">
        <select  id="number-dropdown" value={octave} onChange={handleOctaveChange}>
         <option value="2">low +</option>
         <option value="3">low</option>
         <option value="4">medium</option>
         <option value="5">high</option>
         <option value="6">high +</option>
        </select>
        </div>
      </div>
    </div>
      <button class="round-button" onClick={generateMelody}><Shuffle/></button>
      <p class="melody">{notes}</p>
      <div class="parameters">
        <div class="dropdown">
        <select  id="number-dropdown" value={instrument} onChange={handleInstrumentChange}>
         <option value="MonoSynth">MonoSynth</option>
         <option value="PolySynth">PolySynth</option>
         <option value="MembraneSynth">MembraneSynth</option>
         <option value="Sampler">Sampler</option>
         <option value="DuoSynth">DuoSynth</option>
        </select>
        </div>
      </div>
      <br/>
      {/* <button onClick={() => playMelody()}></button> */}
      <button class="play-button" onClick={() => playNotes(midiNotes)}></button>
      <br/>
      {/* playNotes(["B" ,"C" ,"D", "E", "F" ,"G" ,"A"])} */}
      <div class="piano">
    <div data-note="C" class="key white"></div>
    <div data-note="D#" class="key black"></div>
    <div data-note="D" class="key white"></div>
    <div data-note="E#" class="key black"></div>
    <div data-note="E" class="key white"></div>
    <div data-note="F" class="key white"></div>
    <div data-note="G#" class="key black"></div>
    <div data-note="G" class="key white"></div>
    <div data-note="A#" class="key black"></div>
    <div data-note="A" class="key white"></div>
    <div data-note="B#" class="key black"></div>
    <div data-note="B" class="key white"></div>
  </div>
  <div>
      <input 
        type="range" 
        class="slider"
        min="160" 
        max="480" 
        value={bpm} 
        onChange={handleBpmChange} 
      />
      <p>BPM: {bpm*0.5}</p>
    </div>
    </div>
  )
}