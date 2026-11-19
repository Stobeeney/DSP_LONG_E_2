# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
One user: the student who owns this project, preparing for CMPE 30244 (Digital Signal Processing) exams on discrete-time signals. Primary scene: a phone, in short bursts on the go (commute, breaks, waiting for class). Not shared with classmates or an instructor.

## Product Purpose
A personal drill-and-review tool for Lectures 5–8 of CMPE 30244. It turns the course reviewer PDF's worked examples into questions the student answers, gets explained, and repeats until mastered. Success: walking into the exam having solved every slide example and SQ item from memory, with no weak lecture left.

## Positioning
Every question, answer, and explanation is taken from the student's own course reviewer (`Discrete_Time_Signals_ALL_EXAMPLES_ANSWERED.pdf`), including its conventions (u(0) = 1, symmetric power averaging, integer DT periods, inclusive DT step windows). It is not a generic DSP quiz bank.

## Operating Context
- Runs locally: static files served with `start.sh` (`python3 -m http.server`, port 8000), opened in a browser. Reached from a phone over the local network or opened on the laptop.
- Progress lives in the browser's localStorage, so each device keeps its own.
- Study rhythm: many short sessions. A Learn round is 12 questions; a practice test is 10, 20, 30, or all.

## Capabilities and Constraints
- Content: 95 questions (multiple choice, true/false, typed numeric/expression) and 24 concept/formula flashcards, tagged by lecture (L5 DTS basics, periodicity, energy & power; L6 sketching & even/odd; L7 signal operations; L8 step, impulse & ramp). Source: `questions.js`.
- Modes: Learn (adaptive; missed questions return 3 positions later until correct), Flashcards (concepts deck or worked-examples deck; flip, sort into "still learning" / "got it", repeat the still-learning cards), Practice test (choose the count, optional timer, no feedback until the end, then a score and full answer key), Fix mistakes (questions missed and not yet mastered).
- Lecture topic filter; per-question mastery (level 0–3, mastered at 2+); per-lecture progress; accuracy.
- Typed answers accept fractions or decimals; an "I was right (formatting)" override exists.
- Keyboard shortcuts for desktop use (1–4, Enter, Space, arrows, Esc).
- Math is written in Unicode (δ, ω, π, subscripts, superscripts); no math-rendering library. Must work fully offline: no runtime dependency on remote scripts.

## Brand Commitments
Name: none shown. On 2026-11-20 the user asked to remove the "SignalsGym" name, so the UI shows only the logo mark, and the page title reads "DSP Reviewer". Do not reintroduce a product name. The game layer is central and must stay: XP, daily streak, answer combos, and mastery bars are the motivation loop, in the spirit of Gizmo.

Visual standard (user's choice, 2026-11-20): the study-app category standard, played straight at full craft. That means a friendly, Gizmo-style app with rounded cards, soft colors, playful touches and pressable buttons. Craft bar: Gizmo (named by the user), Duolingo, Quizlet. A novel world (airport yellow signage) was built and rejected as "too harsh, boxy and plain, not fun"; do not re-propose harsh, monochrome or sign-like worlds.

## Evidence on Hand
- Source content: the course reviewer PDF (59 pages, Lectures 5–8 slides and worked solutions) and `questions.js` derived from it.
- No logos, imagery, or brand assets exist. No claims about other users, scores, or outcomes should be invented.

## Product Principles
1. The course reviewer is the authority. Never reword an answer or a convention away from what the PDF states.
2. Built for one thumb and two minutes: every session should be startable and finishable in a short burst on a phone.
3. Getting something wrong is where learning happens: missed items come back, and the explanation is always shown.
4. Reward is earned by mastery, not by activity alone.

## Accessibility & Inclusion
No specific requirements were stated. Readable math on small screens and touch targets sized for thumbs follow from the phone-first scene.
