export default function convertToToggleCase(text) {
  if (!text) return "";
  return text.split('').map(char => {
    if (char === char.toUpperCase()) {
      return char.toLowerCase();
    } else {
      return char.toUpperCase();
    }
  }).join('');
}
