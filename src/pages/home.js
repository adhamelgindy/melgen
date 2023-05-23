import React, {
    useEffect
} from 'react';
import {
    useState
} from 'react';
import {
    Shuffle
} from '../icons/shuffle';
import {
    Play
} from '../icons/play';
import {
    Piano
} from '../icons/piano';
import * as Tone from 'tone';
import Keyboard from '../components/keyboard'
import {
    Sampler
} from "tone";

export default function Home() {
    const [notes, setNotes] = useState('');
    const [midiNotes, setMidiNotes] = useState([]);
    const [selectedScale, setSelectedScale] = useState(4);
    const [numNotes, setNumNotes] = useState(8);
    const [bpm, setBpm] = useState(200);
    const [octave, setOctave] = useState(4);
    const [instrument, setInstrument] = useState("Guitar");
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        initializeMIDI();
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

    function translateNotes(melody) {
        console.log('originalMelody', melody);
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
        console.log('music Notes', musicNotes);
        setMidiNotes(musicNotes)
        const melodyString = musicNotes.join(' ');
        setNotes(melodyString)
    }


    const initializeMIDI = async () => {
        // if(isChecked){
            let synth = new Tone.PolySynth().toDestination();
            try {
                const access = await navigator.requestMIDIAccess();
                const inputs = access.inputs.values();
                const input = inputs.next().value;
    
                // Add an event listener to receive MIDI messages
                input.onmidimessage = (e) => {
                    if (e.data[0] === 144 && e.data[2] !== 0) {
                        // Convert MIDI note number to frequency
                        const frequency = Tone.Midi(e.data[1]).toFrequency();
                        console.log('frequencyy', frequency);
    
                        synth.triggerAttackRelease(frequency, "8n");
                    } else if (e.data[0] === 128 || (e.data[0] === 144 && e.data[2] === 0)) {
                      
                    }
                };
            } catch (error) {
                console.log('Web MIDI API is not supported in this browser.');
            }
        // }
    };

    const playNotes = async (notes) => {
        console.log('instrument', instrument);
        let synth;
        switch (instrument) {
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
                synth = new Sampler({

                    urls: {
                        "C4": "C4.mp3",
                        "C8": "C8.mp3",
                        "A4": "A4.mp3",
                    },
                    baseUrl: "/sampler/piano/",

                    onload: () => {
                        console.log('loaded');
                        // synth.isLoaded
                    },

                }).toDestination();
                break;
            case 'DuoSynth':
                setInstrument('DuoSynth')
                synth = new Tone.DuoSynth().toDestination();
                break;
            case 'Guitar':
                setInstrument('Guitar')
                synth = new Sampler({

                    urls: {
                        "A3": "A3.mp3",
                        "B2": "B2.mp3",
                        "C3": "C3.mp3",
                    },

                    baseUrl: "/sampler/guitar/",

                    onload: () => {
                        console.log('loaded');
                    },

                }).toDestination();
                break;
            case 'Saxophone':
                setInstrument('Saxophone')
                synth = new Sampler({

                    urls: {
                        "A4": "A4.mp3",
                        "E4": "E4.mp3",
                        "G5": "G5.mp3",
                    },

                    baseUrl: "/sampler/saxophone/",

                    onload: () => {
                        console.log('loaded');
                    },

                }).toDestination();
                break;
            case 'Flute':
                setInstrument('Flute')
                synth = new Sampler({

                    urls: {
                        "A6": "A6.mp3",
                        "C5": "C5.mp3",
                        "C7": "C7.mp3",
                    },

                    baseUrl: "/sampler/flute/",

                    onload: () => {
                        console.log('loaded');
                    },

                }).toDestination();
                break;
            case 'Xylophone':
                setInstrument('Xylophone')
                synth = new Sampler({

                    urls: {
                        "G7": "G7.mp3",
                        "C8": "C8.mp3",
                        "C7": "C7.mp3",
                    },

                    baseUrl: "/sampler/xylophone/",

                    onload: () => {
                        console.log('loaded');
                    },

                }).toDestination();
                break;
            case 'Electric':
                setInstrument('Electric')
                synth = new Sampler({

                    urls: {
                        "A5": "A5.mp3",
                        "C6": "C6.mp3",
                        "E2": "E2.mp3",
                    },

                    baseUrl: "/sampler/electirc/",

                    onload: () => {
                        console.log('loaded');
                    },

                }).toDestination();
                break;
        }

        let index = 0;

        console.log('midiNotes', midiNotes);

        midiNotes.forEach((note, index) => {
            if (!note.includes(octave)) {
                midiNotes[index] = note + octave;
            }

        });
        console.log('melody4', midiNotes);
        setMidiNotes(midiNotes);

        const playNote = async () => {
            console.log('notes[index]', notes[index]);
            let loop = false;
            if (loop) {
                new Tone.Loop(time => {
                    synth.triggerAttackRelease(notes[index], "8n", time);
                }, "4n").start("8n");
                // the loops start when the Transport is started
                // Tone.Transport.start() ???????????????????????????????????????????
                // Tone.Transport.stop()  ???????????????????????????????????????????
            } else {
                if (instrument === "Sampler" || instrument === "Guitar" || instrument === "Saxophone" || instrument === "Flute" || instrument === "Xylophone" || instrument === "Electric") {

                    await Tone.ToneAudioBuffer.loaded().then(() => {                      
                            synth.triggerAttackRelease(notes[index], "4n");                    
                            // synth.triggerAttackRelease(notes[index], Math.floor(Math.random() * 8) + 1 + "n");                    
                    });

                } else {
                    synth.triggerAttackRelease(notes[index], "4n");
                }

            }

            index++;

            if (index < notes.length) {
                console.log('bpm', bpm);
                console.log('indexxx', index);
                setTimeout(playNote, mirrorValue(bpm) );
            }
        };
          await playNote();
    };

    function mirrorValue(value) { 
        var range = 480 - 160;
        var mirroredValue = range - (value - 160);
    console.log('value', value);
    console.log('Mirroredvalue', mirroredValue);
        
        return mirroredValue;
      }


    function chooseScale(event) {
        setSelectedScale(event.target.value);
        // generateMelody();
    }

    function handleBpmChange(event) {
        setBpm(event.target.value);
        Tone.Transport.bpm.value = bpm
        Tone.Transport.bpm.rampTo(bpm, 0.00000000001);
    }


    function generateMelody() {
        // Check if the melody array is already at the desired length
        if (melody.length === numNotes) {
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
        console.log('event.target.value', event.target.value);
        setNumNotes(event.target.value);
        console.log('numNotes', numNotes);
         generateMelody();
    };

    const handleOctaveChange = (event) => {
        setOctave(event.target.value);
    };

    const handleInstrumentChange = (event) => {
        setInstrument(event.target.value)
    }

    const handleMidiCheckbox = (event) => {
        setIsChecked(event.target.checked);
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
     <div >
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
      <br/>
      <div class="parameters">
        <div class="dropdown">
        <select  id="number-dropdown" value={numNotes} onChange={handleScaleChange}>
         <option value="4">4</option>
         <option value="6">6</option>
         <option value="8">8</option>
         <option value="12">12</option>
         <option value="16">16</option>
        </select>
        </div>
      </div>
      <p class="melody">{notes}</p>
      <div class="parameters">
        <div class="dropdown">
        <div className="piano-dropdown" >
      </div>
        <select  id="number-dropdown" value={instrument} onChange={handleInstrumentChange}>



        <option value="Electric">Electric</option>
         <option value="Flute">Flute</option>
         <option value="Guitar">Guitar</option>
         <option value="Sampler">Piano</option>
         <option value="Saxophone">Saxophone</option>
         <option value="Xylophone">Xylophone</option>
         <option value="MonoSynth">MonoSynth</option>
         <option value="PolySynth">PolySynth</option>
         <option value="DuoSynth">DuoSynth</option>
         <option value="MembraneSynth">MembraneSynth</option>
        </select>
        </div>
      </div>
      <br/>
      {/* <button onClick={() => playMelody()}></button> */}
      <button className="playButton" hidden={midiNotes.length === 0} onClick={() => playNotes(midiNotes)}><Play/></button>
      {/* playNotes(["B" ,"C" ,"D", "E", "F" ,"G" ,"A"])} */}
   
  <div>
      <input
        type="range"
        class="slider"
        min="160"
        max="360"
        value={bpm}
        onChange={handleBpmChange}
      />
      <p>BPM: {bpm*0.5}</p>
    <Keyboard notes={midiNotes}/>
    </div>
    </div>
  )
}