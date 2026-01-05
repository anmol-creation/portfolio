export default function convertToTitleCase(text) {
  if (!text) return "";
  return text.toLowerCase().replace(/(?:^|\s)\w/g, function(match) {
    return match.toUpperCase();
  });
}
