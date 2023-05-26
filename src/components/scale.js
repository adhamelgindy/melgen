import { useState} from 'react';

export default function Scale() {
    const [selectedScale, setSelectedScale] = useState(4);

    function chooseScale(event) {
        setSelectedScale(event.target.value);
    }

  return (
    <div class="parameters">
        <div class="dropdown">
        <select  id="number-dropdown" value={selectedScale} onChange={chooseScale}>
         <option value="0">Happy</option>
         <option value="1">Country</option>
         <option value="2">Sad</option>
         <option value="3">Rock</option>
         <option value="4">Jazz</option>
         <option value="5">Natural</option>
         <option value="6">Funky</option>
         <option value="7">Spanish</option>
         <option value="8">Dreamy</option>
         <option value="9">Blues</option>
         <option value="10">Dark</option>
        </select>
        </div>
      </div>
  );
}
