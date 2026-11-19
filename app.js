/* DSP Reviewer — CMPE 30244 Discrete-Time Signals reviewer · friendly study app */
(() => {
  "use strict";

  const STORE_KEY = "signalsgym.v1";
  const LEARN_SIZE = 12;
  const app = document.getElementById("app");
  const Q_BY_ID = Object.fromEntries(QUESTIONS.map((q) => [q.id, q]));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ───────────── pictograms (authored SVG, one weight) ─────────────
  const P = {
    arrow: '<path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
    chevron: '<path d="M9 5.5l6.5 6.5L9 18.5" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>',
    cross: '<path d="M7 7l10 10M17 7L7 17" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>',
    close: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/>',
    target: '<circle cx="12" cy="12" r="9" fill="currentColor" opacity=".25"/><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/>',
    cards: '<rect x="8" y="3" width="12" height="15" rx="3" fill="currentColor" opacity=".25"/><rect x="8" y="3" width="12" height="15" rx="3" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M5 7.5v10A3.5 3.5 0 0 0 8.5 21H15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
    watch: '<circle cx="12" cy="13.5" r="7.5" fill="currentColor" opacity=".25"/><circle cx="12" cy="13.5" r="7.5" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M12 13.5V10M10 2.5h4M12 2.5V6M18.5 6.5l1.4-1.4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
    turn: '<path d="M4.5 12a7.5 7.5 0 0 1 13.2-4.9M19.5 12a7.5 7.5 0 0 1-13.2 4.9M18 3.5V7.5h-4M6 20.5v-4h4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    flame: '<path fill="currentColor" d="M13.2 2.3c.5 3-1.1 4.8-2.7 6.6C8.9 10.6 7.5 12.3 7.5 15c0 3.6 2.5 6.6 5.2 6.6 3.2 0 5.8-2.7 5.8-6.3 0-2.3-1-4-2.3-5.3.1 1.8-.6 3-1.8 3.6.6-3.8-.6-8.4-1.2-11.3Z"/>',
    bolt: '<path fill="currentColor" d="M13.5 2 4.5 13.5h6L9.5 22l9-11.5h-6Z"/>',
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5Z" fill="currentColor" opacity=".25"/><path d="M4 20.5v-15A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5Zm0 0A2.5 2.5 0 0 0 6.5 23H20v-5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M8.5 8h7M8.5 11.5h5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    gem: '<path fill="currentColor" d="M7 3.5h10l4 5.2L12 21 3 8.7Z"/><path fill="#fff" opacity=".45" d="M7 3.5h5L8.6 8.7H3Z"/>',
  };
  const ico = (name, size = 24) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">${P[name]}</svg>`;

  // ───────────── storage ─────────────
  const defaults = () => ({ progress: {}, xp: 0, streak: { count: 0, last: null }, topics: Object.keys(TOPICS), theme: null });
  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      return raw ? Object.assign(defaults(), JSON.parse(raw)) : defaults();
    } catch { return defaults(); }
  }
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch { /* storage unavailable */ } }
  let store = load();

  // ───────────── helpers ─────────────
  // math display: _{..} and ^{..} (and ^digits) become real sub/superscripts; everything else escaped
  const fmt = (t) => esc(t).replace(/_\{([^}]*)\}/g, "<sub>$1</sub>").replace(/\^\{([^}]*)\}/g, "<sup>$1</sup>").replace(/\^(\d+)/g, "<sup>$1</sup>");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const dayStr = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const prog = (id) => store.progress[id] || { seen: 0, correct: 0, wrong: 0, level: 0 };
  const isMastered = (id) => prog(id).level >= 2;
  const activeQs = () => QUESTIONS.filter((q) => store.topics.includes(q.topic));
  const activeConcepts = () => CONCEPTS.filter((c) => store.topics.includes(c.topic));
  const mistakeIds = () => activeQs().filter((q) => prog(q.id).wrong > 0 && prog(q.id).level < 2).map((q) => q.id);
  const fmtTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const lecNum = (topic) => topic.slice(1);
  const topicName = (topic) => TOPICS[topic].split(" · ")[1];
  const pad2 = (n) => String(n).padStart(2, "0");

  function toast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 1900);
  }

  // counters pop when their value changes
  const flapHTML = (text, cls = "") => `<span class="num ${cls}">${esc(text)}</span>`;
  function setFlap(el, text) {
    if (!el) return;
    text = String(text);
    if (el.textContent === text) return;
    const first = !el.dataset.init;
    el.dataset.init = 1; el.textContent = text;
    if (!first) flipCell(el);
  }
  function flipCell(el) { if (reduceMotion) return; el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop"); }
  const LEC_COLORS = ["var(--l5)", "var(--l6)", "var(--l7)", "var(--l8)", "var(--go)", "var(--xp)"];
  // hand-placed (x%, y%, rotation): two corner clusters, every dot at least one dot-width apart, clear of the text and the rounded corners
  const CONFETTI = [[5,8,15],[12,6,70],[8,17,140],[15,14,200],[4,27,40],[11,25,110],[17,24,260],[7,36,320],[14,35,85],
    [92,8,300],[85,6,160],[89,17,30],[82,14,240],[93,27,190],[86,25,55],[80,24,125],[90,36,275],[83,35,10]];
  const confettiHTML = () => `<div class="confetti" aria-hidden="true">${CONFETTI.map(([x, y, r], k) =>
    `<i style="left:${x}%;--y:${y}%;--rot:${r}deg;background:${LEC_COLORS[k % LEC_COLORS.length]};animation-delay:${(k % 6) * 80}ms"></i>`).join("")}</div>`;
  const stemArt = () => `<svg class="art" width="112" height="64" viewBox="0 0 112 64" aria-hidden="true"><path d="M2 58H110" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".35"/>${[[10,22],[26,36],[42,12],[58,40],[74,26],[90,46],[104,34]].map(([x,y]) => `<path d="M${x} 58V${y}" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="5.5" fill="currentColor"/>`).join("")}</svg>`;

  // screen changes repaint like a sign band update
  function paint(fn) {
    if (document.startViewTransition && !reduceMotion) document.startViewTransition(fn);
    else fn();
  }

  function touchStreak() {
    const today = dayStr();
    if (store.streak.last === today) return;
    const y = new Date(); y.setDate(y.getDate() - 1);
    store.streak.count = store.streak.last === dayStr(y) ? store.streak.count + 1 : 1;
    store.streak.last = today;
  }
  function liveStreak() {
    const y = new Date(); y.setDate(y.getDate() - 1);
    return store.streak.last === dayStr() || store.streak.last === dayStr(y) ? store.streak.count : 0;
  }
  function refreshTop() {
    setFlap(document.getElementById("xpVal"), store.xp);
    setFlap(document.getElementById("streakVal"), liveStreak());
  }
  function record(id, correct, xp) {
    const p = prog(id);
    p.seen++;
    if (correct) { p.correct++; p.level = Math.min(3, p.level + 1); } else { p.wrong++; p.level = 0; }
    store.progress[id] = p;
    store.xp += xp;
    touchStreak(); save(); refreshTop();
  }

  // ───────────── theme ─────────────
  function applyTheme() {
    if (store.theme) document.documentElement.setAttribute("data-theme", store.theme);
    else document.documentElement.removeAttribute("data-theme");
  }
  document.getElementById("themeBtn").addEventListener("click", () => {
    store.theme = store.theme === "dark" ? "light" : "dark"; applyTheme(); save();
  });
  document.getElementById("homeBtn").addEventListener("click", () => exitSession());
  const inSession = (on, narrow = false) => {
    document.body.classList.toggle("in-session", on);
    document.body.classList.toggle("narrow", on && narrow);
  };

  // ───────────── answer checking ─────────────
  const norm = (s) => String(s).toLowerCase().replace(/[−–—]/g, "-").replace(/\s+/g, "").replace(/^\+/, "");
  function parseNum(s) {
    const n = "-?(?:\\d+\\.?\\d*|\\.\\d+)";
    if (new RegExp(`^${n}$`).test(s)) return parseFloat(s);
    const m = s.match(new RegExp(`^(${n})/(${n})$`));
    if (m && parseFloat(m[2]) !== 0) return parseFloat(m[1]) / parseFloat(m[2]);
    return null;
  }
  function checkInput(q, raw) {
    const s = norm(raw);
    if (!s) return null;
    if ((q.accept || []).some((a) => norm(a) === s)) return true;
    if (typeof q.num === "number") {
      const v = parseNum(s);
      if (v !== null) return Math.abs(v - q.num) < (s.includes(".") ? 0.005 : 1e-9);
    }
    return false;
  }
  function correctText(q) {
    if (q.type === "mcq") return q.choices[q.answer];
    if (q.type === "tf") return q.answer ? "True" : "False";
    return q.accept[0];
  }

  // ───────────── session state ─────────────
  let S = null;
  let timerId = null;
  let nextRound = null; // the Learn round the home band points at

  function exitSession(force) {
    if (S && !S.finished && !force && S.mode !== "flash" && S.answeredCount > 0) {
      if (!confirm("Leave this round? Answers so far are saved.")) return;
    }
    clearInterval(timerId); S = null; paint(renderHome);
  }

  // The home band points at the weakest lecture in play; its least-mastered questions lead the round.
  function planNextRound() {
    const qs = activeQs();
    const topics = store.topics.slice().sort();
    const frac = (t) => { const tq = qs.filter((q) => q.topic === t); return tq.length ? tq.filter((q) => isMastered(q.id)).length / tq.length : 1; };
    const misses = (t) => qs.filter((q) => q.topic === t && prog(q.id).wrong > 0 && prog(q.id).level < 2).length;
    const weaker = (t, a) => frac(t) < frac(a) || (frac(t) === frac(a) && misses(t) > misses(a));
    const lead = topics.reduce((a, t) => (weaker(t, a) ? t : a), topics[0]);
    const started = qs.some((q) => q.topic === lead && prog(q.id).seen > 0);
    const byLevel = (list) => shuffle(list).sort((a, b) => prog(a.id).level - prog(b.id).level);
    const own = byLevel(qs.filter((q) => q.topic === lead));
    const others = byLevel(qs.filter((q) => q.topic !== lead && !isMastered(q.id)));
    const ordered = own.filter((q) => !isMastered(q.id)).concat(others, own.filter((q) => isMastered(q.id)));
    const ids = ordered.slice(0, LEARN_SIZE).map((q) => q.id);
    const extra = ids.filter((id) => Q_BY_ID[id].topic !== lead).length;
    return { ids, lead, extra, started };
  }

  // ───────────── HOME ─────────────
  function renderHome() {
    S = null; clearInterval(timerId); inSession(false);
    const qs = activeQs();
    const mastered = qs.filter((q) => isMastered(q.id)).length;
    const seen = qs.reduce((a, q) => a + prog(q.id).seen, 0);
    const correct = qs.reduce((a, q) => a + prog(q.id).correct, 0);
    const acc = seen ? Math.round((correct / seen) * 100) : null;
    const pct = qs.length ? Math.round((mastered / qs.length) * 100) : 0;
    const mist = mistakeIds().length;
    const defCount = activeQs().filter((q) => q.def).length;
    nextRound = planNextRound();

    const lead = nextRound.lead;
    const why = nextRound.extra ? `${nextRound.ids.length} questions · plus ${nextRound.extra} from other lectures` : `${nextRound.ids.length} questions · ${nextRound.started ? "your weakest lecture" : "not started yet"}`;

    const lecCards = Object.keys(TOPICS).map((k) => {
      const tq = QUESTIONS.filter((q) => q.topic === k);
      const m = tq.filter((q) => isMastered(q.id)).length;
      const miss = tq.filter((q) => prog(q.id).wrong > 0 && prog(q.id).level < 2).length;
      const on = store.topics.includes(k);
      let tag = "";
      if (!on) tag = "";
      else if (m === tq.length) tag = `<span class="tag done">Done</span>`;
      else if (lead === k) tag = `<span class="tag next">Up next</span>`;
      else if (miss) tag = `<span class="tag miss">${miss} to fix</span>`;
      return `<div class="lec t-${k} ${on ? "" : "off"}">
        <button class="lec-go" data-lec="${k}" aria-label="Start a round on Lecture ${lecNum(k)}: ${esc(topicName(k))}">
          <span class="badge" aria-hidden="true">L${lecNum(k)}</span>
          <span class="lec-body"><b>${esc(topicName(k))}</b>
            <span class="bar" aria-hidden="true"><span style="width:${(m / tq.length) * 100}%"></span></span>
            <span class="lec-meta"><small>${m} of ${tq.length} mastered</small>${tag}</span></span>
        </button>
        <button class="incl" data-topic="${k}" aria-pressed="${on}" aria-label="Include Lecture ${lecNum(k)} in rounds">${ico("check", 18)}</button>
      </div>`;
    }).join("");

    app.innerHTML = `
      <div class="wrap home">
        <div class="home-main">
        <section class="hero t-${lead}">
          ${stemArt()}
          <span class="badge" aria-hidden="true">L${lecNum(lead)}</span>
          <h1>${esc(topicName(lead))}</h1>
          <p>${esc(why)}</p>
          <button class="go" data-act="learn">Start round <span class="arrow">${ico("arrow", 24)}</span></button>
        </section>
        <div class="modes">
          <button class="mode k-red" data-act="mistakes" ${mist ? "" : "disabled"}>
            <span class="bub">${ico("target", 26)}</span>
            <span><b>Fix mistakes</b><small>${mist ? "Missed and not yet mastered" : "Nothing to fix yet"}</small></span>
            <span class="end">${mist ? `<span class="count">${mist}</span>` : ""}${ico("chevron", 20)}</span>
          </button>
          <button class="mode k-green" data-act="defs" ${defCount ? "" : "disabled"}>
            <span class="bub">${ico("book", 26)}</span>
            <span><b>Definitions</b><small>${defCount} concept questions · no solving</small></span>
            <span class="end">${ico("chevron", 20)}</span>
          </button>
          <button class="mode k-blue" data-act="flash">
            <span class="bub">${ico("cards", 26)}</span>
            <span><b>Flashcards</b><small>${CONCEPTS.length} concepts · ${QUESTIONS.length} worked examples</small></span>
            <span class="end">${ico("chevron", 20)}</span>
          </button>
          <button class="mode k-violet" data-act="quiz">
            <span class="bub">${ico("watch", 26)}</span>
            <span><b>Practice test</b><small>Timed, with a full answer key</small></span>
            <span class="end">${ico("chevron", 20)}</span>
          </button>
        </div>
        </div>

        <aside class="home-side">
        <section class="section" aria-labelledby="lecH">
          <h2 id="lecH">Your lectures</h2>
          <p class="hint-line">Tap a lecture to drill it. The check keeps it in your mixed rounds.</p>
          <div class="lecs">${lecCards}</div>
          <dl class="summary"><div><dt>Mastered</dt><dd>${pct}%</dd></div><div><dt>Questions</dt><dd>${mastered}/${qs.length}</dd></div><div><dt>Accuracy</dt><dd>${acc === null ? "–" : acc + "%"}</dd></div></dl>
        </section>

        <button class="reset" data-act="reset">Reset all progress</button>
        </aside>
      </div>`;

    app.querySelectorAll("[data-topic]").forEach((b) => b.addEventListener("click", () => {
      const k = b.dataset.topic;
      if (store.topics.includes(k)) {
        if (store.topics.length === 1) return toast("Keep at least one lecture in play");
        store.topics = store.topics.filter((t) => t !== k);
      } else store.topics.push(k);
      save(); renderHome();
    }));
    app.querySelector('[data-act="learn"]').onclick = () => startLearn(nextRound.ids);
    app.querySelectorAll("[data-lec]").forEach((b) => b.onclick = () => {
      const k = b.dataset.lec;
      const own = shuffle(QUESTIONS.filter((q) => q.topic === k)).sort((x, y) => prog(x.id).level - prog(y.id).level);
      startLearn(own.slice(0, LEARN_SIZE).map((q) => q.id), `Lecture ${lecNum(k)} round`);
    });
    app.querySelector('[data-act="flash"]').onclick = () => paint(renderFlashSetup);
    app.querySelector('[data-act="defs"]').onclick = () => {
      const defs = shuffle(activeQs().filter((q) => q.def)).sort((a, b) => prog(a.id).level - prog(b.id).level);
      if (defs.length) startLearn(defs.slice(0, LEARN_SIZE).map((q) => q.id), "Definitions round");
    };
    app.querySelector('[data-act="quiz"]').onclick = () => paint(renderQuizSetup);
    app.querySelector('[data-act="mistakes"]').onclick = () => { if (mist) startLearn(mistakeIds(), "Fix mistakes"); };
    app.querySelector('[data-act="reset"]').onclick = () => {
      if (confirm("Reset all progress, XP and streak? This can't be undone.")) {
        const t = store.theme; store = defaults(); store.theme = t; save(); refreshTop(); renderHome(); toast("Progress reset");
      }
    };
    window.scrollTo(0, 0);
  }

  // ───────────── LEARN ─────────────
  function startLearn(ids, title = "Learn round") {
    ids = ids && ids.length ? shuffle(ids) : planNextRound().ids;
    if (!ids.length) return toast("No questions in the selected lectures");
    S = { mode: "learn", title, queue: ids.slice(), total: ids.length, done: new Set(), firstTry: new Set(), missed: new Set(),
          combo: 0, bestCombo: 0, xpGained: 0, answered: false, answeredCount: 0 };
    paint(renderQuestion);
  }

  // ───────────── QUIZ ─────────────
  let quizCfg = { count: 10, timed: true };
  function sessionBar(inner) {
    return `<div class="sbar"><div class="wrap">
      <button class="icon-btn on-sign" data-x aria-label="Leave and go home">${ico("close", 24)}</button>${inner}</div></div>`;
  }
  function renderQuizSetup() {
    inSession(true, true);
    const n = activeQs().length;
    const counts = [10, 20, 30].filter((c) => c < n).concat([n]);
    if (!counts.includes(quizCfg.count)) quizCfg.count = counts[0];
    app.innerHTML = `${sessionBar(`<span class="meta" style="margin-left:auto">${n} questions in play</span>`)}
      <div class="wrap">
        <h1 class="page-title">Practice test</h1>
        <p class="lede">No feedback until the end. Then you get a score and the full answer key.</p>
        <div class="field"><h2 id="cntH">Questions</h2>
          <div class="seg n${Math.min(counts.length, 4)}" role="group" aria-labelledby="cntH" style="grid-template-columns:repeat(${counts.length},1fr)">${counts.map((c) => `<button data-count="${c}" aria-pressed="${quizCfg.count === c}">${c === n ? "All " + c : c}</button>`).join("")}</div>
        </div>
        <div class="field"><h2 id="tmH">Timer</h2>
          <div class="seg n2" role="group" aria-labelledby="tmH"><button data-timed="1" aria-pressed="${quizCfg.timed}">On</button><button data-timed="0" aria-pressed="${!quizCfg.timed}">Off</button></div>
        </div>
        <button class="go inline" data-go><span class="label">Start test · ${quizCfg.count} questions</span><span class="arrow">${ico("arrow", 30)}</span></button>
      </div>`;
    app.querySelector("[data-x]").onclick = () => exitSession();
    app.querySelectorAll("[data-count]").forEach((b) => b.onclick = () => { quizCfg.count = +b.dataset.count; renderQuizSetup(); });
    app.querySelectorAll("[data-timed]").forEach((b) => b.onclick = () => { quizCfg.timed = b.dataset.timed === "1"; renderQuizSetup(); });
    app.querySelector("[data-go]").onclick = startQuiz;
    window.scrollTo(0, 0);
  }
  function startQuiz() {
    const ids = shuffle(activeQs()).slice(0, quizCfg.count).map((q) => q.id);
    S = { mode: "quiz", title: "Practice test", queue: ids.slice(), order: ids, total: ids.length, idx: 0,
          answers: {}, answered: false, answeredCount: 0, start: Date.now(), elapsed: 0 };
    if (quizCfg.timed) {
      timerId = setInterval(() => {
        if (!S || S.mode !== "quiz") return clearInterval(timerId);
        S.elapsed = Math.floor((Date.now() - S.start) / 1000);
        setFlap(document.getElementById("timer"), fmtTime(S.elapsed));
      }, 1000);
    }
    paint(renderQuestion);
  }

  // ───────────── QUESTION VIEW (learn + quiz) ─────────────
  const comboHTML = () => (S.combo >= 2 ? `${ico("bolt", 20)}${flapHTML("×" + S.combo)}` : "");
  function updateCombo() {
    const el = document.getElementById("combo");
    if (!el) return;
    const f = el.querySelector(".num");
    if (S.combo >= 2 && f) setFlap(f, "×" + S.combo);
    else { el.innerHTML = comboHTML(); el.querySelectorAll(".num").forEach(flipCell); }
  }
  function renderQuestion() {
    inSession(true);
    const id = S.queue[0];
    const q = Q_BY_ID[id];
    S.current = id; S.answered = false;
    S.choiceOrder = q.type === "mcq" ? shuffle(q.choices.map((_, i) => i)) : null;

    const cells = S.mode === "learn"
      ? Array.from({ length: S.total }, (_, k) => `<i class="${k < S.done.size ? "done" : k === S.done.size ? "now" : ""}"></i>`).join("")
      : Array.from({ length: S.total }, (_, k) => `<i class="${k < S.idx ? "done" : k === S.idx ? "now" : ""}"></i>`).join("");
    const right = S.mode === "learn"
      ? `<span class="meta combo" id="combo" title="Combo">${comboHTML()}</span>`
      : quizCfg.timed ? `<span class="meta"><span class="vh">Time</span><span class="num" id="timer">${fmtTime(S.elapsed)}</span></span>` : "";
    const where = S.mode === "learn"
      ? `${S.done.size} of ${S.total} cleared${S.missed.has(id) ? " · back again" : ""}`
      : `Question ${S.idx + 1} of ${S.total}`;

    let body = "";
    if (q.type === "mcq") {
      body = `<div class="choices ${q.choices.every((c) => c.length <= 26) ? "short" : ""}">${S.choiceOrder.map((ci, k) =>
        `<button class="choice" data-ci="${ci}"><span class="key">${"ABCD"[k]}</span><span>${fmt(q.choices[ci])}</span></button>`).join("")}</div>`;
    } else if (q.type === "tf") {
      body = `<div class="choices tf">
        <button class="choice" data-tf="true"><span class="key">T</span><span>True</span></button>
        <button class="choice" data-tf="false"><span class="key">F</span><span>False</span></button></div>`;
    } else {
      body = `<div class="answer">
        <label class="vh" for="ans">Your answer</label>
        <input id="ans" type="text" inputmode="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type your answer">
        <div class="syms"><button data-sym="−" aria-label="Insert minus sign">−</button><button data-sym="/" aria-label="Insert fraction slash">/</button><button data-sym="." aria-label="Insert decimal point">.</button><span class="hint">4/3 or 1.33 both count</span></div>
        <button class="go" data-check><span class="label">Check answer</span><span class="arrow">${ico("arrow", 30)}</span></button>
      </div>`;
    }
    const keys = q.type === "input" ? "<kbd>Enter</kbd> check, then continue" : `<kbd>1</kbd>–<kbd>${q.type === "tf" ? 2 : 4}</kbd> answer · <kbd>Enter</kbd> continue`;
    app.innerHTML = `${sessionBar(`<div class="cells" aria-hidden="true">${cells}</div>${right}`)}
      <div class="wrap qgrid">
        <div class="qmain">
        <div class="qhead t-${q.topic}"><span class="badge" aria-hidden="true">L${lecNum(q.topic)}</span><span class="t"><b>${esc(where)}</b>${esc(topicName(q.topic))}</span></div>
        <p class="question" id="qtext" data-id="${q.id}">${fmt(q.q)}</p>
        </div>
        <div class="qside">
        ${body}
        <div id="fb"></div>
        ${S.mode === "quiz" ? `<button class="link skip" data-skip>Skip this question</button>` : ""}
        </div>
        <p class="kbd">${keys} · <kbd>Esc</kbd> leave</p>
      </div>`;

    app.querySelector("[data-x]").onclick = () => exitSession();
    app.querySelectorAll("[data-ci]").forEach((b) => b.onclick = () => answerMcq(+b.dataset.ci, b));
    app.querySelectorAll("[data-tf]").forEach((b) => b.onclick = () => answerTf(b.dataset.tf === "true", b));
    const inp = document.getElementById("ans");
    if (inp) {
      app.querySelector("[data-check]").onclick = () => answerInput();
      app.querySelectorAll("[data-sym]").forEach((b) => b.onclick = () => {
        const s = inp.selectionStart ?? inp.value.length, e = inp.selectionEnd ?? s;
        inp.value = inp.value.slice(0, s) + b.dataset.sym + inp.value.slice(e);
        inp.focus(); inp.setSelectionRange(s + 1, s + 1);
      });
      if (matchMedia("(hover: hover)").matches) setTimeout(() => inp.focus(), 30);
    }
    const sk = app.querySelector("[data-skip]");
    if (sk) sk.onclick = () => { if (!S.answered) submit(false, "(skipped)", null); };
    window.scrollTo(0, 0);
  }

  function answerMcq(ci, btn) {
    if (S.answered) return;
    const q = Q_BY_ID[S.current];
    const ok = ci === q.answer;
    markChoice(btn, ok);
    if (S.mode === "learn" && !ok) markChoice(app.querySelector(`[data-ci="${q.answer}"]`), true);
    submit(ok, q.choices[ci], btn);
  }
  function answerTf(val, btn) {
    if (S.answered) return;
    const q = Q_BY_ID[S.current];
    const ok = val === q.answer;
    markChoice(btn, ok);
    if (S.mode === "learn" && !ok) markChoice(app.querySelector(`[data-tf="${q.answer}"]`), true);
    submit(ok, val ? "True" : "False", btn);
  }
  function markChoice(btn, ok) {
    if (!btn) return;
    if (S.mode === "quiz") { btn.classList.add("selected"); return; }
    btn.classList.add(ok ? "correct" : "wrong");
    btn.querySelector(".key").innerHTML = ico(ok ? "check" : "cross", 24);
  }
  function answerInput() {
    if (S.answered) return;
    const q = Q_BY_ID[S.current];
    const inp = document.getElementById("ans");
    const res = checkInput(q, inp.value);
    if (res === null) { toast("Type an answer first"); inp.focus(); return; }
    inp.readOnly = true;
    if (S.mode === "learn") inp.classList.add(res ? "correct" : "wrong");
    app.querySelector("[data-check]").remove();
    app.querySelector(".syms")?.remove();
    submit(res, inp.value.trim(), inp);
  }

  function submit(ok, given, el) {
    S.answered = true; S.answeredCount++;
    app.querySelectorAll(".choice").forEach((b) => b.disabled = true);
    const id = S.current, q = Q_BY_ID[id];

    if (S.mode === "quiz") {
      S.answers[id] = { ok, given };
      record(id, ok, ok ? 5 : 0);
      setTimeout(() => nextQuestion(), q.type === "input" || given === "(skipped)" ? 0 : 260);
      return;
    }
    S.prevProg = { ...prog(id) }; S.prevCombo = S.combo;
    let gained = 0;
    if (ok) {
      S.combo++; S.bestCombo = Math.max(S.bestCombo, S.combo);
      gained = 10 + Math.min(S.combo - 1, 5) * 2;
      if (!S.missed.has(id)) S.firstTry.add(id);
    } else { S.combo = 0; S.missed.add(id); }
    S.xpGained += gained;
    record(id, ok, gained);
    updateCombo();
    showFeedback(ok, q, gained);
  }

  function showFeedback(ok, q, gained) {
    const back = Math.min(3, S.queue.length - 1);
    const head = ok
      ? `Correct${gained ? ` · +${gained} XP` : ""}${S.combo >= 2 ? ` · combo ×${S.combo}` : ""}`
      : back > 0 ? `Not quite. This one comes back in ${back}.` : "Not quite. Try it once more.";
    const fb = document.getElementById("fb");
    fb.innerHTML = `<div class="verdict ${ok ? "ok" : "no"}" role="status">
        <div class="strip"><span class="ins">${ico(ok ? "check" : "cross", 28)}</span><b>${head}</b></div>
        <div class="body">
          ${ok ? "" : `<p>Answer: <span class="ans">${fmt(correctText(q))}</span></p>`}
          <p>${fmt(q.exp)}</p>
        </div>
      </div>
      <button class="go ${ok ? "" : "bad"}" data-next><span class="label">${S.queue.length <= 1 && ok ? "Finish round" : "Continue"}</span><span class="arrow">${ico("arrow", 30)}</span></button>
      ${!ok && q.type === "input" ? `<button class="link" data-override>My answer was right, just written differently</button>` : ""}`;
    const next = fb.querySelector("[data-next]");
    next.onclick = () => nextQuestion();
    next.focus({ preventScroll: true });
    fb.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
    const ov = fb.querySelector("[data-override]");
    if (ov) ov.onclick = () => {
      store.progress[q.id] = S.prevProg; S.combo = S.prevCombo;
      S.missed.delete(q.id);
      S.combo++; S.bestCombo = Math.max(S.bestCombo, S.combo);
      S.firstTry.add(q.id); S.xpGained += 10;
      record(q.id, true, 10);
      updateCombo();
      document.getElementById("ans")?.classList.replace("wrong", "correct");
      showFeedback(true, q, 10);
    };
    S.lastOk = ok;
  }

  function nextQuestion() {
    if (!S || !S.answered || S.finished) return;
    S.answered = false;
    const id = S.queue.shift();
    if (S.mode === "learn") {
      if (S.lastOk) S.done.add(id);
      else S.queue.splice(Math.min(3, S.queue.length), 0, id);
      if (!S.queue.length) return paint(renderLearnResults);
    } else {
      S.idx++;
      if (!S.queue.length) return paint(renderQuizResults);
    }
    paint(renderQuestion);
  }

  // ───────────── RESULTS ─────────────
  function reviewItem(q, ok, given) {
    return `<div class="item ${ok ? "ok" : "no"}">
      <span class="ins">${ico(ok ? "check" : "cross", 22)}</span>
      <div><p class="q">${fmt(q.q)}</p>
        ${given !== undefined ? `<p class="a">You: <b>${esc(given)}</b></p>` : ""}
        <p class="a">Answer: <b>${fmt(correctText(q))}</b></p>
        <p class="e">${fmt(q.exp)}</p></div></div>`;
  }

  function renderLearnResults() {
    S.finished = true;
    const missed = [...S.missed].map((id) => Q_BY_ID[id]);
    const again = S.title === "Fix mistakes" && mistakeIds().length;
    inSession(true, !missed.length);
    app.innerHTML = `${sessionBar(`<span class="meta" style="margin-left:auto">${esc(S.title)} complete</span>`)}
      <div class="wrap ${missed.length ? "rgrid" : ""}">
        <div class="rmain">
        <div class="score">${confettiHTML()}
          <h1>${S.firstTry.size === S.total ? "Clean round. Every answer right first time." : "Round cleared."}</h1>
          <span class="big">${S.firstTry.size}<small>/${S.total}</small></span>
          <p><b>${S.firstTry.size} of ${S.total}</b> right on the first try. ${missed.length ? `${missed.length} needed another go.` : ""}</p>
        </div>
        <div class="facts">
          <div class="f-xp"><span class="ic">${ico("gem", 22)}</span>${flapHTML("+" + S.xpGained)}<small>XP earned</small></div>
          <div class="f-combo"><span class="ic">${ico("bolt", 22)}</span>${flapHTML("×" + S.bestCombo)}<small>Best combo</small></div>
          <div class="f-streak"><span class="ic">${ico("flame", 22)}</span>${flapHTML(liveStreak())}<small>Day streak</small></div>
        </div>
        <div class="actions">
          <button class="go" data-again><span class="label">${again ? "Fix the rest" : "Next round"}</span><span class="arrow">${ico("arrow", 30)}</span></button>
          <div class="btn-row"><button class="btn2" data-home>Home ${ico("chevron", 18)}</button><button class="btn2" data-flash>Flashcards ${ico("chevron", 18)}</button></div>
        </div>
        </div>
        ${missed.length ? `<div class="rside"><section class="section pad"><h2>What you missed</h2></section><div class="review">${missed.map((q) => reviewItem(q, false)).join("")}</div></div>` : ""}
      </div>`;
    app.querySelector("[data-x]").onclick = () => exitSession();
    app.querySelector("[data-again]").onclick = () => (again ? startLearn(mistakeIds(), "Fix mistakes") : startLearn());
    app.querySelector("[data-home]").onclick = () => paint(renderHome);
    app.querySelector("[data-flash]").onclick = () => paint(renderFlashSetup);
    window.scrollTo(0, 0);
  }

  function renderQuizResults() {
    clearInterval(timerId);
    S.finished = true;
    S.elapsed = Math.floor((Date.now() - S.start) / 1000);
    const score = S.order.filter((id) => S.answers[id]?.ok).length;
    const pct = Math.round((score / S.total) * 100);
    const grade = pct >= 90 ? "Excellent. You're ready for this one." : pct >= 75 ? "Strong. A few gaps left." : pct >= 50 ? "Halfway there. Drill the misses." : "Keep drilling. The misses are below.";
    const wrongIds = S.order.filter((id) => !S.answers[id]?.ok);
    inSession(true);
    app.innerHTML = `${sessionBar(`<span class="meta" style="margin-left:auto">Practice test · ${fmtTime(S.elapsed)}</span>`)}
      <div class="wrap rgrid">
        <div class="rmain">
        <div class="score">${pct >= 75 ? confettiHTML() : ""}
          <h1>${grade}</h1>
          <span class="big">${score}<small>/${S.total}</small></span>
          <p><b>${pct}%</b> correct in ${fmtTime(S.elapsed)}.</p>
        </div>
        <div class="actions">
          ${wrongIds.length
            ? `<button class="go" data-fix><span class="label">Learn the ${wrongIds.length} I missed</span><span class="arrow">${ico("arrow", 30)}</span></button>`
            : `<button class="go" data-retake><span class="label">Take another test</span><span class="arrow">${ico("arrow", 30)}</span></button>`}
          <div class="btn-row">${wrongIds.length ? `<button class="btn2" data-retake>New test ${ico("chevron", 18)}</button>` : ""}<button class="btn2" data-home>Home ${ico("chevron", 18)}</button></div>
        </div>
        </div>
        <div class="rside">
        <section class="section pad"><h2>Answer key</h2></section>
        <div class="review">${S.order.map((id) => reviewItem(Q_BY_ID[id], S.answers[id]?.ok, S.answers[id]?.given ?? "(no answer)")).join("")}</div>
        </div>
      </div>`;
    app.querySelector("[data-x]").onclick = () => exitSession();
    app.querySelector("[data-fix]")?.addEventListener("click", () => startLearn(wrongIds, "Fix mistakes"));
    app.querySelectorAll("[data-retake]").forEach((b) => b.onclick = () => paint(renderQuizSetup));
    app.querySelector("[data-home]").onclick = () => paint(renderHome);
    window.scrollTo(0, 0);
  }

  // ───────────── FLASHCARDS ─────────────
  let flashDeck = "concepts";
  function renderFlashSetup() {
    inSession(true, true);
    const nc = activeConcepts().length, nq = activeQs().length;
    app.innerHTML = `${sessionBar(`<span class="meta" style="margin-left:auto">Flashcards</span>`)}
      <div class="wrap">
        <h1 class="page-title">Flashcards</h1>
        <p class="lede">Flip each card, then sort it. Cards you're still learning can be run again at the end.</p>
        <div class="field"><h2 id="dkH">Deck</h2>
          <div class="seg n2" role="group" aria-labelledby="dkH">
            <button data-deck="concepts" aria-pressed="${flashDeck === "concepts"}">Concepts<span>${nc} formulas & definitions</span></button>
            <button data-deck="questions" aria-pressed="${flashDeck === "questions"}">Examples<span>${nq} worked answers</span></button>
          </div>
        </div>
        <button class="go inline" data-go><span class="label">Start deck · ${flashDeck === "concepts" ? nc : nq} cards</span><span class="arrow">${ico("arrow", 30)}</span></button>
      </div>`;
    app.querySelector("[data-x]").onclick = () => exitSession();
    app.querySelectorAll("[data-deck]").forEach((b) => b.onclick = () => { flashDeck = b.dataset.deck; renderFlashSetup(); });
    app.querySelector("[data-go]").onclick = () => {
      const cards = flashDeck === "concepts"
        ? activeConcepts().map((c) => ({ topic: c.topic, front: c.front, back: c.back }))
        : activeQs().map((q) => ({ topic: q.topic, front: q.q, back: correctText(q), extra: q.exp }));
      if (!cards.length) return toast("No cards in the selected lectures");
      startFlash(shuffle(cards));
    };
    window.scrollTo(0, 0);
  }
  function startFlash(cards) {
    S = { mode: "flash", cards, idx: 0, flipped: false, known: [], learning: [], answeredCount: 0 };
    paint(renderFlash);
  }
  function renderFlash() {
    inSession(true, true);
    const c = S.cards[S.idx];
    const cells = S.cards.length <= 40
      ? `<div class="cells" aria-hidden="true">${S.cards.map((_, k) => `<i class="${k < S.idx ? "done" : k === S.idx ? "now" : ""}"></i>`).join("")}</div>`
      : `<div class="cells" aria-hidden="true"><i class="done" style="flex:${S.idx}"></i><i class="now" style="flex:1"></i><i style="flex:${S.cards.length - S.idx - 1}"></i></div>`;
    app.innerHTML = `${sessionBar(`${cells}<span class="meta">${flapHTML(`${S.idx + 1}/${S.cards.length}`)}</span>`)}
      <div class="wrap">
        <div class="deck">
          <button class="card ${S.flipped ? "flipped" : ""}" id="flash" aria-label="Flip card" aria-pressed="${S.flipped}">
            <div class="face front t-${c.topic}"><span class="ftag"><span class="badge">L${lecNum(c.topic)}</span></span>
              <div class="big">${fmt(c.front)}</div><span class="turn">${ico("turn", 16)} Tap to flip</span></div>
            <div class="face back t-${c.topic}"><span class="ftag"><span class="lbl">Answer</span></span>
              <div class="big">${fmt(c.back)}</div>${c.extra ? `<div class="small">${fmt(c.extra)}</div>` : ""}</div>
          </button>
        </div>
        <div class="sort">
          <button class="btn2" data-learning>Still learning ${ico("cross", 20)}</button>
          <button class="go" data-known><span class="label">Got it</span><span class="arrow">${ico("check", 26)}</span></button>
        </div>
        <p class="kbd"><kbd>Space</kbd> flip · <kbd>←</kbd> still learning · <kbd>→</kbd> got it · <kbd>Esc</kbd> leave</p>
      </div>`;
    const flash = document.getElementById("flash");
    requestAnimationFrame(() => {
      const room = window.innerHeight - flash.getBoundingClientRect().top - 120;
      const h = Math.max(...[...flash.querySelectorAll(".face")].map((f) => f.scrollHeight), 300, room);
      flash.style.minHeight = h + "px";
    });
    flash.onclick = flipCard;
    app.querySelector("[data-x]").onclick = () => exitSession();
    app.querySelector("[data-known]").onclick = () => sortCard(true);
    app.querySelector("[data-learning]").onclick = () => sortCard(false);
  }
  function flipCard() {
    S.flipped = !S.flipped;
    const f = document.getElementById("flash");
    f.classList.toggle("flipped", S.flipped); f.setAttribute("aria-pressed", S.flipped);
  }
  function sortCard(known) {
    const c = S.cards[S.idx];
    (known ? S.known : S.learning).push(c);
    S.answeredCount++;
    if (S.answeredCount === 1) touchStreak();
    store.xp += known ? 2 : 1; save(); refreshTop();
    S.idx++; S.flipped = false;
    if (S.idx >= S.cards.length) return paint(renderFlashResults);
    renderFlash();
  }
  function renderFlashResults() {
    S.finished = true;
    inSession(true, true);
    app.innerHTML = `${sessionBar(`<span class="meta" style="margin-left:auto">Deck finished</span>`)}
      <div class="wrap">
        <div class="score">${confettiHTML()}
          <h1>${S.learning.length ? "Deck done. Run the ones still sticking." : "Deck done. Every card known."}</h1>
          <span class="big">${S.known.length}<small>/${S.cards.length}</small></span>
          <p><b>${S.known.length}</b> got it · <b>${S.learning.length}</b> still learning</p>
        </div>
        <div class="actions">
          ${S.learning.length ? `<button class="go" data-again><span class="label">Run ${S.learning.length} still learning</span><span class="arrow">${ico("arrow", 30)}</span></button>` : ""}
          <div class="btn-row"><button class="btn2" data-restart>Restart deck ${ico("chevron", 18)}</button><button class="btn2" data-home>Home ${ico("chevron", 18)}</button></div>
        </div>
      </div>`;
    app.querySelector("[data-x]").onclick = () => exitSession();
    app.querySelector("[data-again]")?.addEventListener("click", () => startFlash(shuffle(S.learning)));
    const all = S.known.concat(S.learning);
    app.querySelector("[data-restart]").onclick = () => startFlash(shuffle(all));
    app.querySelector("[data-home]").onclick = () => paint(renderHome);
    window.scrollTo(0, 0);
  }

  // ───────────── keyboard ─────────────
  document.addEventListener("keydown", (e) => {
    if (!S || e.ctrlKey || e.metaKey || e.altKey) return;
    if ((e.key === " " || e.key === "Enter") && e.target.tagName === "BUTTON") e.target.blur();
    if (e.key === "Escape") { e.preventDefault(); return exitSession(); }
    if (S.finished) return;
    if (S.mode === "flash") {
      if (e.key === " " || e.key === "Enter" || e.key === "ArrowUp" || e.key === "ArrowDown") { e.preventDefault(); flipCard(); }
      else if (e.key === "ArrowRight" || e.key === "2") sortCard(true);
      else if (e.key === "ArrowLeft" || e.key === "1") sortCard(false);
      return;
    }
    const q = Q_BY_ID[S.current];
    if (!q) return;
    if (S.answered) {
      if (S.mode === "learn" && (e.key === "Enter" || (e.key === " " && e.target.tagName !== "INPUT"))) { e.preventDefault(); nextQuestion(); }
      return;
    }
    if (q.type === "input") {
      if (e.key === "Enter") { e.preventDefault(); answerInput(); }
      return;
    }
    const k = parseInt(e.key, 10);
    const letter = "abcd".indexOf(e.key.toLowerCase());
    if (q.type === "mcq") {
      const pos = k >= 1 && k <= 4 ? k - 1 : letter;
      if (pos >= 0 && pos < S.choiceOrder.length) {
        const ci = S.choiceOrder[pos];
        answerMcq(ci, app.querySelector(`[data-ci="${ci}"]`));
      }
    } else if (q.type === "tf" && (k === 1 || k === 2 || /^[tf]$/i.test(e.key))) {
      const val = k === 1 || /^t$/i.test(e.key);
      answerTf(val, app.querySelector(`[data-tf="${val}"]`));
    }
  });

  // ───────────── boot ─────────────
  applyTheme();
  refreshTop();
  renderHome();
})();
