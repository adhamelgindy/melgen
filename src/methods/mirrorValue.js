function mirrorValue(value) {
    var range = 480 - 160;
    var mirroredValue = range - (value - 160);
    return mirroredValue;
  }
export default mirrorValue;
