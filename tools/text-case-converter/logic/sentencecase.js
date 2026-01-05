export default function convertToSentenceCase(text) {
  if (!text) return "";
  const lower = text.toLowerCase();
  return lower.replace(/(^\s*\w|[\.\?!]\s*\w)/g, function(c) {
    return c.toUpperCase();
  });
}
