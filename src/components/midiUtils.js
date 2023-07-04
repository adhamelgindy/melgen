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
  const [midiIntial, setMidiIntial] = useState([]);
  const [midiIn, setMidiIn] = useState([]);
  const [midiInDevice, setMidiInDevice] = useState([]);
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
     connectMidi(instrument, midiInDevice);
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
    const defaultDeviceName = inputs.length > 0 ? inputs[0].name : 'No default device available';
    console.log('defaultDeviceName', defaultDeviceName);
    if (!midiInDevice){   
      setMidiInDevice(findMIDIDeviceByName(inputs, defaultDeviceName));
    }


    setMidiIn(inputs.map((device) =>  device.name));
    console.log('???????midiIn', midiIn);
    console.log('device>?????????', midiInDevice);
    
    setMidiOut(outputs.map((device) => device.name));
    setMidiIntial(midi)
  }

  function findMIDIDeviceByName(devices, name) {
    console.log('');
    for (let i = 0; i < devices.length; i++) {
      if (devices[i].name === name) {
        return devices[i];
      }
    }
    return null; // Return null if the device is not found
  }

  const handleInputSelectChange = (e) => {
   // disconnect last midi on change ??????????????????????????????????????
    const selectedDevice = e.target.value;

    const inputs = Array.from(midiIntial.inputs.values());
    console.log('inputs', inputs);
    console.log('selectedDevice', selectedDevice);
    // console.log('findMIDIDeviceByName(inputs, selectedDevice)', findMIDIDeviceByName(inputs, selectedDevice));
const device = findMIDIDeviceByName(inputs, selectedDevice);
    // findMIDIDeviceByName(inputs, selectedDevice);
    setMidiInDevice(device);
    console.log('instrument', instrument);
    connectMidi(instrument, device)
    console.log('setMidiInDevicceececee', midiInDevice);
  };
  
  

  const handleOutputSelectChange = (e) => {
    const selectedDevice = e.target.value; 
  
    const outputs = Array.from(midiIntial.outputs.values());
    const device = findMIDIDeviceByName(outputs, selectedDevice);
   connectMidiOut(device); 
    
  };

  function connectMidiOut(device) {
    // Open the MIDI output port
    device.open()
      .then(() => {
        // MIDI output is now connected, you can send MIDI messages
        console.log('MIDI output connected:', device.name);
      })
      .catch((error) => {
        // Handle any errors that occur during MIDI output connection
        console.error('Failed to connect MIDI output:', error);
      });
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
    <div style={{ display: 'grid'}}>
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
