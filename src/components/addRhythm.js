function addrhythm(melody) {
  if (melody.includes("")) return;
    const newArray = [...melody];
  
    // if (newArray.length > 2) {
      const emptyElementsCount = Math.floor(Math.random() * 2) + 2; 
  
      // Add empty elements randomly within the array
      for (let i = 0; i < emptyElementsCount; i++) {
        const randomIndex = Math.floor(Math.random() * newArray.length); // Generate a random 
        newArray.splice(randomIndex, 0, "");
      }
    // }
  
    // Check if the array length is bigger than 6
    if (newArray.length > 6) {
      const randomIndex = Math.floor(Math.random() * (newArray.length - 1)) + 1; 
      newArray.splice(randomIndex, 0, "", ""); // Add 2 empty elements at the random index
    }
  
    return newArray;
  
}

export default addrhythm;
