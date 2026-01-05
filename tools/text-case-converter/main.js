import convertToUppercase from './logic/uppercase.js';
import convertToLowercase from './logic/lowercase.js';
import convertToTitleCase from './logic/titlecase.js';
import convertToSentenceCase from './logic/sentencecase.js';
import convertToToggleCase from './logic/togglecase.js';
import convertToRandomCase from './logic/randomcase.js';
import copyToClipboard from './utils/copy.js';
import resetTool from './utils/reset.js';
import { setInputText, setOutputText, getState } from './state/text-state.js';

// Map actions to functions
const actions = {
  uppercase: convertToUppercase,
  lowercase: convertToLowercase,
  titlecase: convertToTitleCase,
  sentencecase: convertToSentenceCase,
  togglecase: convertToToggleCase,
  randomcase: convertToRandomCase
};

document.addEventListener('DOMContentLoaded', () => {
  const useToolBtn = document.getElementById('use-tool-btn');
  const toolContainer = document.getElementById('tool-container');

  // Step 1: Handle "Use Tool" Click
  useToolBtn.addEventListener('click', async () => {
    console.log("Use Tool clicked");
    if (toolContainer.classList.contains('hidden')) {
      // Load components if not already loaded (simple check: is it empty?)
      if (toolContainer.innerHTML.trim() === '') {
        console.log("Loading components...");
        await loadToolComponents();
        console.log("Components loaded.");
      }

      toolContainer.classList.remove('hidden');
      toolContainer.classList.add('fade-in');

      // Smooth scroll to tool
      toolContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Hide CTA button or change state? Requirement says "Tool UI same page ke niche open ho".
      // Doesn't say to hide button, but usually good UX to keep it or maybe disable it.
      // We'll leave it as is, allowing user to scroll back up.
    }
  });
});

async function loadToolComponents() {
  const toolContainer = document.getElementById('tool-container');

  try {
    // 1. Load Layout
    console.log("Fetching layout...");
    const layoutHtml = await fetchComponent('ui/tool-layout.html');
    console.log("Layout fetched");
    toolContainer.innerHTML = layoutHtml;

    // 2. Load Sections
    const inputSection = document.getElementById('input-section');
    const actionsSection = document.getElementById('actions-section');
    const outputSection = document.getElementById('output-section');
    const utilitySection = document.getElementById('utility-section');

    console.log("Fetching sections...");
    inputSection.innerHTML = await fetchComponent('components/input-area.html');
    outputSection.innerHTML = await fetchComponent('components/output-area.html');
    actionsSection.innerHTML = await fetchComponent('components/action-buttons.html');
    utilitySection.innerHTML = await fetchComponent('components/utility-buttons.html');
    console.log("Sections fetched");

    // 3. Initialize Event Listeners after DOM is ready
    initializeToolEvents();

  } catch (error) {
    console.error("Failed to load tool components:", error);
    toolContainer.innerHTML = "<p>Error loading tool. Please try refreshing the page.</p>";
  }
}

async function fetchComponent(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Failed to load ${path}`);
  return await response.text();
}

function initializeToolEvents() {
  const inputArea = document.getElementById('input-text');
  const outputArea = document.getElementById('output-text');

  // Input State Sync
  inputArea.addEventListener('input', (e) => {
    setInputText(e.target.value);
  });

  // Action Buttons
  document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const fn = actions[action];
      if (fn) {
        const currentInput = inputArea.value;
        const result = fn(currentInput);
        outputArea.value = result;
        setOutputText(result);
      }
    });
  });

  // Utility Buttons
  document.querySelectorAll('.utility-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const action = btn.dataset.action;

      if (action === 'copy') {
        const success = await copyToClipboard(outputArea.value);
        if (success) {
            const originalText = btn.innerText;
            btn.innerText = "Copied!";
            setTimeout(() => btn.innerText = originalText, 2000);
        }
      } else if (action === 'reset' || action === 'clear') {
        resetTool(inputArea, outputArea);
      }
    });
  });
}
