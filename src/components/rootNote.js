import { useState } from "react";

export default function RootNote({ onChange }) {
  const [rootNote, setRootNote] = useState(5);

  function handleRootNoteChange(event) {
    const selectedRootNote = event.target.value;
    const numNote = Number(selectedRootNote);
    setRootNote(numNote);
    console.log('selectedRootNote', selectedRootNote);
    console.log('numNote', numNote);
    onChange(numNote);
  }

  return (
    <div className="parameters">
      <div className="dropdown">
        <select id="number-dropdown" className="rootNote" value={rootNote} onChange={handleRootNoteChange} >
          <option value="48">C</option>
          <option value="49">C#</option>
          <option value="50">D</option>
          <option value="51">D#</option>
          <option value="52">E</option>
          <option value="53">F</option>
          <option value="54">F#</option>
          <option value="55">G</option>
          <option value="56">G#</option>
          <option value="57">A</option>
          <option value="58">A#</option>
          <option value="59">B</option>
        </select>
      </div>
    </div>
  );
}
