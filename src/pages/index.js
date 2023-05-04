import { useState } from 'react'
import { Shuffle } from '../icons/shuffle'
import Link from 'next/link';
 import * as Tone from 'tone';

export default function Home() {
  // let synth = new Tone.PolySynth().toMaster();
  const [notes, setNotes] = useState('');
  const [midiNotes, setMidiNotes] = useState([]);
  const [selectedScale, setSelectedScale] = useState(0);
  const [numNotes, setNumNotes] = useState(4);
  const [bpm, setBpm] = useState(150);

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
      notes.push('B2');
      break;
    case 64:
      notes.push('E2');
    break;
    case 65:
      notes.push('F2');
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

const playNotes = (notes) => {
  const synth = new Tone.Synth().toDestination();
  let index = 0;

  console.log('midiNotes', midiNotes);

 midiNotes.forEach((item, index) => {
    midiNotes[index] = item + "4";
  });
  console.log('melody4', midiNotes);
  setMidiNotes(midiNotes);

  const playNote = () => {
    synth.triggerAttackRelease(notes[index], "0.5");
    index++;

    if (index < notes.length) {
      setTimeout(playNote, 500);
    }
  };

  playNote();
};

// async function playMelody() {
//   const synth = new Tone.Synth().toDestination();
//   // console.log(midiMelody)

//   // const melody = [
//   //   { note: 'C4', duration: '4n' },
//   //   { note: 'E4', duration: '4n' },
//   //   { note: 'G4', duration: '4n' },
//   //   { note: 'B4', duration: '4n' },
//   //   { note: 'A4', duration: '4n' },
//   //   { note: 'G4', duration: '4n' },
//   //   { note: 'E4', duration: '4n' },
//   //   { note: 'C4', duration: '4n' },
//   // ];

//   // melody.forEach((note) => {
//   //   synth.triggerAttackRelease(note.note, note.duration);
//   // });

//   const AMinorScale = ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4'];
//   // const addOctaveNumbers = (scale, octaveNumber) => scale.map(note => {
//   //   const firstOctaveNoteIndex = scale.indexOf('C') !== -1 ? scale.indexOf('C') : scale.indexOf('C#')
//   //   const noteOctaveNumber = scale.indexOf(note) < firstOctaveNoteIndex ? octaveNumber - 1 : octaveNumber;
//   //   return `${note}${noteOctaveNumber}`
//   // });
//   // const AMinorScaleWithOctave = addOctaveNumbers(AMinorScale, 4);
//   console.log('notes', midiNotes);
//   console.log('AMinorScale', AMinorScale);
//   const now = Tone.now()
//   let newTime = now
//   // const AMinorScaleWithOctave = addOctaveNumbers(midiNotes, 0);
  
//   AMinorScale.forEach((note) => {
//     synth.triggerAttackRelease(note, '4n', now + 0.5)
//     newTime += 0.5;
//   });
  

//   // +++++++++++++++++++++++++++++++++++++++++++++++++++++++

//   if (Tone.Transport.state == "started") {
//     Tone.Transport.stop();
//     // playButton.html('play');
//   } else {
//     Tone.start();
//     Tone.Transport.scheduleRepeat(setMelody, '4n');
//     Tone.Transport.start();
//     // playButton.html('stop');
//   }
// }

function chooseScale(event) {
  // selectScale = scaleNames.indexOf(selectedScale.value());
  setSelectedScale(event.target.value);
  //  generateMelody();
}

function handleBpmChange(event) {
  setBpm(event.target.value);
}


function setMelody() {
   beat = Tone.Transport.position.split(":")[1];
  const synth = new Tone.Synth().toDestination();
   let midiNote = Tone.Frequency(notes, 'midi');
   const now = Tone.now()
  synth.triggerAttackRelease(midiNote, '8n', now + 0.5);
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
      // randomNumber = int(random(scale[selectedScale].length));
      randomNumber = Math.floor(Math.random() * scale[selectedScale]?.length)
      // Add the selected note from the scale to the melody array
   
      note = root + scale[selectedScale][randomNumber];
      melody.push(note);
    }
    setMidiNotes(melody);
     translateNotes(melody)
    // Log the generated melody to the console
    console.log(melody);
  }

  const handleScaleChange = (event) => {
    setNumNotes(event.target.value);
  };

  return (
    <div class="melody">
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
        <select  id="number-dropdown" value={numNotes} onChange={handleScaleChange}>
         <option value="4">4</option>
         <option value="6">6</option>
         <option value="8">8</option>
         <option value="10">10</option>
         <option value="12">12</option>
        </select>
        </div>
      </div>
    </div>
      <button class="round-button" onClick={generateMelody}><Shuffle/></button>
      <p class="melody">{notes}</p>
      
      {/* <button onClick={() => playMelody()}></button> */}
      <button onClick={() => playNotes(midiNotes)}></button>
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
        min="60" 
        max="240" 
        value={bpm} 
        onChange={handleBpmChange} 
      />
      <p>BPM: {bpm}</p>
    </div>
    </div>
  )
}