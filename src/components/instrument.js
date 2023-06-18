import { useState } from "react";

export default function Instrument({ onChange }) {
  const [instrument, setInstrument] = useState("Sampler");

  function handleInstrumentChange(event) {
    const selectedInstrument = event.target.value;
    setInstrument(selectedInstrument);
    onChange(selectedInstrument); 
  }

  return (
    <div className="parameters">
      <div className="dropdown">
        <select
          id="number-dropdown"
          value={instrument}
          onChange={handleInstrumentChange}
        >
          <option value="Electric">Electric</option>
          <option value="Flute">Flute</option>
          <option value="Guitar">Guitar</option>
          <option value="Sampler">Piano</option>
          <option value="Saxophone">Saxophone</option>
          <option value="Contrabass">contrabass</option>
          {/* <option value="Snare">snare</option> */}
          {/* <option value="Xylophone">Xylophone</option> */}
          {/* <option value="MonoSynth">MonoSynth</option>
          <option value="PolySynth">PolySynth</option>
          <option value="DuoSynth">DuoSynth</option> */}
          {/* <option value="MembraneSynth">MembraneSynth</option> */}
        </select>
      </div>
    </div>
  );
}
