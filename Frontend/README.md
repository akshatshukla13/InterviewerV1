# Frontend UI Architecture (Desktop-first)

This frontend uses React + Vite with a desktop-first UI system.

## Design system

- **Colors**
  - Primary: `#2563eb`
  - Secondary: `#0f766e`
  - Neutral scale: `#f8fafc` → `#0f172a`
  - Semantic: success `#15803d`, warning `#b45309`, error `#b91c1c`
- **Typography**
  - H1/H2/H3/body/small presets are centralized in `src/design/tokens.js`
- **Spacing**
  - 8px-based spacing scale is centralized in `src/design/tokens.js`
- **Layout**
  - Shared container: `max-w-[1320px]` with consistent horizontal padding

## Reusable UI components

- `src/components/layout/AppShell.jsx` – shared desktop shell with topbar + sidebar
- `src/components/ui/AppButton.jsx` – primary / secondary / outline button variants
- `src/components/ui/AppCard.jsx` – standardized card surface and heading block
- `src/components/ui/AppField.jsx` – consistent form field structure + error state

## Folder structure additions

```txt
src/
  design/
    tokens.js
  components/
    layout/
      AppShell.jsx
    ui/
      AppButton.jsx
      AppCard.jsx
      AppField.jsx
```

## Pages migrated to the shared system

- `CandidateLogin.jsx`
- `InterviewerLogin.jsx`
- `InterviewerDashBoard.jsx`
- `CandidateDashBoard.jsx`
- `ScheduleInterview.jsx`
- `NavBar.jsx`

## Performance update

Heavy interview room routes are lazy-loaded in `src/main.jsx`:
- `RoomPage`
- `CandidateRoom`
