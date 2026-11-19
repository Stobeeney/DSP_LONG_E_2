---
name: SignalsGym
description: A friendly, game-like drill app for the CMPE 30244 discrete-time signals reviewer, phone-first and built for two-minute rounds.
colors:
  ground: "#f4f6fb"
  card: "#ffffff"
  sunk: "#eceff6"
  line: "#e1e5ef"
  ink: "#1d2033"
  ink-2: "#565b72"
  go: "#1fa855"
  go-edge: "#158040"
  go-tint: "#e3f7ea"
  good-ink: "#0f7a3a"
  bad: "#e5484d"
  bad-edge: "#b8323a"
  bad-tint: "#fde8e8"
  bad-ink: "#b4232b"
  xp: "#f5a70a"
  flame: "#ff7a1a"
  combo: "#0b9e9a"
  l5: "#1683d4"
  l6: "#d63a7c"
  l7: "#d9650e"
  l8: "#6a48e8"
  on-fill: "#ffffff"
  ground-dark: "#13151d"
  card-dark: "#1d2030"
  sunk-dark: "#262a3c"
  line-dark: "#30354a"
  ink-dark: "#f1f2f8"
  ink-2-dark: "#aab0c6"
  go-tint-dark: "#173726"
  good-ink-dark: "#5fd68f"
  bad-tint-dark: "#3b1e22"
  bad-ink-dark: "#ff8a8e"
  l5-dark: "#4aa8ef"
  l6-dark: "#f06aa2"
  l7-dark: "#f2913f"
  l8-dark: "#9b82ff"
  combo-dark: "#2fd1c5"
typography:
  display:
    fontFamily: "Nunito, Noto Sans, DejaVu Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "64px"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "\"tnum\""
  headline:
    fontFamily: "Nunito, Noto Sans, DejaVu Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 900
    lineHeight: 1.1
  headline-hero:
    fontFamily: "Nunito, Noto Sans, DejaVu Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 900
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title-question:
    fontFamily: "Nunito, Noto Sans, DejaVu Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "23px"
    fontWeight: 800
    lineHeight: 1.4
  title:
    fontFamily: "Nunito, Noto Sans, DejaVu Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "21px"
    fontWeight: 900
    lineHeight: 1.5
  title-row:
    fontFamily: "Nunito, Noto Sans, DejaVu Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 900
    lineHeight: 1.2
  button:
    fontFamily: "Nunito, Noto Sans, DejaVu Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 900
    letterSpacing: "0.01em"
  choice:
    fontFamily: "Nunito, Noto Sans, DejaVu Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 700
  input:
    fontFamily: "Nunito, Noto Sans, DejaVu Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 800
  body:
    fontFamily: "Nunito, Noto Sans, DejaVu Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.5
  body-strong:
    fontFamily: "Nunito, Noto Sans, DejaVu Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.5
  stat:
    fontFamily: "Nunito, Noto Sans, DejaVu Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 900
    fontFeature: "\"tnum\""
  label:
    fontFamily: "Nunito, Noto Sans, DejaVu Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.3
  label-sm:
    fontFamily: "Nunito, Noto Sans, DejaVu Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 900
  value:
    fontFamily: "Nunito, Noto Sans, DejaVu Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 900
    fontFeature: "\"tnum\""
  caption:
    fontFamily: "Nunito, Noto Sans, DejaVu Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 700
rounded:
  kbd: "6px"
  key: "12px"
  tile: "14px"
  control: "16px"
  card: "18px"
  verdict: "20px"
  panel: "24px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  gap: "10px"
  md: "12px"
  row: "14px"
  gutter: "16px"
  lg: "20px"
  xl: "24px"
  section: "28px"
  page-end: "48px"
components:
  button-go:
    backgroundColor: "{colors.go}"
    textColor: "{colors.on-fill}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "58px"
    width: "100%"
  button-go-danger:
    backgroundColor: "{colors.bad}"
    textColor: "{colors.on-fill}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    height: "58px"
  button-secondary:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "54px"
    width: "100%"
  choice:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.choice}"
    rounded: "{rounded.control}"
    padding: "10px 14px 10px 10px"
    height: "64px"
  choice-selected:
    backgroundColor: "#f0edfd"
    textColor: "{colors.ink}"
  choice-correct:
    backgroundColor: "{colors.go-tint}"
    textColor: "{colors.good-ink}"
  choice-wrong:
    backgroundColor: "{colors.bad-tint}"
    textColor: "{colors.bad-ink}"
  choice-disabled:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink-2}"
  choice-key:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.key}"
    size: "40px"
  input-answer:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.input}"
    rounded: "{rounded.control}"
    padding: "14px 16px"
    height: "62px"
  segment:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.tile}"
    height: "54px"
  segment-pressed:
    backgroundColor: "#e3f0fa"
    textColor: "{colors.ink}"
  stat-pill:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.stat}"
    rounded: "{rounded.pill}"
    padding: "8px 12px"
    height: "38px"
  hero-card:
    backgroundColor: "#e1eff9"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "20px"
  mode-row:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "12px 14px"
    height: "72px"
  icon-bubble:
    backgroundColor: "#fbe4e4"
    textColor: "{colors.bad}"
    rounded: "{rounded.tile}"
    size: "48px"
  lecture-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "0 10px 0 0"
  lecture-card-go:
    textColor: "{colors.ink}"
    padding: "14px"
    width: "100%"
  include-toggle:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.key}"
    size: "40px"
  include-toggle-pressed:
    backgroundColor: "{colors.l5}"
    textColor: "{colors.on-fill}"
    rounded: "{rounded.key}"
    size: "40px"
  summary-stat:
    textColor: "{colors.ink}"
    typography: "{typography.value}"
    padding: "8px 4px"
  lecture-badge:
    backgroundColor: "{colors.l5}"
    textColor: "{colors.on-fill}"
    rounded: "{rounded.control}"
    size: "52px"
  progress-bar:
    backgroundColor: "{colors.sunk}"
    rounded: "{rounded.pill}"
    height: "12px"
  session-cells:
    backgroundColor: "{colors.sunk}"
    rounded: "{rounded.pill}"
    height: "16px"
  tag-next:
    backgroundColor: "{colors.go-tint}"
    textColor: "{colors.good-ink}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
  tag-miss:
    backgroundColor: "{colors.bad-tint}"
    textColor: "{colors.bad-ink}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
  count-badge:
    backgroundColor: "{colors.bad}"
    textColor: "{colors.on-fill}"
    rounded: "{rounded.pill}"
    padding: "0 9px"
    height: "30px"
  verdict-ok:
    backgroundColor: "{colors.go-tint}"
    textColor: "{colors.good-ink}"
    rounded: "{rounded.verdict}"
    padding: "16px"
  verdict-no:
    backgroundColor: "{colors.bad-tint}"
    textColor: "{colors.bad-ink}"
    rounded: "{rounded.verdict}"
    padding: "16px"
  score-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "24px 20px"
  flashcard-face:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "60px 20px 48px"
    height: "340px"
  flashcard-sort-bar:
    backgroundColor: "{colors.ground}"
    padding: "12px 16px calc(14px + env(safe-area-inset-bottom))"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
---

# Design System: SignalsGym

## Overview

**Creative North Star: "The Pocket Gym"**

SignalsGym is a training floor that fits in one hand. Every screen is a stack of rounded, softly shadowed white cards on a cool-gray ground, and every action is a chunky, pressable button that physically sinks when tapped. The mood is friendly, upbeat and encouraging: heavy rounded type, saturated but clean color, and small bursts of celebration when the student gets something right. It is the study-app category standard (Gizmo, Duolingo, Quizlet) played straight and finished properly, applied to one student's own DSP reviewer.

Color carries meaning, not decoration. Green means go and correct, red means wrong and to-fix, gold is XP, the orange flame is the daily streak, a teal bolt is the answer combo, and each of the four lectures owns a hue (L5 sky blue, L6 pink, L7 orange, L8 violet) that tints whatever surface is about that lecture. Density is comfortable and thumb-sized: 44px minimum targets, 58px primary buttons, 64px answer cards, and one 600px column even on desktop.

The world was chosen by the user after a harsh, boxy airport-signage direction was rejected as not fun. It refuses that world (monochrome, sign-like, square, sterile), and it equally refuses the cheap version of its own category: purple gradients, emoji icons and washed-out, low-contrast chips.

**Key Characteristics:**
- White cards on a cool-gray ground (never an all-white page), lifted by one soft two-layer shadow.
- Pressable buttons with a darker 5px bottom edge that compresses to 2px on press.
- Four lecture hues applied through one variable, tinting badges, heroes, include toggles, bars and flashcard backs.
- Self-hosted Nunito, heavy (800 to 900) for everything read at a glance.
- Authored duotone SVG pictograms in currentColor; no emoji, no icon font.
- Celebration on success (pop, confetti), a shake on a miss; under reduced motion everything holds still and the confetti stays as two static corner clusters.

## Colors

A clean, saturated game palette on cool neutrals: one green action color, one red error color, two reward colors and four lecture hues.

### Primary
- **Go Green** (#1fa855): the primary action fill (Start round, Check, Next, Got it), completed session cells, the correct-answer key and verdict icon, the logo square, the text caret and the selection tint. Paired with **Go Edge** (#158040), the darker pressable bottom edge, and **Go Tint** (#e3f7ea) for correct-answer surfaces and the "Up next" tag. **Good Ink** (#0f7a3a) is green text that must read on the tint.

### Secondary
- **Miss Red** (#e5484d): wrong answers, the Fix-mistakes bubble and count badge, the "Still learning" danger button. **Bad Edge** (#b8323a) is its pressable edge, **Bad Tint** (#fde8e8) its surface, **Bad Ink** (#b4232b) its legible text.

### Tertiary
- **XP Gold** (#f5a70a): the XP gem, the XP stat on results, and the "Done" mastery tag (mixed 22% into card for the fill, 50% into ink for the text).
- **Streak Flame** (#ff7a1a): the daily streak only: the streak pill in the top bar and the Day streak tile on results.
- **Combo Teal** (#0b9e9a): the answer combo only: the bolt and counter in the session bar and the Best combo tile on results. It sits outside the lecture, streak, XP and answer colors, so a combo never reads as a lecture, a reward or a grade.
- **Lecture hues:** **L5 Sky** (#1683d4), **L6 Pink** (#d63a7c), **L7 Tangerine** (#d9650e), **L8 Violet** (#6a48e8). Applied by setting `--c` on a lecture-scoped element (`.t-L5` to `.t-L8`); children mix from it: hero fill 13% into card, flashcard back 12% fill with a 45% border, badges, progress fills and the pressed include toggle at 100%. The tinted component tokens in the frontmatter (`hero-card`, `segment-pressed`, `choice-selected`, `icon-bubble`, `include-toggle-pressed`, `lecture-badge`) show one resolved instance of each mix.

### Neutral
- **Cool Ground** (#f4f6fb): page background, the translucent sticky top and session bars (88 to 90% ground with a 10px backdrop blur), and the solid sticky flashcard sort bar. The ground stays gray so white cards separate clearly on a phone in daylight without heavy borders; a flat all-white page reads as the "plain" the user rejected.
- **Card White** (#ffffff): every card, control and pill surface.
- **Sunk Gray** (#eceff6): progress-bar and session-cell tracks, hover fill on choices and icon buttons.
- **Soft Line** (#e1e5ef): 2px borders on controls, choices, include toggles and flashcard faces, and the 2px top rule over each summary stat. Disabled, unanswered choices use it at 60%.
- **Ink** (#1d2033): primary text and the toast fill.
- **Ink Muted** (#565b72): secondary text, icons on secondary buttons, unpressed segment labels, summary labels, and the text of disabled, unanswered choices.
- **On Fill** (#ffffff): text and glyphs on green, red and lecture-colored fills, in both themes.

### Dark theme
Set by `data-theme="dark"` on the root (the moon toggle in the top bar). Neutrals, tints, inks, lecture hues and Combo Teal switch to their `-dark` tokens; Go, Go Edge, Miss Red, Bad Edge, XP Gold and Streak Flame are the same in both themes. The shadow deepens to black at 25 to 30%. Light is the default.

### Named Rules
**The Lecture Owns Its Color Rule.** A surface about one lecture takes that lecture's hue through `--c` and mixes from it; never hard-code a lecture hex into a component. The same four hues also serve as the general accent family: L5 Sky marks focus and selection in setup (pressed segment, focused answer field) and the Flashcards bubble; L8 Violet marks a chosen-but-ungraded choice and the Practice-test bubble.

**The Green Means Go Rule.** Green is reserved for moving forward and for being right. A screen's forward action is the green pressable button; red appears only for wrong answers, mistakes to fix, and the explicit "still learning" sort.

**The Gold Is Earned Rule.** Gold and flame orange mark rewards only: XP, mastery done and the daily streak. They never decorate neutral UI.

**The One Flame Rule.** The orange flame means the daily streak and nothing else. The answer combo is the authored bolt in Combo Teal, in the session-bar counter and on the Best combo tile; Combo Teal is used for nothing else.

## Typography

**Display Font:** Nunito (self-hosted woff2, variable 500 to 900, latin and latin-ext subsets), with Noto Sans, DejaVu Sans, Segoe UI, system-ui fallback
**Body Font:** Nunito, same stack
**Label/Mono Font:** none; keyboard caps and numbers use Nunito with tabular figures

**Character:** One rounded sans at heavy weights does everything. The soft terminals keep 900-weight headings friendly instead of loud, and the heavy weights keep math and numbers legible on a small screen in daylight.

### Hierarchy
- **Display** (900, 64px, 1, -0.02em, tabular): the score number on results screens, in Go Green, with a half-size muted "/ total".
- **Headline** (900, 32px, 1.1): setup and results page titles. **Headline Hero** (900, 28px, 1.15, -0.01em, max 15ch, balanced): the lecture name in the home hero.
- **Title Question** (800, 23px, 1.4; 26px at 700px and wider): the question prompt, wrapping anywhere so long expressions never overflow.
- **Title** (900, 21px): section headings ("Your lectures"); verdict headlines run at 900, 20px, 1.25. **Title Row** (900, 18px, 1.2): mode-row and lecture-card names.
- **Button** (900, 19px, 0.01em): primary button labels; secondary buttons run at 800, 17px.
- **Choice** (700, 18px): answer card text. **Input** (800, 22px): the typed-answer field.
- **Body** (500, 17px, 1.5): base text; the font ships no 400, so 500 is the floor. **Body Strong** (600): hero lines, verdict explanations and ledes, held to 60 to 68ch.
- **Stat** (900, 16px, tabular): streak and XP pills; results stat numbers run at 22px. **Value** (900, 20px, tabular): home summary values.
- **Label** (700, 14px, 1.3): row subtitles, mastery counts, question meta; the lectures hint line runs at 600, 15px. **Label Small** (900, 13px): status tags. **Caption** (700, 13px): summary labels, results stat labels, segment sublabels.

### Named Rules
**The Heavy Heading Rule.** Anything read at a glance (headings, buttons, counts, badges, tags) sets at 800 or 900. Body and explanations stay at 500 to 600; nothing renders below 500.

**The Tabular Counter Rule.** Every changing number (XP, streak, combo, score, stats, summary values) uses tabular figures so it can pop without the row reflowing.

## Layout

A single centered column, max 600px, with a 16px side gutter on every screen; desktop gets the same column with more air rather than a second layout. Spacing runs on a small set of steps: 8 and 10px between siblings in a stack or grid, 12 to 14px inside rows and between card groups, 16 to 24px inside panels, 28px between home sections, and 48px of bottom padding on main.

Home stacks the top bar, the lecture-tinted hero, three mode rows, the "Your lectures" heading with a one-line hint, four lecture cards, and a three-column summary. Sessions hide the top bar and replace it with a sticky session bar (close button, segmented progress track, counter or combo) over the question, choices or answer field, verdict and a full-width primary button. True/false choices and paired buttons sit in two equal columns; results stats and the home summary sit in three. Keyboard-shortcut hints show only on hover-capable devices.

Flashcards fill the screen: the card grows to the remaining viewport height (at least 300px, or taller when a face needs it), and the Still learning / Got it row is sticky at the bottom on solid ground with 12px top padding and 14px plus the safe-area inset below.

Breakpoints are few: the question grows to 26px at 700px and wider, and `hover: hover` / `hover: none` gate hover fills and keyboard hints.

## Elevation & Depth

A hybrid: cards float on one soft ambient shadow, and pressable controls get their depth from a thick bottom border instead of a shadow. Nothing else casts shadows. The sticky bars sit on a translucent, blurred ground rather than a shadow.

### Shadow Vocabulary
- **Soft Lift** (`box-shadow: 0 1px 2px rgba(29, 32, 51, .06), 0 6px 16px rgba(29, 32, 51, .07)`; dark: `0 1px 2px rgba(0,0,0,.3), 0 6px 16px rgba(0,0,0,.25)`): hero, mode rows, lecture cards, stat pills, score and stat cards, review items, flashcard faces. The home summary is flat, separated by a 2px top rule.
- **Focus Glow** (`box-shadow: 0 0 0 4px color-mix(in srgb, var(--l5) 22%, transparent)`): the typed-answer field on focus, with an L5 border.

### Named Rules
**The Pressable Edge Rule.** Anything the student presses to act (primary and secondary buttons, answer choices, segments, symbol keys) carries a darker bottom edge (5px; 4px on segments and symbol keys; 6px on flashcard faces) and on press drops 3px while the edge compresses to 2px. Cards that only navigate (mode rows, lecture cards) lift 1px on hover instead, and mode rows sink 1px on press. Information cards and the include toggle never get an edge.

**The One Shadow Rule.** There is one ambient shadow token. Controls with borders do not also take a shadow.

## Shapes

Everything is rounded and nothing is square. Radii step with size: 6px keyboard caps; 12px answer keys, symbol keys, include toggles and the logo square; 14px icon bubbles and segments; 16px buttons, choices, inputs, badges and small cards; 18px mode rows and lecture cards; 20px verdicts; 24px hero, score card and flashcards; full pills for stat pills, tags, counters, progress tracks and the toast. Status icons in verdicts and review items are circles. Interactive surfaces take 2px Soft Line borders; on selection the border takes the meaning color (lecture hue, violet, green or red) rather than thickening.

The one illustrative shape is the stem plot: a discrete-time sequence drawn as round-capped stems with filled dot heads on a faint baseline, used in the logo, favicon and hero art. It is the product's own subject matter and is the signature mark.

## Components

The feel is tactile and confident: thick, soft, obviously pressable.

### Buttons
- **Shape:** gently rounded (16px), full-width.
- **Primary (Go):** Go Green fill, white 900 19px label, 58px tall, 5px Go Edge bottom border, optional trailing arrow. Hover brightens 5%; press translates 3px down and compresses the edge to 2px over 80ms.
- **Danger:** the same build in Miss Red with Bad Edge (the "Still learning" sort).
- **Secondary:** Card White with a 2px Soft Line border and 5px bottom edge, Ink 800 17px label, 54px tall, muted icon; same press behavior.
- **Text link:** Ink Muted, 700 15px, underlined at a 3px offset, for low-stakes exits such as "Reset all progress".
- **Icon button:** 44px circle, Ink Muted glyph, Sunk Gray on hover.

### Chips
- **Include toggle:** a 40px square check (12px radius) at the right of each lecture card. Off: transparent glyph inside a 2px Soft Line border. On (`aria-pressed="true"`): filled with the lecture hue, white check. At least one lecture stays on.
- **Segments:** setup options in an equal-column grid, 54px, 14px radius, 4px edge; pressed takes the L5 border and a 12% L5 tint.
- **Tags:** 13px 900 pills: Up next (green tint), N to fix (red tint), Done (gold mix).

### Cards / Containers
- **Corner Style:** 18px for mode rows and lecture cards; 24px for hero, score and flashcards; 16px for stat tiles and review items.
- **Background:** Card White; the hero takes a 13% lecture tint; verdicts take Go Tint or Bad Tint.
- **Shadow Strategy:** Soft Lift (see Elevation & Depth); verdicts are flat.
- **Border:** none, except flashcard faces (2px Soft Line with a 6px bottom edge).
- **Internal Padding:** 12 to 14px rows and cards, 16px verdicts, 20px hero, 24px by 20px score card.
- **Summary:** a three-column definition list under the lecture cards: each cell centered, a 2px Soft Line top rule, a Caption label over a 20px tabular Value. No fill, no shadow.

### Inputs / Fields
- **Style:** 62px, 16px radius, 2px Soft Line border, Card White, Ink 800 22px text, muted 600 placeholder.
- **Focus:** the border turns L5 Sky with a 4px L5 glow at 22%; no outline.
- **Correct / Wrong:** border and fill switch to the green or red tint; wrong also shakes. A row of 44px symbol keys (12px radius, 4px edge) inserts math characters below the field.

### Navigation
- **Top bar:** sticky, translucent ground with a 10px blur, 64px tall. Logo (38px green rounded square with the stem-plot mark, plus the 900 20px wordmark) on the left; streak and XP stat pills and the theme toggle on the right.
- **Session bar:** replaces the top bar during any round. Close icon button, a 16px pill track of equal cells (done in green, current at 35% green), and a muted 900 15px counter; from a 2x combo it shows the bolt and turns Combo Teal.

### Answer Choice (signature)
The core interaction. A 64px card with a 40px lettered key on the left, a 2px border and a 5px pressable edge. Hover fills Sunk Gray. Selected (practice test) goes violet. Graded correct goes green tint with a filled green key and a pop; wrong goes red tint with a filled red key and a shake. The other choices stay at full opacity with Ink Muted text and a 60% Soft Line border; only their keys dim (45%).

### Verdict Strip (signature)
Rises 14px into place after an answer: a 20px-radius tinted panel with a 40px round status icon (check or cross in white), a 900 20px headline in Good Ink or Bad Ink, then the correct answer and the explanation from the reviewer. The explanation is always shown.

### Lecture Hero and Progress (signature)
The hero is the next lecture's tinted panel: a 52px lecture badge, then the lecture name as the hero headline (16px above it), a reason line, the stem-plot art at top right, and the full-width green Start round button. Each lecture card is a white 18px container holding two controls: a full-width button that starts a round on that lecture (52px badge, name, 12px progress bar filled in the lecture hue, then a meta row with "N of M mastered" and a status tag), and the include toggle at the right. A lecture left out of mixed rounds dims its start button to 50%; the toggle stays at full strength.

### Celebration
On results, 18 hand-placed confetti pieces (10px squares, 3px radius, each with its own rotation) in the four lecture hues plus green and gold sit in two clusters in the score card's top corners, clear of the score. With motion they fall 260px over 1.6s in a staggered burst; under reduced motion they stay still at their placed positions. Changing counters pop to 1.35x over 0.45s. Flashcards flip in 3D over 0.55s.

## Do's and Don'ts

### Do:
- **Do** give every pressable action the bottom edge and the 3px press (The Pressable Edge Rule).
- **Do** scope lecture color through `--c` with `.t-L5` to `.t-L8` and mix tints from it (13% hero, 10 to 12% selection, 15% bubbles).
- **Do** set headings, labels and numbers at 800 to 900 in Nunito, and keep the font self-hosted; the app must work offline.
- **Do** draw icons as authored 24px SVG in currentColor with 2.2 to 3.2px round strokes and a 25%-opacity fill for the duotone layer.
- **Do** keep touch targets at 44px or more and primary buttons at 58px.
- **Do** celebrate correct answers and finished rounds, and make every animation static under `prefers-reduced-motion` (keep the confetti as its still corner clusters rather than removing it).
- **Do** show the combo with the bolt in Combo Teal and keep the flame for the daily streak (The One Flame Rule).
- **Do** keep the page ground cool gray and reserve white for cards.
- **Do** keep light as the default theme and define every new neutral, tint and lecture color for dark as well.

### Don't:
- **Don't** use emoji as icons, or an icon font.
- **Don't** use purple or multi-color gradients as backgrounds or fills; tints are flat color-mixes.
- **Don't** ship low-contrast chips or toggles: unpressed segments keep Ink Muted labels and include toggles keep a visible 2px Soft Line border.
- **Don't** fade a whole disabled choice; mute its text to Ink Muted and dim only its key.
- **Don't** go harsh, monochrome, square or sign-like (the rejected signage world): no square corners, no all-caps signage type, no black-and-yellow bands.
- **Don't** spend green, gold or flame on decoration; they carry go/correct, XP and streak only.
- **Don't** add a second shadow, or put a shadow on a bordered control.
