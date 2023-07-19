import { useState } from "react";

export default function Genre({ onChange }) {
  const [genre, setGenre] = useState("calssic");

  function handleGenreChange(event) {
    const selectedGenre = event.target.value;
    setGenre(selectedGenre);
    onChange(selectedGenre);
  }

  return (
    <div className="parameters">
      <div className="dropdown">
        <select id="number-dropdown" className="rootNote" value={genre} onChange={handleGenreChange} >
          <option value="classic">Classic</option>
          <option value="hiphop">Hiphop</option>
          <option value="electronic">Electronic</option>
          {/* <option value="latin">Latin</option>
          <option value="jazz">Jazz</option>
          <option value="pop">Pop</option>
          <option value="funk">Funk</option> */}
          {/* <option value="rock">Rock</option> */}
        </select>
      </div>
    </div>
  );
}
