import { useState } from "react";

export default function Scale({ onChange }) {
  const [scale, setScale] = useState(5);

  function handleScaleChange(event) {
    const selectedScale = event.target.value;
    setScale(selectedScale);
    onChange(selectedScale);
  }

  return (
    <div className="parameters">
      <div className="dropdown">
        <select id="number-dropdown" value={scale} onChange={handleScaleChange}>
          <option value="0">Major</option>
          <option value="1">Major Pentatonic</option>
          <option value="2">Minor</option>
          <option value="3">Minor Pentatonic</option>
          <option value="4">Melodic Minor</option>
          <option value="5">Natural Minor</option>
          <option value="6">Dorian</option>
          <option value="7">Phrygian</option>
          <option value="8">Lydian</option>
          <option value="9">Mixolydian</option>
          <option value="10">Locrian</option>
        </select>
      </div>
    </div>
  );
}
