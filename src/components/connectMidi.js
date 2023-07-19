import * as Tone from "tone";
import loadInstrument from "./loadInstrument";

let activeMidiInput = null;
let activeMidiOutput = null;

async function connectMidi(instrument, midiInput, midiOutput) {
  // Disconnect the previous MIDI input and output if they exist
  if (activeMidiInput !== null) {
    activeMidiInput.onmidimessage = null;
  }

  const synth = await loadInstrument(instrument.instrument);

  midiInput.onmidimessage = (e) => {
    if (e.data[0] === 144 && e.data[2] !== 0) {
      const frequency = Tone.Midi(e.data[1]).toFrequency();
      // console.log("frequency", frequency, "css");
      console.log("%c frequency", frequency, 'color: blue;font-size: 16px;font-weight: bold');

      synth.triggerAttackRelease(frequency, "4n");

      // Generate dynamic MIDI output message
      const noteNumber = e.data[1];
      const velocity = e.data[2];
      const midiOutputMessage = [144, noteNumber, velocity]; 

      // Send MIDI output message
      if (activeMidiOutput !== null) {
        activeMidiOutput.send(midiOutputMessage);
        midiOutput.send(midiOutputMessage);
      }
    }
  };

  // Update the active MIDI input and output
  activeMidiInput = midiInput;
  activeMidiOutput = midiOutput;
}

export default connectMidi;
