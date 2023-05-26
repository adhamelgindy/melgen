import { useState} from 'react';

export default function Octave() {
    const [octave, setOctave] = useState(4);

    function handleOctaveChange(event) {
        setOctave(event.target.value);
    }

  return (
    <div class="parameters">
        <div class="dropdown">
        <select  id="number-dropdown" value={octave} onChange={handleOctaveChange}>
         <option value="2">low +</option>
         <option value="3">low</option>
         <option value="4">medium</option>
         <option value="5">high</option>
         <option value="6">high +</option>
        </select>
        </div>
      </div>
  );
}



// import { useState } from 'react';

// export default function Octave({ onChange }) {
//   const [octave, setOctave] = useState(4);

//   function handleOctaveChange(event) {
//     const selectedOctave = parseInt(event.target.value);
//     setOctave(selectedOctave);
//     onChange(selectedOctave); // Notify parent component about the octave change
//   }

//   return (
//     <div className="parameters">
//       <div className="dropdown">
//         <select id="number-dropdown" value={octave} onChange={handleOctaveChange}>
//           <option value="2">low +</option>
//           <option value="3">low</option>
//           <option value="4">medium</option>
//           <option value="5">high</option>
//           <option value="6">high +</option>
//         </select>
//       </div>
//     </div>
//   );
// }

