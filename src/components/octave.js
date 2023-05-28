import { useState } from "react";

export default function Octave({ onChange }) {
  const [octave, setOctave] = useState(3);

  function handleOctaveChange(event) {
    const selectedOctave = event.target.value;
    setOctave(selectedOctave);
    onChange(selectedOctave); // Call the onChange prop with the selected value
  }

  return (
    // <div className="parameters">
    <div className="dropdown">
      <select id="number-dropdown" value={octave} onChange={handleOctaveChange}>
        <option value="2">low +</option>
        <option value="3">low</option>
        <option value="4">medium</option>
        <option value="5">high</option>
        <option value="6">high +</option>
      </select>
    </div>
    // </div>
  );
}
