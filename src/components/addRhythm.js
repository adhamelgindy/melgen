function addrhythm(melody) {
  if (melody.includes("")) return;

  const rhythmicMelody = [...melody];

// more skips for greater meloy length
  const emptyElementsCount = Math.floor(Math.random() * rhythmicMelody.length / 3) + 2;

  // Add empty elements randomly 
  for (let i = 0; i < emptyElementsCount; i++) {
    const randomIndex = Math.floor(Math.random() * rhythmicMelody.length);
    rhythmicMelody.splice(randomIndex, 0, "");
  }
  // 2 skips for notes bigger than 10  
    if (rhythmicMelody.length > 10) {
      let randomIndex = Math.floor(Math.random() * (rhythmicMelody.length - 3)) + 2;
      rhythmicMelody.splice(randomIndex, 0, "", "");
    }
  
// Remove empty string at the beginning
  if (rhythmicMelody[0] === "") rhythmicMelody.shift(); 

  // always add one empty string in the end 
  rhythmicMelody.push("", "");

  return rhythmicMelody;
}

// function generateRhythmPattern(length) {
//   const rhythmPattern = [];
//   let restCount = 0;

//   for (let i = 0; i < length; i++) {
//     // Generate a random value between 0 and 1
//     const randomValue = Math.random();

//     // Adjust the probability of having rests based on your preference
//     const restProbability = 0.3;

//     if (randomValue < restProbability && restCount < length / 2) {
//       rhythmPattern.push(0); // Rest
//       restCount++;
//     } else {
//       rhythmPattern.push(1); // Note
//     }
//   }

//   return rhythmPattern;
// }

// function addRhythmToMelody(melody) {
//   if (melody.includes("")) return melody;
//   const rhythmPattern = generateRhythmPattern(melody.length);
//   const rhythmicMelody = [];

//   for (let i = 0; i < melody.length; i++) {
//     rhythmicMelody.push(melody[i]);

//     if (rhythmPattern[i] === 0) {
//       rhythmicMelody.push(""); // Add an empty string (rest)
//     }
//   }

//   return rhythmicMelody;
// }

// const shouldExport = Math.random() < 0.5;
// export default addrhythm;


export default addrhythm;
