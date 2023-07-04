import * as Tone from "tone";
import loadInstrument from "./loadInstrument";

let activeMidiInput = null;

async function connectMidi(instrument, midiInput) {
  // Disconnect the previous MIDI input if exists
  if (activeMidiInput !== null) {
    activeMidiInput.onmidimessage = null;
  }

  const synth = await loadInstrument(instrument.instrument);
  console.log('midiInput', midiInput);

  midiInput.onmidimessage = (e) => {
    if (e.data[0] === 144 && e.data[2] !== 0) {
      // Convert MIDI note number to frequency
      const frequency = Tone.Midi(e.data[1]).toFrequency();
      console.log("frequency", frequency);

      // Trigger the synth with the selected input
      synth.triggerAttackRelease(frequency, "4n");
    } else if (e.data[0] === 128 || (e.data[0] === 144 && e.data[2] === 0)) {
      // Handle other MIDI messages if needed
    }
  };

  // Update the active MIDI input
  activeMidiInput = midiInput;
}

export default connectMidi;
