function translateMelodyMidi(stringMelody) {
//   const melodyWithoutOctave = stringMelody.map((str) => str.charAt(0));
  const melodyWithoutOctave = stringMelody.map((str, index) => {
    if (str.length >= 2 && str.charAt(1) === "#") {
        return str.substring(0, 2);
    } else {
      return str.charAt(0);
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
    //   case 61:
    //     notes.push("C#");
    //     break;
    //   case 62:
    //     notes.push("D");
    //     break;
    //   case 63:
    //     notes.push("D#");
    //     break;
    //   case 64:
    //     notes.push("E");
    //     break;
    //   case 65:
    //     notes.push("F");
    //     break;
    //   case 66:
    //     notes.push("F#");
    //     break;
    //   case 67:
    //     notes.push("G");
    //     break;
    //   case 68:
    //     notes.push("G#");
    //     break;
    //   case 69:
    //     notes.push("A");
    //     break;
    //   case 70:
    //     notes.push("A#");
    //     break;
    //   case 71:
    //     notes.push("B");
    //     break;
      default:
        notes.push();
        break;
    }
  });

  const musicNotes = [...notes];

  return musicNotes;
}

export default translateMelodyMidi;
