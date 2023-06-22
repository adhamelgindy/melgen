import { useEffect, useState } from 'react';

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

const MidiUtils = () => {
  const [midiIn, setMidiIn] = useState([]);
  const [midiOut, setMidiOut] = useState([]);
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
  });

  let midi;

  function midiReady(midiAccess) {
    midi = midiAccess;
    midi.addEventListener('statechange', midiStateChangeHandler);
    initDevices(midi);
  }

  function midiStateChangeHandler(event) {
    initDevices(event.target);
  }

  function initDevices(midi) {
    const inputs = Array.from(midi.inputs.values());
    const outputs = Array.from(midi.outputs.values());
    const inputDeviceNames = inputs.map((device) => device.name);
    setMidiIn(inputDeviceNames);
    setMidiOut(outputs.map((device) => device.name));
  }

  function copyToClipboard(event) {
    const str = event.target.nextElementSibling.textContent;
    navigator.clipboard.writeText(str).then(() => {
      event.target.textContent = 'Done!';
      event.target.classList.add('active');
      setTimeout(() => {
        event.target.textContent = 'Copy';
        event.target.classList.remove('active');
      }, 1000);
    });
  }

  const handleInputSelectChange = (e) => {
    // Handle input select change
  };

  const handleOutputSelectChange = (e) => {
    // Handle output select change
  };

  return (
    <div>
      <Dropdown options={midiIn} onChange={handleInputSelectChange} />
      <Dropdown options={midiOut} onChange={handleOutputSelectChange} />
      {/* <Button onClick={copyToClipboard}>Copy</Button> */}
    </div>
  );
};

export default MidiUtils;
