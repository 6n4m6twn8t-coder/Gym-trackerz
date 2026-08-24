# Gym-trackerz

A mobile-first, local-first workout tracker built as a static web app.

## What it does

- Push / Pull / Legs hypertrophy program with an optional 4th chest + core day
- Log weight, reps and completed sets
- Remembers the previous performance for each set
- Exercise library with lightweight animated movement guides
- Warm-up, mobility and easy-cardio guidance
- Workout history stored on the device with `localStorage`
- Installable on iPhone via **Safari → Share → Add to Home Screen**
- No backend and no account required

## Designed to be easy to change

The UI is deliberately separated from the training data.

### Add or edit exercises

Edit:

`data/exercises.js`

Each exercise has an `id`, name, muscle group, equipment, animation path and technique cues.

### Add or edit programs

Edit:

`data/programs.js`

Programs only reference exercise IDs. This means one exercise definition/animation can be reused across many programs.

### Replace or add animations

Put SVG/GIF/WebP files in:

`animations/`

Then update the matching `animation` path in `data/exercises.js`.

### App logic and saved data

- `js/app.js` — rendering and interactions
- `js/storage.js` — local workout drafts and history
- `css/styles.css` — visual styling

## GitHub Pages

This project needs no build step.

In GitHub:

**Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save**

The site will then be available at:

`https://6n4m6twn8t-coder.github.io/Gym-trackerz/`

## Data note

Workout history is currently stored on the device/browser. Clearing Safari website data will clear the training log. A later upgrade can add export/import or cloud sync without changing the program/exercise structure.
