export default function cleanSpaces(text) {
  if (!text) return "";
  return text.replace(/\s+/g, ' ').trim();
}
