# Text Case Converter

A clean, fast, and UX-first tool for converting text case. Part of the UT.ac suite.

## Purpose
This tool allows users to easily convert text between Uppercase, Lowercase, Title Case, Sentence Case, Toggle Case, and Random Case. It handles Hinglish, emojis, and symbols correctly.

## Folder Philosophy
- **One Tool = One Root Folder**: All code for this tool is contained within `/tools/text-case-converter/`.
- **Isolation**: No logic, UI, or style is shared with the global codebase to prevent regressions.
- **Component-Based**: UI is built from small, manageable HTML fragments loaded dynamically.

## Structure
- `/ui`: Structural HTML fragments (header, layout).
- `/components`: Functional UI parts (inputs, buttons).
- `/logic`: Pure JS functions for text transformation. Each transformation is a separate file.
- `/styles`: CSS files isolated to this tool.
- `/state`: Simple state management.
- `/utils`: Helper functions (copy, reset).

## How to Add a New Function
1. Create a new JS file in `/logic/` (e.g., `new-case.js`).
2. Export a default function taking a string and returning a string.
3. Add a button in `components/action-buttons.html` with a `data-action="new-case"`.
4. Import the function in `main.js` and add it to the `actions` object mapping.

## UX Rules
- Tool UI is hidden by default until "Use Tool" is clicked.
- No page reloads.
- Ads are never placed near the tool interface.
- Dark/Light mode compatible.
