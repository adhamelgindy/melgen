import { useState } from "react";

export default function Drums({ onChange }) {
  const [drums, setDrums] = useState('kick');

  function handleDrumsChange(event) {
    const selectedDrums = event.target.value;
    setDrums(selectedDrums);
    onChange(selectedDrums);
  }

  return (
    <div className="parameters">
    <div className="dropdown">
      <select id="number-dropdown" value={drums} onChange={handleDrumsChange}>
        <option value="bass">Bass</option>
        <option value="hihat">Hihat</option>
        <option value="kick">Kick</option>
        <option value="snare808">Snare</option>
      </select>
    </div>
     </div>
  );
}
