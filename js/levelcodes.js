function encodeLevelCode(level) {
  var num = level * 7 + 13;
  return num.toString(36).toUpperCase();
}

function decodeLevelCode(code) {
  var num = parseInt(code, 36);
  if (isNaN(num)) return null;
  var level = (num - 13) / 7;
  if (level > 0 && Math.floor(level) === level) {
    return level;
  }
  return null;
}
