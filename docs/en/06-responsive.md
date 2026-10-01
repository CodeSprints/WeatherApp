# Responsive design

The application is one codebase serving phones, tablets and desktops. There are no
separate templates and no device detection by browser name. The layout changes
only with the available width.

## Breakpoints

| Name | Width | Use |
| --- | --- | --- |
| base | from 320 px | One column, search field below the header. |
| `sm` | from 640 px | Wider spacing, four tiles of extra information. |
| `md` | from 768 px | The search field moves into the header bar. |
| `lg` | from 1024 px | Main content and side panel sit next to each other. |

## Rules applied

1. The smallest supported width is 320 px, set by the `min-w-[320px]` rule on `body`.
2. Interactive elements are at least 44 px tall, which meets the WCAG target size
   requirement.
3. Horizontally scrolling lists — the hourly forecast and the popular cities —
   carry `tabindex="0"`, so they can also be scrolled with a keyboard.
4. Text is shortened with `truncate` and containers use `min-w-0`, so long city
   names cannot stretch the layout.
5. On narrow screens the side panel with favourites and history sits below the main
   content instead of being hidden. No feature disappears on a phone.
6. The chart uses the Chart.js `responsive` mode and fills a container of fixed height.

## Dark mode

The theme is driven by the `dark` class on the `html` element. The choice is saved
in browser storage, and on first run the operating system preference is used.

## Reduced motion

The `prefers-reduced-motion` rule disables animation and smooth scrolling for
people who set that preference in their system.
