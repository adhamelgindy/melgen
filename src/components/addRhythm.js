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

export default addrhythm;
