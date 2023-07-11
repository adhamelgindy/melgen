import * as Tone from "tone";
import loadInstrument from "./loadInstrument";

let activeMidiInput = null;
let activeMidiOutput = null;

async function connectMidi(instrument, midiInput, midiOutput) {
  // Disconnect the previous MIDI input and output if they exist
  if (activeMidiInput !== null) {
    activeMidiInput.onmidimessage = null;
  }
  if (activeMidiOutput !== null) {
    // Perform any necessary cleanup or disconnection steps for MIDI output
    // For example: activeMidiOutput.close();
  }

  const synth = await loadInstrument(instrument.instrument);

  midiInput.onmidimessage = (e) => {
    if (e.data[0] === 144 && e.data[2] !== 0) {
      // console.log('e datadatatatatataat', e.data[1]);
      const frequency = Tone.Midi(e.data[1]).toFrequency();
       console.log("frequency", frequency);
  
      synth.triggerAttackRelease(frequency, "4n");
      
      // Generate dynamic MIDI output message
      const noteNumber = e.data[1];
      const velocity = e.data[2];
      const midiOutputMessage = [144, noteNumber, velocity]; // Example: Note On message with the same note and velocity as the input
  
      // Send MIDI output message
      if (activeMidiOutput !== null) {
        // const midiOutput = new Tone.Midi();
        // midiOutput.open(activeMidiOutput);
        // midiOutput.send(midiOutputMessage)
        activeMidiOutput.send(midiOutputMessage);
        console.log('activeMidiOutput.send(midiOutputMessage)', midiOutputMessage);
      }
    } else if (e.data[0] === 128 || (e.data[0] === 144 && e.data[2] === 0)) {
      // Handle other MIDI messages if needed
    }
  };
  

  // Update the active MIDI input and output
  activeMidiInput = midiInput;
  activeMidiOutput = midiOutput;
}

function midiSend(msg, time) {
  midi.outputs.forEach((output) => output.send(msg, time));
}

export default connectMidi;
