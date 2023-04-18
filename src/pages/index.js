import { useState } from 'react'
import { Shuffle } from '../icons/shuffle'
import Link from 'next/link';
 import * as Tone from 'tone';

export default function Home() {
  // let synth = new Tone.PolySynth().toMaster();
  const [notes, setNotes] = useState('');
  const [midiNotes, setMidiNotes] = useState([]);
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

let selectedScale = 0;

  let numNotes = 4;
  let melody = [];

  let beat;

  let randomNumber;
  let note;

  let noteSlider;
  let noteText;

  let bpmSlider;
  let bpmText;
  let bpm = 150;

  let pt = [];

  // const generateMelody = async () => {
  //   // Define a scale to use for the melody
  //   const scale = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']

  //   // Generate a random melody of 8 notes
  //   const melody = []
  //   for (let i = 0; i < 8; i++) {
  //     const note = scale[Math.floor(Math.random() * scale.length)]
  //     melody.push(note)
  //   }

  //   // Create a new synth and connect it to the default audio destination
  //   const synth = new Tone.Synth().toDestination()
  //   const now = Tone.now()

  //   // Create a new part with the melody and the synth
  //   const part = new Tone.Sequence((time, note) => {
  //     synth.triggerAttacke(note, '8n', time)
  //   }, melody).start()

  //   // Start the audio context
  //   part.start()

  //   // Set the generated melody in state
  //   setNotes(melody)
  // }


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
const melodyString = musicNotes.join(' ');
setNotes(melodyString)
}

async function playMelody() {
  if (Tone.Transport.state == "started") {
    Tone.Transport.stop();
    // playButton.html('play');
  } else {
    Tone.start();
    Tone.Transport.scheduleRepeat(setMelody, '4n');
    await Tone.Transport.start();
    // playButton.html('stop');
  }
}



function setMelody() {
   beat = Tone.Transport.position.split(":")[1];
  const synth = new Tone.Synth().toDestination();
   let midiNote = Tone.Frequency(notes, 'midi');
  synth.triggerAttackRelease(midiNote, '8n');
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
      randomNumber = Math.floor(Math.random() * scale[selectedScale].length)
      // Add the selected note from the scale to the melody array
   
      note = root + scale[selectedScale][randomNumber];
      melody.push(note);
    }
    setMidiNotes(melody);
     translateNotes(melody)
    // Log the generated melody to the console
    console.log(melody);
  }

  return (
    <div class="melody">
      <button class="round-button" onClick={generateMelody}><Shuffle/></button>
      <p class="melody">{notes}</p>
      
      <button onClick={() => playMelody()}></button>
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
    </div>
  )
}