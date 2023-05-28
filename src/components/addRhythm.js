function addrhythm(melody) {

  // if note bigger than 12 add more ""
  
  if (melody.includes("")) return;
  const catchyMelody = [...melody];

  // more skips for greater meloy length
  const emptyElementsCount = Math.floor(Math.random() * catchyMelody.length / 3) + 2;
  
  // Add empty elements randomly 
  for (let i = 0; i < emptyElementsCount; i++) {
  const randomIndex = Math.floor(Math.random() * catchyMelody.length);
  catchyMelody.splice(randomIndex, 0, "");
  }
  
  if (catchyMelody.length > 10) {
  const randomIndex = Math.floor(Math.random() * (catchyMelody.length - 2)) + 1;
  catchyMelody.splice(randomIndex, 0, "", ""); // Add 2 empty elements at the random indexS
  }
  
  return catchyMelody;
  
}

export default addrhythm;
