import { useEffect, useState } from "react";
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
  const [midiOutDevice, setMidiOutDevice] = useState([]);
  const [midiOut, setMidiOut] = useState([]);
  const [showDropdowns, setShowDropdowns] = useState(false);
  const [notesOn, setNotesOn] = useState(new Map());

  useEffect(() => {
    // Initialize MIDI devices
    navigator.requestMIDIAccess().then(midiReady);

    // Cleanup function
    return () => {
      if (midi) {
        midi.removeEventListener("statechange", midiStateChangeHandler);
      }
    };
  }, []);

  let midi;

  function midiReady(midiAccess) {
    midi = midiAccess;
    midi.addEventListener("statechange", midiStateChangeHandler);
    initDevices(midi);
    // let midiInput = Array.from(midi.inputs.values());
    connectMidi(instrument, midiInDevice, midiOutDevice);
    //  connectMidiOut(midiOutDevice)
    // Call connectMidi with the desired instrument
  }

  function midiStateChangeHandler(event) {
    initDevices(event.target);
  }

  function initDevices(midi) {
    const inputs = Array.from(midi.inputs.values());
    const outputs = Array.from(midi.outputs.values());
    const defaultDeviceName =
      inputs.length > 0 ? inputs[0].name : "No default device available";
    if (!midiInDevice) {
      setMidiInDevice(findMIDIDeviceByName(inputs, defaultDeviceName));
    }
    if (midiOutDevice.length === 0) {
      setMidiOutDevice(findMIDIDeviceByName(outputs, defaultDeviceName));
    }

    setMidiIn(inputs.map((device) => device.name));
    setMidiOut(outputs.map((device) => device.name));
    setMidiIntial(midi);
  }

  function findMIDIDeviceByName(devices, name) {
    console.log("");
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
    console.log("inputs", inputs);
    console.log("selectedDevice", selectedDevice);
    // console.log('findMIDIDeviceByName(inputs, selectedDevice)', findMIDIDeviceByName(inputs, selectedDevice));
    const device = findMIDIDeviceByName(inputs, selectedDevice);
    setMidiInDevice(device);
    console.log("instrument", instrument);
    connectMidi(instrument, device, midiOutDevice);
    console.log("setMidiInDevicceececee", midiInDevice);
  };

  const handleOutputSelectChange = (e) => {
    const selectedDevice = e.target.value;

    const outputs = Array.from(midiIntial.outputs.values());
    const device = findMIDIDeviceByName(outputs, selectedDevice);
    setMidiOutDevice(device);
    connectMidi(instrument, midiInDevice, device);
  };

  const handleToggleDropdowns = () => {
    setShowDropdowns(!showDropdowns);
  };

  return (
    <div style={{ color: "#009458" }}>
      <button
        className="menuButton"
        onClick={handleToggleDropdowns}
        style={{ color: "#009458" }}
      >
        Midi
      </button>
      {showDropdowns && (
        <div style={{ display: "grid" }}>
          <label>Input: </label>
          <Dropdown options={midiIn} onChange={handleInputSelectChange} />
          <label>Output: </label>
          <Dropdown options={midiOut} onChange={handleOutputSelectChange} />
        </div>
      )}
    </div>
  );
};

export default MidiUtils;
