// Simple state management for the text tool
const state = {
  inputText: "",
  outputText: ""
};

export const getState = () => ({ ...state });

export const setInputText = (text) => {
  state.inputText = text;
};

export const setOutputText = (text) => {
  state.outputText = text;
};
