import * as Tone from "tone";
import loadInstrument from "./loadInstrument";

async function connectMidi(instrument) {
  let synth = loadInstrument(instrument);
  try {
    const access = await navigator.requestMIDIAccess();
    const inputs = access.inputs.values();
    const input = inputs.next().value;
    console.log('input', input.name);

    // Add an event listener to receive MIDI messages
    input.onmidimessage = (e) => {
      if (e.data[0] === 144 && e.data[2] !== 0) {
        // Convert MIDI note number to frequency
        const frequency = Tone.Midi(e.data[1]).toFrequency();
        console.log("frequencyy", frequency);

        synth.then((instrument) => {
          instrument.triggerAttackRelease(frequency, "4n");
        });
      } else if (e.data[0] === 128 || (e.data[0] === 144 && e.data[2] === 0)) {
      }
    };

    // return {name: input.name, value: e}; // Return the input name
  } catch (error) {
    console.log("Web MIDI API is not supported in this browser.");
    return null; // Return null if there's an error
  }
  // return inputs
}

export default connectMidi;
