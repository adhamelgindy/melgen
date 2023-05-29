import { useState } from "react";

export default function Instrument({ onChange }) {
  const [instrument, setInstrument] = useState("Sampler");

  function handleInstrumentChange(event) {
    const selectedInstrument = event.target.value;
    setInstrument(selectedInstrument);
    onChange(selectedInstrument); // Call the onChange prop with the selected value
  }

  return (
    <div class="parameters">
      <div class="dropdown">
        <div className="piano-dropdown"></div>
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
          {/* <option value="Xylophone">Xylophone</option> */}
          {/* <option value="MonoSynth">MonoSynth</option>
          <option value="PolySynth">PolySynth</option>
          <option value="DuoSynth">DuoSynth</option>
          <option value="MembraneSynth">MembraneSynth</option> */}
        </select>
      </div>
    </div>
  );
}
