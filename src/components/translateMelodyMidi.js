function translateMelodyMidi(stringMelody) {
//   const melodyWithoutOctave = stringMelody.map((str) => str.charAt(0));
  const melodyWithoutOctave = stringMelody.map((str, index) => {
    if (str.length >= 2 && str.charAt(1) === "#") {
        return str.substring(0, 2);
    } else {
      return str?.charAt(0);
    }
  });
  const notes = [];
  melodyWithoutOctave?.forEach((string) => {
    switch (string) {
      case "C":
        notes.push(48);
        break;
      case "C#":
        notes.push(49);
        break;
      case "D":
        notes.push(50);
        break;
      case "D#":
        notes.push(51);
        break;
      case "E":
        notes.push(52);
        break;
      case "F":
        notes.push(53);
        break;
      case "F#":
        notes.push(54);
        break;
      case "G":
        notes.push(55);
        break;
      case "G#":
        notes.push(56);
        break;
      case "A":
        notes.push(57);
        break;
      case "A#":
        notes.push(58);
        break;
      case "B":
        notes.push(59);
        break;
      case "C":
        notes.push(60);
        break;
      case "C#":
        notes.push(61);
        break;
      case "D":
        notes.push(62);
        break;
      case "D#":
        notes.push(63);
        break;
      case "E":
        notes.push(64);
        break;
      case "F":
        notes.push(65);
        break;
      case "F#":
        notes.push(66);
        break;
      case "G":
        notes.push(67);
        break;
      case "G#":
        notes.push(68);
        break;
      case "A":
        notes.push(69);
        break;
      case "A#":
        notes.push(70);
        break;
      case "B":
        notes.push(71);
        break;
      default:
        notes.push();
        break;
    }
  });

  const musicNotes = [...notes];

  return musicNotes;
}

export default translateMelodyMidi;
