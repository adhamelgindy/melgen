import addrhythm from "./addRhythm";

function translateMelody(melody) {
  // console.log('originalMelody', melody);
  const notes = [];
  try{
    melody?.forEach((number) => {
      switch (number) {
        case 48:
          notes.push("C");
          break;
        case 49:
          notes.push("C#");
          break;
        case 50:
          notes.push("D");
          break;
        case 51:
          notes.push("D#");
          break;
        case 52:
          notes.push("E");
          break;
        case 53:
          notes.push("F");
          break;
        case 54:
          notes.push("F#");
          break;
        case 55:
          notes.push("G");
          break;
        case 56:
          notes.push("G#");
          break;
        case 57:
          notes.push("A");
          break;
        case 58:
          notes.push("A#");
          break;
        case 59:
          notes.push("B");
          break;
        case 60:
          notes.push("C");
          break;
        case 61:
          notes.push("C#");
          break;
        case 62:
          notes.push("D");
          break;
        case 63:
          notes.push("D#");
          break;
        case 64:
          notes.push("E");
          break;
        case 65:
          notes.push("F");
          break;
        case 66:
          notes.push("F#");
          break;
        case 67:
          notes.push("G");
          break;
        case 68:
          notes.push("G#");
          break;
        case 69:
          notes.push("A");
          break;
        case 70:
          notes.push("A#");
          break;
        case 71:
          notes.push("B");
          break;
        default:
          notes.push("");
          break;
      }
    });
  } catch (error) {
    console.log('error:::', error);
  }
  

  const musicNotes = [...notes];
  // console.log('musicNotesmusicNotes', musicNotes);

  addrhythm(musicNotes);
  return addrhythm(musicNotes);
}

export default translateMelody;
