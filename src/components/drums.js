import { useState } from "react";

export default function Drums({ onChange }) {
  const [drums, setDrums] = useState('hihat');

  function handleDrumsChange(event) {
    const selectedDrums = event.target.value;
    setDrums(selectedDrums);
    onChange(selectedDrums); // Call the onChange prop with the selected value
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
