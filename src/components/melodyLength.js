import { useState } from "react";

export default function MelodyLength({ onChange }) {
  const [numNotes, setNumNotes] = useState(8);

  function handleNumNotes(event) {
    const _numNotes = event.target.value;
    setNumNotes(_numNotes);
    onChange(_numNotes);
  }

  return (
    <div class="parameters">
      <div class="dropdown">
        <select id="number-dropdown" value={numNotes} onChange={handleNumNotes}>
          <option value="4">4</option>
          <option value="6">6</option>
          <option value="8">8</option>
          <option value="12">12</option>
          <option value="16">16</option>
        </select>
      </div>
    </div>
  );
}
