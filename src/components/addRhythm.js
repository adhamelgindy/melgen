// function addrhythm(melody, genre) {
//   if (melody.includes("")) return;
//   // const genre = "classic"

//   const rhythmicMelody = [...melody];

// // more skips for greater meloy length
//   const emptyElementsCount = Math.floor(Math.random() * rhythmicMelody.length / 3) + 2;

//   // Add empty elements based on the genre
//   switch (genre) {
//     // case "pop":
//     //   const popPositions = [2, 4, 5, 7, 9];
//     //   for (let i = 0; i < emptyElementsCount; i++) {
//     //     const randomIndex = popPositions[Math.floor(Math.random() * popPositions.length)];
//     //     rhythmicMelody.splice(randomIndex, 0, "");
//     //   }
//     //   break;
//     case "pop":
//   const popPositions = [2, 4, 5, 7, 9];
//   for (let i = 0; i < emptyElementsCount && i < popPositions.length; i++) {
//     const position = popPositions[i];
//     rhythmicMelody.splice(position, 0, "");
//   }
//   break;
//     case "jazz":
//       // Add specific positions for jazz genre
//       const jazzPositions = [2, 4, 7, 9];
//       for (let i = 0; i < emptyElementsCount; i++) {
//         const randomPosition = jazzPositions[Math.floor(Math.random() * jazzPositions.length)];
//         rhythmicMelody.splice(randomPosition, 0, "");
//       }
//       break;
//     case "latin":
//       // Add specific positions for Latin genre
//       const latinPositions = [1, 3, 5, 8, 10];
//       for (let i = 0; i < emptyElementsCount; i++) {
//         const randomPosition = latinPositions[Math.floor(Math.random() * latinPositions.length)];
//         rhythmicMelody.splice(randomPosition, 0, "");
//       }
//       break;
//     case "classic":
//       // Add specific positions for Classic genre
//       const classicPositions = [1, 4, 8];
//       for (let i = 0; i < emptyElementsCount; i++) {
//         const randomPosition = classicPositions[Math.floor(Math.random() * classicPositions.length)];
//         rhythmicMelody.splice(randomPosition, 0, "");
//       }
//       break;
//     case "hip-hop":
//       // Add specific positions for Hip-Hop genre
//       const hipHopPositions = [0, 2, 4, 7, 9];
//       for (let i = 0; i < emptyElementsCount; i++) {
//         const randomPosition = hipHopPositions[Math.floor(Math.random() * hipHopPositions.length)];
//         rhythmicMelody.splice(randomPosition, 0, "");
//       }
//       break;
//     case "rock":
//       // Add specific positions for Rock genre
//       const rockPositions = [1, 3, 5, 6, 8];
//       for (let i = 0; i < emptyElementsCount; i++) {
//         const randomPosition = rockPositions[Math.floor(Math.random() * rockPositions.length)];
//         rhythmicMelody.splice(randomPosition, 0, "");
//       }
//       break;
//     case "electronic":
//       // Add specific positions for Electronic genre
//       const electronicPositions = [0, 3, 6, 9];
//       for (let i = 0; i < emptyElementsCount; i++) {
//         const randomPosition = electronicPositions[Math.floor(Math.random() * electronicPositions.length)];
//         rhythmicMelody.splice(randomPosition, 0, "");
//       }
//       break;
//     // Add cases for other genres as needed

//     default:
//       // For any other genre, add empty elements randomly
//       for (let i = 0; i < emptyElementsCount; i++) {
//         const randomIndex = Math.floor(Math.random() * (rhythmicMelody.length + 1));
//         rhythmicMelody.splice(randomIndex, 0, "");
//       }
//     }
  
//     // console.log('rhythmicMelody', rhythmicMelody);
// // Remove empty string at the beginning
//    if (rhythmicMelody[0] === "") rhythmicMelody.shift(); 
//   // if (rhythmicMelody[1] === "") rhythmicMelody.shift(); 

//   // always add one empty string in the end 
//    rhythmicMelody.push(""); 
//   // console.log('rhythmicMelody', rhythmicMelody);
//   return rhythmicMelody;
// }

// export default addrhythm;


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
    if (rhythmicMelody.length > 8) {
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