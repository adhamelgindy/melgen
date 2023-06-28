import { useEffect, useState } from 'react';
import connectMidi from "./connectMidi";

const Dropdown = ({ options, onChange }) => {
  return (
    <div className="parameters">
      <div className="dropdown">
        <select onChange={onChange}>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

const Button = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

const MidiUtils = (instrument) => {
  const [midiIn, setMidiIn] = useState([]);
  const [midiOut, setMidiOut] = useState([]);
  const [showDropdowns, setShowDropdowns] = useState(false);
  const [notesOn, setNotesOn] = useState(new Map());

  useEffect(() => {
    // Initialize MIDI devices
    navigator.requestMIDIAccess().then(midiReady);
    
    // Cleanup function
    return () => {
      if (midi) {
        midi.removeEventListener('statechange', midiStateChangeHandler);
      }
    };
  }, []);

  let midi;

  function midiReady(midiAccess) {
    midi = midiAccess;
    midi.addEventListener('statechange', midiStateChangeHandler);
    initDevices(midi);
    let midiInput = Array.from(midi.inputs.values());
     connectMidi(instrument, midiIn);
    // Call connectMidi with the desired instrument
  }

  function midiStateChangeHandler(event) {
    initDevices(event.target);
  }

  function initDevices(midi) {
    const inputs = Array.from(midi.inputs.values());
    console.log('inputs', inputs);
    const outputs = Array.from(midi.outputs.values());
    // const inputDeviceNames = inputs.map((device) => device.name);
    setMidiIn(inputs.map((device) => device.name));
    setMidiOut(outputs.map((device) => device.name));
  }

  const handleInputSelectChange = (e) => {
    const selectedDevice = e.target.value; // Get the selected device name from the event
  
    if (!midi) {
      console.error('MIDI access is not available');
      return;
    }
  
    // Check if midi.inputs is defined before iterating over it
    const selectedInput = Array.from(midi.inputs.values()).find(
      (device) => device.name === selectedDevice
    );
  
    if (selectedInput) {
      // Handle the selected input device
      // For example, you can pass it to the connectMidi function
      connectMidi(instrument, selectedInput);
  
      // Update the midiIn state with the selected device
      setMidiIn(selectedDevice);
    } else {
      console.error('Selected MIDI input device not found');
      // Handle the case when the selected device is not found
    }
  };
  
  

  const handleOutputSelectChange = (e) => {
    const selectedDevice = e.target.value; // Get the selected device name from the event
  
    // Find the MIDI output device object based on the selected name
    const selectedOutput = Array.from(midi.outputs.values()).find(
      (device) => device.name === selectedDevice
    );
  
    if (selectedOutput) {
      // Handle the selected output device
      // For example, you can send MIDI messages to this device
      // using the Tone.js or Web MIDI API
  
      // Update the midiOut state with the selected device
      setMidiOut(selectedDevice);
    } else {
      console.error('Selected MIDI output device not found');
      // Handle the case when the selected device is not found
    }
  };
  

  const handleToggleDropdowns = () => {
    setShowDropdowns(!showDropdowns);
  };

  return (
    <div style={{ color: '#009458' }}>
  <button className="menuButton" onClick={handleToggleDropdowns} style={{ color: '#009458' }}>
    Midi
  </button>
  {showDropdowns && (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <label>Input: </label>
      <Dropdown options={midiIn} onChange={handleInputSelectChange} />
      <label>Output: </label>
      <Dropdown options={midiOut} onChange={handleOutputSelectChange} />
    </div>
  )}
  {/* <Button onClick={copyToClipboard}>Copy</Button> */}
</div>

  
  );
};

export default MidiUtils;
