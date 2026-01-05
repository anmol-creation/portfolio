export default function convertToRandomCase(text) {
  if (!text) return "";
  return text.split('').map(char => {
    return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
  }).join('');
}
