function generateMelody(melody, melodyLength) {
//    // Check if the melody array is already at the desired length
//    if (melody.length === melodyLength) {
//     // reset
//     melody.splice(0, melody.length);
//   }

//   for (let i = 0; i < melodyLength; i++) {
//     // Random integer between 0 and the length of array
//     randomNumber = Math.floor(Math.random() * scale[selectedScale]?.length);
//     // Add Scale
//     note = root + scale[selectedScale][randomNumber];
//     melody.push(note);

//     if (melodyLength > 5 && melody.length < melodyLength) {
//       // Repeat the last 2 or 4 notes with a probability of 30%
//       if (i > 1 && Math.random() < 0.3 && melody.length < melodyLength) {
//         let repeatLength = Math.random() < 0.5 ? 2 : 4;
//         let repeatStart = Math.max(0, i - repeatLength);
//         let repeatNotes = melody.slice(repeatStart, i + 1);
//         melody.splice(i + 1, 0, ...repeatNotes);
//         i += repeatNotes.length;
//       }
//       // Repeat a 3-note pattern with a probability of 20%
//       if (i > 2 && Math.random() < 0.2 && melody.length < melodyLength) {
//         let patternStart = Math.max(0, i - 2);
//         let patternNotes = melody.slice(patternStart, i + 1);
//         melody.splice(i + 1, 0, ...patternNotes);
//         i += patternNotes.length;
//       }
//     }
//   }
//   if (melody.length > melodyLength) {
//     melody.splice(melodyLength, melody.length - melodyLength);
//   }

//   return melody;
// //   setMidiNotes(melody);
// //   setNotes(translateMelody(melody).join(" "));
  }

  export default generateMelody;
