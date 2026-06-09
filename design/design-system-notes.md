# Design System Notes — FinOps Intelligence AI

## Design Philosophy

Dark enterprise SaaS — premium, data-rich, and credible. Inspired by Ramp, Brex, and Datadog. The design communicates: this is a serious financial tool, not a consumer app.

## Color Palette

### Background Colors
- `bg-slate-950` — Primary page background (#020617)
- `bg-slate-900` — Card background (#0f172a)
- `bg-slate-800` — Input, secondary element background (#1e293b)
- `bg-slate-700` — Progress bar track, divider emphasis (#334155)

### Text Colors
- `text-white` — Primary headings, important values
- `text-slate-100` — Readable body text
- `text-slate-300` — Table cell data
- `text-slate-400` — Labels, subtitles, secondary text
- `text-slate-500` — Placeholder text, metadata

### Accent Colors
- `text-blue-400` / `bg-blue-600` — Primary action, AI indicators, navigation active state
- `text-green-400` / `bg-green-950` — Success, under-budget, connected status
- `text-amber-400` / `bg-amber-950` — Medium risk, warning state
- `text-red-400` / `bg-red-950` — High/Critical risk, alert state

### Border Colors
- `border-slate-800` — Default card border
- `border-blue-800` / `border-blue-900` — AI insight cards, active states
- `border-red-800` — Alert and overrun cards
- `border-green-900` — Connected integration cards

## Typography

- **Font family:** System UI (`ui-sans-serif, system-ui`)
- **Page title (TopBar):** `text-lg font-semibold text-white`
- **Section heading:** `text-sm font-semibold text-white`
- **Table header:** `text-xs text-slate-400 font-medium uppercase tracking-wide`
- **Metric value:** `text-2xl font-bold`
- **Card body text:** `text-sm text-slate-300 leading-relaxed`
- **Label / metadata:** `text-xs text-slate-400` or `text-xs text-slate-500`

## Spacing

- **Page padding:** `p-8`
- **Card padding:** `p-5` or `p-6`
- **Card gap (grid):** `gap-4`
- **Section gap:** `space-y-8`
- **Table cell padding:** `px-6 py-3`

## Component Patterns

### Card
```
bg-slate-900 rounded-xl border border-slate-800 p-5
Alert variant: border-red-800
AI insight variant: bg-gradient-to-r from-blue-950 to-slate-900 border-blue-800
```

### Risk Badge
Inline badge with background, text, and border colors matching risk level. Font: `text-xs font-medium`. Padding: `px-2 py-0.5`.

### Metric Card
Standard 4-5 column grid on dashboard pages. Shows: label (small caps), value (large bold), change (small colored text), icon (right-aligned in colored background).

### Table
- Header: `border-b border-slate-800`, cells `text-xs text-slate-400 uppercase tracking-wide`
- Rows: `hover:bg-slate-800/50 transition-colors divide-y divide-slate-800`

### Button Styles
- Primary: `bg-blue-600 hover:bg-blue-700 text-white`
- Secondary: `bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700`
- Danger: `bg-red-950 hover:bg-red-900 text-red-400 border border-red-800`

## Responsive Behavior (Phase 1)

Current design is desktop-first (min-width: 1280px). The sidebar is fixed-width at 240px. Mobile responsiveness is out of scope for Phase 1.
