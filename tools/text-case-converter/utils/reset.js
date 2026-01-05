import { setInputText, setOutputText } from '../state/text-state.js';

export default function resetTool(inputElement, outputElement) {
  if (inputElement) inputElement.value = '';
  if (outputElement) outputElement.value = '';
  setInputText('');
  setOutputText('');
}
