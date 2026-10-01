# CodeTrack - ReactJS Coding Practice Tracker

A fresh implementation of **Task 2 / Problem 43 - Coding Practice Tracker** for Full Stack Web Development.

## What is different about this project?

This is not a redesign of the supplied Habit Tracker. It solves a different problem statement and uses a different information model: coding problems, topics, languages, difficulty, status, solve time, bookmarks, practice goals and analytics.

## Main features

- Four React views: Dashboard, Problem Library, Analytics, Goals
- Add / edit / delete problem records
- Search by title, topic or language
- Difficulty, status, language and bookmark filters
- Solved / Review / Attempted workflow
- Weekly activity chart and topic breakdown
- Monthly solved-problem and weekly time goals
- Consecutive-day streak calculation
- LocalStorage persistence
- JSON backup export
- Light / dark theme
- Client-side form validation
- Responsive layout for laptop, tablet and mobile screens

## Run the project

```bash
npm install
npm run dev
```

Open the local Vite URL shown by the terminal.

## Build for deployment

```bash
npm run build
npm run preview
```

The project is ready for static deployment to GitHub Pages, Netlify or Vercel after the normal Vite deployment configuration.

## Source structure

- `src/main.jsx` - React entry point
- `src/App.jsx` - components, state, calculations, validation and interactions
- `src/styles.css` - complete responsive UI
- `index.html` - HTML5 host document
