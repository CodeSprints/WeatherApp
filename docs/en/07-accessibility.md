# Accessibility

The target is WCAG 2.2 conformance at level AA.

## Page structure

- One `main` element with the `main-content` identifier.
- A “skip to content” link as the first element on the page, visible on focus.
- Headings form an unbroken sequence: `h1` for the place name or view title,
  `h2` for sections.
- Every section is tied to a name through `aria-labelledby` or `aria-label`.
- The `html` element carries `lang="pl"`.

## Keyboard

- Every feature works without a mouse.
- The suggestion list handles `ArrowUp`, `ArrowDown`, `Enter` and `Escape`.
- A visible focus ring is defined for `:focus-visible` with clear contrast.
- Focus order matches the visual order, because the layout never reorders elements
  away from their position in the markup.

## Roles and labels

| Element | Technique |
| --- | --- |
| Search field | `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-autocomplete` |
| Result list | `role="listbox"` and `role="option"` with `aria-selected` |
| Favourite button | `aria-pressed` and a label that follows the state |
| Theme switch | `aria-pressed` and a label describing the outcome |
| UV and air quality bars | `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` |
| Error message | `role="alert"` |
| Location message | `role="status"` |
| Loading region | `aria-busy="true"` |
| Decorative icons | `aria-hidden="true"` |
| Weather icons | `role="img"` with a text description |

## Text and contrast

- Text and background colours give at least 4.5:1 contrast for body text and 3:1
  for large text, in both themes.
- Information is never carried by colour alone. The air quality bar always has a
  word next to it, for example “Zadowalająca”.
- Content uses plain language and the active voice, and avoids needless abbreviations.

## Time and motion

- No content refreshes on its own and there are no time limits.
- Animation is disabled when `prefers-reduced-motion` is set.

## Device location

Location access needs a user action. Refusing it does not block the application —
a message appears and the search field keeps working.

## How to verify

1. Walk the whole page with `Tab` and confirm there is no focus trap.
2. Read the page with a screen reader such as NVDA or VoiceOver.
3. Zoom the page to 200 percent without losing content.
4. Run an automated audit such as Lighthouse or axe DevTools.
