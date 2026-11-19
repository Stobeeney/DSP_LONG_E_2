---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["app.js","styles.css"]
---

# SignalsGym: study app (all screens)

Scope: the whole single-page app (home, Learn, Practice test, Flashcards, results). Mode: Operate. Phone-first (390px), also usable at desktop width. Light by default (daylight phone use on a commute); dark stays available as a toggle. Keep every question, mode, shortcut and stored progress (localStorage key unchanged).

Audience and job: one student drilling the CMPE 30244 worked examples in short bursts. First screen: start a round in one tap. Must feel fun and friendly, never harsh, boxy or sterile. Game layer central.

## Direction contract

THESIS: A friendly, game-like study app, the category standard done at full craft: Gizmo/Duolingo-grade polish, applied to the student's own DSP reviewer. It refuses the harsh signage world the user rejected, and the cheap version of the standard (purple gradients, emoji icons, low-contrast chips).

OWN-WORLD: A cool-gray ground (#f4f6fb) under white cards. The ground stays gray so white cards separate clearly on a phone in daylight without heavy borders, and a flat all-white page would read as the "plain" the user rejected. Rounded cards (16–20px radius) with soft borders. A pressable primary button in green, with a darker bottom edge that compresses on press. Each lecture owns a color: L5 sky blue, L6 pink, L7 orange, L8 violet. Gold for XP, orange flame for the streak, red and green for answers. Type is self-hosted rounded Nunito, heavy for headings. Colorful duotone SVG icons, no emoji.

STORY: The student opens the app, sees their streak and XP, and taps the big green Start round on their weakest lecture. They answer with tactile cards and see instant colored feedback with the explanation. Misses come back, and finishing a round celebrates.

FIRST VIEWPORT (home, 390x844): a top bar with the logo, a streak flame pill and an XP gem pill. A hero card tinted in the next lecture's color holds the lecture badge, its name and a short line, a small stem-plot illustration, and a full-width green Start round button. Below sit three rows with colored icon bubbles (Fix mistakes with a count, Flashcards, Practice test). After them come lecture chips, then lecture progress cards.

FORM: the standing exit, the category standard, chosen by the user after the built Terminal Yellow direction was rejected. Round seed:19fb4f8b3cebbe2f. Signature: a celebratory pop on correct answers and score counters (combo flame, an XP bump), and a confetti burst of lecture-colored dots when a round finishes. Static under prefers-reduced-motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
