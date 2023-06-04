import { useState } from "react";

export default function Cycles({ onChange }) {
  const [cycles, setCycles] = useState(2);

  function handleCyclesChange(event) {
    const selectedCycles = event.target.value;
    setCycles(selectedCycles);
    onChange(selectedCycles); // Call the onChange prop with the selected value
  }

  return (
    <div className="parameters">
    <div className="dropdown">
      <select id="number-dropdown" value={cycles} onChange={handleCyclesChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
     </div>
  );
}
