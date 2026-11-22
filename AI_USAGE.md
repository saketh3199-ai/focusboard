# AI Usage Disclosure

## Tools used

- **Claude (Anthropic)**, used in a chat conversation throughout the project.

No other AI tools were used (no Copilot or ChatGPT code generation).

## How I worked

I used Claude as a pair-programming guide. We built the project step by step: project setup, data, localStorage, create, edit, delete, status, statistics, search, filters, the carousel, component split, styling, responsiveness and accessibility. I committed to Git after each working step, ran and tested every piece in the browser, and asked follow-up questions until I understood how the code worked.

Claude wrote most of the first drafts of the component code and the CSS. I typed the code into my own project, reformatted it to my own style (braces on new lines, JSX kept in a variable), tested it, and fixed the problems that came up. I read the Figma frames from a screen recording and the assignment PDF myself and used them as the source of truth for the layout and text.

## Representative prompts

1. "I don't know about localStorage hooks tbh, is there no other way" (asked after Claude first suggested a custom hook).
2. "Where did we use setTasks?" and "After this, does control execute the effect hook and then re-render, or re-render and then execute the effect hook?"
3. "The `task={editingTask}` is a prop in parent component. The `editingTask` is a state variable. Is that right?"
4. "Explain what this `visibleTasks` snippet does" and "Why use a modulus for goNext and goPrevious instead of simply incrementing?"
5. "App.jsx, trying to do the same, but gives errors" (about a partial JSX change that Claude gave).

## AI-assisted areas

- Planning the build order and the component structure
- First drafts of the React components (create/edit form, task list, carousel, stat cards, filters, dialog)
- The search and filter logic, and the derived statistics
- The CSS for the layout, cards, task rows, modals and breakpoints
- Debugging: a missing `lucide-react` install, a lint configuration error, and broken JSX
- Drafts of this file and the README

## What I wrote or changed myself

- Reorganised all code into my own formatting style
- Chose to use plain `useState` and `useEffect` for localStorage instead of a custom hook
- Chose which Figma details to follow, and checked slide text and layout against the Figma frames
- Tested create, edit, delete, status change, search, filters, persistence and the carousel in the browser after each step

## Suggestions I checked, corrected or rejected

1. **Custom `useLocalStorage` hook:** Claude's first suggestion was a reusable hook. I did not understand it well enough to explain it, so I asked for a simpler approach. I used `useState` with a lazy initial value to load and a `useEffect` on `tasks` to save, directly in `App.jsx`. I can explain every line of it.
2. **Incomplete JSX snippet:** a partial block of JSX that Claude gave for `App.jsx` left tags unclosed and caused a compile error. I asked for the whole block instead, and replaced the complete section.
3. **Low-contrast colours:** after Claude pointed out that the grey text and the High-priority pill were below the 4.5:1 contrast ratio, I darkened them.
4. **Slide 3 text:** the end of the third Focus Notes slide was cut off in my recording, so Claude's wording is an assumption and I should compare it with the Figma file.