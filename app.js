(function () {
  "use strict";
  var SIMS = B1.SIMS, grade = B1.grade, scorePart = B1.scorePart;
  var KEY = "ro-b1-state-v1";
  var st;
  try { st = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { st = null; }
  if (!st || typeof st !== "object") st = {};
  ["answers", "checked", "writing", "self", "timers", "sub"].forEach(function (k) { if (!st[k] || typeof st[k] !== "object") st[k] = {}; });
  if (!st.tab) st.tab = "home";
  var showT = {}, showModel = {};
  var running = null, tickH = null;

  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function linkify(s) { return esc(s).replace(/(https?:\/\/[^\s<)]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>'); }
  function simById(id) { for (var i = 0; i < SIMS.length; i++) if (SIMS[i].id === id) return SIMS[i]; return null; }
  var PART_LABELS = ["קריאה ודקדוק", "האזנה"];
  var main = document.getElementById("main");

  // ---------- timers ----------
  function tLeft(key, min) { return typeof st.timers[key] === "number" ? st.timers[key] : min * 60; }
  function fmt(s) { var m = Math.floor(s / 60), x = s % 60; return (m < 10 ? "0" : "") + m + ":" + (x < 10 ? "0" : "") + x; }
  function timerHTML(key, min, label) {
    var left = tLeft(key, min), on = running === key;
    return '<div class="timer" data-timer="' + key + '" data-min="' + min + '"><span class="muted">' + esc(label) + " · " + min + ' דק׳</span>' +
      '<span class="clock' + (left === 0 ? " end" : "") + '" id="clk-' + key + '">' + fmt(left) + "</span>" +
      '<button class="btn' + (on ? "" : " primary") + '" data-act="tstart" data-key="' + key + '" data-min="' + min + '">' + (on ? "השהיה" : "התחלה") + "</button>" +
      '<button class="btn" data-act="treset" data-key="' + key + '" data-min="' + min + '">איפוס</button>' +
      (left === 0 ? '<span class="muted" style="color:var(--bad)">הזמן נגמר</span>' : "") + "</div>";
  }
  function stopTimer() { if (tickH) clearInterval(tickH); tickH = null; running = null; }
  function startTimer(key, min) {
    stopTimer(); running = key;
    if (tLeft(key, min) === 0) st.timers[key] = min * 60;
    tickH = setInterval(function () {
      var l = Math.max(0, tLeft(key, min) - 1); st.timers[key] = l; save();
      var el = document.getElementById("clk-" + key); if (el) { el.textContent = fmt(l); if (l === 0) el.classList.add("end"); }
      if (l === 0) { stopTimer(); if (navigator.vibrate) navigator.vibrate(300); render(); }
    }, 1000);
  }

  // ---------- scoring ----------
  function partPts(p) { var sc = scorePart(p, st.answers); return sc.total && st.checked[p.id] ? (sc.got / sc.total) * 25 : 0; }
  function clamp(v) { var n = parseFloat(v); return isNaN(n) ? 0 : Math.max(0, Math.min(25, n)); }
  function selfOf(sim, k) { return (st.self[sim.id] || {})[k] || ""; }
  function totalOf(sim) { return sim.parts.reduce(function (a, p) { return a + partPts(p); }, 0) + clamp(selfOf(sim, "w")) + clamp(selfOf(sim, "s")); }

  // ---------- views ----------
  function homeView() {
    var h = '<div class="card"><h2>מבחן רומנית B1 של מכון ILR</h2><p>מבחנים לדוגמה של מכון השפה הרומנית (Institutul Limbii Române) וסימולציות במבנה הרשמי, עם בדיקה אוטומטית, הסברים בעברית ושעון לכל חלק. ההתקדמות נשמרת במכשיר.</p></div>';
    h += '<div class="card"><h3>ההתקדמות שלי</h3>';
    SIMS.forEach(function (s) {
      var done = s.parts.filter(function (p) { return st.checked[p.id]; }).length, t = totalOf(s);
      h += '<div style="margin:10px 0"><div class="row" style="justify-content:space-between"><span>' + esc(s.name) + '</span><span class="muted">' + done + "/" + s.parts.length + " חלקים נבדקו · " + t.toFixed(1) + "/100</span></div><div class=\"bar\"><i style=\"width:" + Math.min(100, t) + '%"></i></div></div>';
    });
    h += '<div class="row" style="margin-top:8px"><button class="btn primary" data-act="go" data-tab="s1">להתחיל בסימולציה הרשמית</button></div></div>';
    h += '<div class="card"><h3>מבנה המבחן</h3><table><tr><th>חלק</th><th>זמן</th><th>ניקוד</th></tr>' +
      "<tr><td>הבנת הנקרא ודקדוק</td><td>45 דק׳</td><td>25</td></tr><tr><td>כתיבה (2 משימות)</td><td>60 דק׳</td><td>25</td></tr><tr><td>הבנת הנשמע</td><td>כ-20 דק׳</td><td>25</td></tr><tr><td>דיבור (בעל-פה)</td><td>לפי לוח זמנים</td><td>25</td></tr></table>" +
      '<p class="muted" style="margin-top:10px">לפי צו OMECT 4394/2009 הציון הוא מתוך 100, וסף המעבר הוא ציון סופי 6, כלומר 60 נקודות. אין סף מינימום לכל חלק. ברמה B1 החלק הכתוב שווה 75 נקודות והחלק בעל-פה 25. כל עבודה נבדקת בידי שני בודקים.</p></div>';
    h += '<div class="card"><h3>למי זה רלוונטי</h3><p>לפי חוק 14/2025, צאצאים של אזרחים רומנים לשעבר שמגישים בקשה לפי סעיף 10 או 11 לחוק האזרחות 21/1991 צריכים להוכיח רומנית ברמה B1 לפחות, למשל בתעודת ILR. מי שהיה בעצמו אזרח רומני ומי שמלאו לו 65 פטורים. מי שכבר הגיש בקשה יכול להגיש את התעודה עד 14.03.2027 (לפי OUG 16/2026).</p></div>';
    h += '<div class="card"><h3>מה יש כאן</h3><p><span class="badge">רשמי</span> סימולציה 1: מבחן B1 לדוגמה של ILR עם מפתח תשובות רשמי וקישורים לשמע הרשמי.</p><p><span class="badge orig">מקורי</span> תרגול: פריטים שכתבנו בסגנון הרשמי. זה לא מבחן אמיתי.</p><p><span class="badge">רשמי</span> 2019: מבחן שפורסם ממושב בבוקרשט, נובמבר 2019. אין לו מפתח רשמי, והתשובות הן הצעה שלנו.</p></div>';
    h += '<div class="card"><h3>טיפים</h3><ul class="tips"><li>בדקדוק חוזרים אותם נושאים: כינויי מושא (îl, o, îi, le), גניטיב/דאטיב (-ului, -ei, -ilor), מילות קישור (după ce, înainte de, imediat ce) והטיית תנאי (aș fi făcut).</li><li>בכתיבה ענו על כל סעיף ושמרו על מספר המילים. מכתב רשמי פותחים ב-Stimate domn / Stimată doamnă ומסיימים ב-Cu stimă.</li><li>בהאזנה קראו את השאלות לפני ההשמעה.</li><li>לדיבור הכינו מראש הצגה עצמית של דקה: מי אתם, הקשר לרומניה, למה אתם לומדים.</li></ul></div>';
    h += '<div class="card" id="installCard"><h3>התקנה בטלפון</h3><p class="muted">אנדרואיד (Chrome): לחצו על "התקנה" למעלה, או בתפריט ⋮ על "הוספה למסך הבית".<br>אייפון (Safari): לחצו על כפתור השיתוף ואז על "הוספה למסך הבית".<br>אחרי ההתקנה האפליקציה עובדת גם בלי אינטרנט. קובצי השמע הרשמיים נשמעים רק עם חיבור.</p></div>';
    h += '<div class="card links"><h3>מקורות רשמיים</h3>' +
      '<a href="https://www.ilr.ro/category/atestate/sesiuni-de-atestare/" target="_blank" rel="noopener">מבנה המבחן ולוח זמנים<small>ilr.ro</small></a>' +
      '<a href="https://www.ilr.ro/category/atestate/aplicatii-si-nivel-prag/" target="_blank" rel="noopener">מבחנים לדוגמה ומבחן נובמבר 2019<small>ilr.ro</small></a>' +
      '<a href="https://www.ilr.ro/wp-content/uploads/2015/11/OMECT4394_2009-1.pdf" target="_blank" rel="noopener">צו 4394/2009: ניקוד וסף מעבר<small>ilr.ro</small></a>' +
      '<a href="https://cetatenie.just.ro/anunt-important-in-atentia-persoanelor-care-au-depus-sau-urmeaza-sa-depuna-cereri-de-redobandire-a-cetateniei-romane/" target="_blank" rel="noopener">דרישת B1 לאזרחות (חוק 14/2025)<small>cetatenie.just.ro</small></a></div>';
    h += '<p class="muted" style="text-align:center">האפליקציה אינה אתר רשמי של מכון ILR. <button class="btn" data-act="wipe" style="margin-top:8px">איפוס כל ההתקדמות</button></p>';
    return h;
  }

  function exHTML(ex, checked) {
    var h = '<div class="card"><h3>' + esc(ex.title) + '</h3><div class="instr">' + esc(ex.instr) + "</div>";
    if (ex.audio) h += '<p class="muted">🎧 שמע רשמי: <a href="' + esc(ex.audio) + '" target="_blank" rel="noopener">האזנה באתר ILR</a></p>';
    if (ex.passage) h += '<div class="ro">' + esc(ex.passage) + "</div>";
    if (ex.transcript) {
      h += '<button class="btn" data-act="tr" data-id="' + ex.id + '">' + (showT[ex.id] ? "הסתרת התמליל" : "הצגת התמליל") + "</button>";
      if (showT[ex.id]) h += '<div class="ro">' + esc(ex.transcript) + "</div>";
    }
    ex.items.forEach(function (it) {
      var v = st.answers[it.id] || "", g = grade(ex.kind, it, v);
      h += '<div class="q"><div class="qt">' + esc(it.q) + "</div>";
      if (ex.kind === "choice") {
        h += '<div class="opts">';
        it.opts.forEach(function (o, i) {
          var cls = "opt" + (v === o ? " sel" : "");
          if (checked && o === it.ans[0]) cls += " right"; else if (checked && v === o) cls += " wrong";
          h += '<button class="' + cls + '" data-act="pick" data-id="' + it.id + '" data-i="' + i + '"' + (checked ? " disabled" : "") + ">" + esc(o) + "</button>";
        });
        h += "</div>";
      } else if (ex.kind === "fill") {
        h += '<input class="fill" autocomplete="off" autocapitalize="off" spellcheck="false" lang="ro" data-ans="' + it.id + '" value="' + esc(v) + '" placeholder="răspuns…"' + (checked ? " disabled" : "") + ">";
      } else {
        h += '<textarea rows="2" lang="ro" data-ans="' + it.id + '" placeholder="Scrieți aici…">' + esc(v) + "</textarea>";
      }
      if (checked) {
        if (ex.kind === "open") h += '<div class="fb neutral">פתרון מוצע: <span class="ltr">' + esc(it.ans[0]) + "</span><br>" + esc(it.ex) + endMark(it.ex) + "</div>";
        else {
          var good = g === "ok" || g === "okd";
          h += '<div class="fb ' + (good ? "ok" : "bad") + '"><b class="' + (good ? "ok" : "bad") + '">' + (g === "ok" ? "✓ נכון" : g === "okd" ? "✓ נכון (שימו לב לסימנים ă, â, î, ș, ț)" : g === "empty" ? "לא נענה" : "✗ לא נכון") + "</b>" +
            (g !== "ok" ? ' · התשובה: <span class="ltr">' + esc(it.ans[0]) + "</span>" : "") + "<br>" + esc(it.ex) + endMark(it.ex) + "</div>";
        }
      }
      h += "</div>";
    });
    return h + "</div>";
  }

  function partView(sim, p, idx) {
    var checked = !!st.checked[p.id], sc = scorePart(p, st.answers);
    var h = timerHTML(sim.id + "-p" + idx, p.minutes, "שעון לחלק");
    h += '<p class="muted">' + linkify(p.note) + "</p>";
    p.exs.forEach(function (ex) { h += exHTML(ex, checked); });
    h += '<div class="card row">';
    if (!checked) h += '<button class="btn primary" data-act="check" data-id="' + p.id + '">בדיקה וציון</button>';
    else h += '<button class="btn" data-act="retry" data-id="' + p.id + '">ניסיון חוזר</button>';
    if (checked && sc.total) h += '<span class="score">' + sc.got + " מתוך " + sc.total + " נכונות, כלומר " + ((sc.got / sc.total) * 25).toFixed(1) + " מתוך 25</span>";
    if (checked && !sc.total) h += '<span class="muted">החלק הזה פתוח ולא נבדק אוטומטית. השוו את התשובות שלכם לפתרונות המוצעים.</span>';
    return h + "</div>";
  }

  function endMark(t) { return /[A-Za-z\u00C0-\u024F\u00BB\u201D"][.!?)]*$/.test(t) ? "&lrm;" : "&rlm;"; }
  function wc(t) { t = (t || "").trim(); return t ? t.split(/\s+/).length : 0; }
  function writingView(sim) {
    var h = '<p class="muted">60 דקות ו-25 נקודות לשתי המשימות יחד. יש שעון נפרד לכל משימה.</p>';
    sim.writing.forEach(function (t, i) {
      var k = sim.id + "-w" + i, txt = st.writing[k] || "";
      h += '<div class="card"><h3>' + esc(t.title) + '</h3><div class="ro">' + esc(t.prompt) + "</div>" + timerHTML(k, 30, "שעון כתיבה") +
        '<textarea rows="9" lang="ro" data-w="' + k + '" placeholder="Scrieți textul aici…">' + esc(txt) + "</textarea>" +
        '<div class="row" style="margin-top:8px"><span class="muted">מילים: <b id="wc-' + k + '">' + wc(txt) + "</b></span>" +
        '<button class="btn" data-act="model" data-id="' + k + '">' + (showModel[k] ? "הסתרת תשובה לדוגמה" : "תשובה לדוגמה") + "</button></div>";
      if (showModel[k]) h += '<p class="muted" style="margin-top:10px">תשובה לדוגמה שכתבנו, לא רשמית. בדקו אצלכם: מענה לכל חלקי המשימה, פנייה וחתימה, מילות קישור, זמני פועל ומספר מילים.</p><div class="ro">' + esc(t.model) + "</div>";
      h += "</div>";
    });
    return h;
  }
  function speakingView(sim) {
    var h = timerHTML(sim.id + "-sp", 10, "שעון לתרגול דיבור") + '<p class="muted">25 נקודות. תרגלו בקול רם, רצוי עם בן/בת זוג לתרגול, ורק אחר כך פתחו את התשובה לדוגמה.</p>';
    sim.speaking.forEach(function (s, i) {
      var k = sim.id + "-s" + i;
      h += '<div class="card"><h3>' + esc(s.title) + '</h3><div class="ro">' + esc(s.prompt) + '</div><button class="btn" data-act="model" data-id="' + k + '">' + (showModel[k] ? "הסתרת תשובה לדוגמה" : "תשובה לדוגמה") + "</button>";
      if (showModel[k]) h += '<div class="ro">' + esc(s.sample) + "</div>";
      h += "</div>";
    });
    return h;
  }
  function scoreView(sim) {
    var t = totalOf(sim);
    var h = '<div class="card"><h3>ציון משוער</h3><div class="big">' + t.toFixed(1) + ' <span class="muted" style="font-size:18px">/ 100</span></div><div class="bar"><i style="width:' + Math.min(100, t) + '%"></i></div><p class="' + (t >= 60 ? "" : "muted") + '">' + (t >= 60 ? "✓ מעל סף המעבר (60)" : "מתחת לסף המעבר (60)") + "</p></div>";
    h += '<div class="card"><table>';
    sim.parts.forEach(function (p, i) { h += "<tr><td>" + PART_LABELS[i] + "</td><td>" + (st.checked[p.id] ? partPts(p).toFixed(1) + " / 25" : '<span class="muted">עוד לא נבדק</span>') + "</td></tr>"; });
    h += "</table></div>";
    h += '<div class="card"><h3>הערכה עצמית</h3><p class="muted">החלקים האלה נבדקים במבחן בידי בודקים. אחרי שהשוויתם לתשובות לדוגמה, הכניסו הערכה מ-0 עד 25.</p>' +
      '<label class="selfrow"><span>כתיבה</span><input class="fill" type="number" inputmode="decimal" min="0" max="25" data-self="w" value="' + esc(selfOf(sim, "w")) + '"></label>' +
      '<label class="selfrow"><span>דיבור</span><input class="fill" type="number" inputmode="decimal" min="0" max="25" data-self="s" value="' + esc(selfOf(sim, "s")) + '"></label></div>';
    return h;
  }

  function simView(sim) {
    var subs = sim.parts.map(function (p, i) { return { id: "p" + i, label: PART_LABELS[i] }; }).concat([{ id: "w", label: "כתיבה" }, { id: "sp", label: "דיבור" }, { id: "sc", label: "ציון" }]);
    var sub = st.sub[sim.id] || "intro";
    var h = '<div class="seg">' + [{ id: "intro", label: "על הסט" }].concat(subs).map(function (s) { return '<button class="' + (sub === s.id ? "on" : "") + '" data-act="sub" data-id="' + s.id + '">' + s.label + "</button>"; }).join("") + "</div>";
    if (sub === "intro") {
      var orig = sim.id === "s2";
      h += '<div class="card"><span class="badge' + (orig ? " orig" : "") + '">' + esc(sim.badge) + "</span><h2>" + esc(sim.name) + "</h2><p>" + esc(sim.intro) + "</p>" + (sim.source.indexOf("http") === 0 ? '<p class="muted">מקור: ' + linkify(sim.source) + "</p>" : "") +
        '<p class="muted">מה יש בסט: ' + subs.slice(0, -1).map(function (s) { return s.label; }).join(" · ") + '</p><button class="btn primary" data-act="sub" data-id="p0">להתחיל</button></div>';
    } else if (sub.charAt(0) === "p") { var i = +sub.slice(1); h += partView(sim, sim.parts[i], i); }
    else if (sub === "w") h += writingView(sim);
    else if (sub === "sp") h += speakingView(sim);
    else h += scoreView(sim);
    return h;
  }

  function render() {
    var sim = simById(st.tab);
    document.getElementById("title").textContent = sim ? sim.name : "הכנה לרומנית B1";
    main.innerHTML = sim ? simView(sim) : homeView();
    Array.prototype.forEach.call(document.querySelectorAll(".tabbar button"), function (b) { b.classList.toggle("on", b.getAttribute("data-tab") === st.tab); });
  }

  // ---------- events ----------
  document.getElementById("tabbar").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    st.tab = b.getAttribute("data-tab"); save(); render(); window.scrollTo(0, 0);
  });
  main.addEventListener("click", function (e) {
    var b = e.target.closest("[data-act]"); if (!b) return;
    var act = b.getAttribute("data-act"), id = b.getAttribute("data-id"), sim = simById(st.tab), y = window.scrollY, keep = true;
    if (act === "pick") {
      var all = []; sim.parts.forEach(function (p) { p.exs.forEach(function (ex) { ex.items.forEach(function (it) { all.push(it); }); }); });
      var it = all.filter(function (x) { return x.id === id; })[0]; st.answers[id] = it.opts[+b.getAttribute("data-i")];
    } else if (act === "check") { st.checked[id] = true; if (running) stopTimer(); }
    else if (act === "retry") {
      var p = sim.parts.filter(function (x) { return x.id === id; })[0];
      p.exs.forEach(function (ex) { ex.items.forEach(function (it) { delete st.answers[it.id]; }); }); st.checked[id] = false;
    } else if (act === "tr") showT[id] = !showT[id];
    else if (act === "model") showModel[id] = !showModel[id];
    else if (act === "sub") { st.sub[sim.id] = id; keep = false; }
    else if (act === "go") { st.tab = b.getAttribute("data-tab"); keep = false; }
    else if (act === "tstart") { var k = b.getAttribute("data-key"); if (running === k) stopTimer(); else startTimer(k, +b.getAttribute("data-min")); }
    else if (act === "treset") { var k2 = b.getAttribute("data-key"); if (running === k2) stopTimer(); st.timers[k2] = +b.getAttribute("data-min") * 60; }
    else if (act === "wipe") { if (!confirm("למחוק את כל התשובות וההתקדמות?")) return; stopTimer(); st = { answers: {}, checked: {}, writing: {}, self: {}, timers: {}, sub: {}, tab: "home" }; }
    save(); render(); window.scrollTo(0, keep ? y : 0);
  });
  main.addEventListener("input", function (e) {
    var t = e.target;
    if (t.hasAttribute("data-ans")) st.answers[t.getAttribute("data-ans")] = t.value;
    else if (t.hasAttribute("data-w")) { var k = t.getAttribute("data-w"); st.writing[k] = t.value; var c = document.getElementById("wc-" + k); if (c) c.textContent = wc(t.value); }
    else if (t.hasAttribute("data-self")) {
      var sim = simById(st.tab); st.self[sim.id] = st.self[sim.id] || {}; st.self[sim.id][t.getAttribute("data-self")] = t.value; save();
      var big = main.querySelector(".big"); if (big) big.firstChild.nodeValue = totalOf(sim).toFixed(1) + " ";
      return;
    }
    save();
  });
  main.addEventListener("change", function (e) { if (e.target.hasAttribute("data-self")) { var y = window.scrollY; render(); window.scrollTo(0, y); } });

  // ---------- install + SW ----------
  var deferred = null, ib = document.getElementById("installBtn");
  window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); deferred = e; ib.classList.remove("hidden"); });
  ib.addEventListener("click", function () { if (!deferred) return; deferred.prompt(); deferred.userChoice.then(function () { deferred = null; ib.classList.add("hidden"); }); });
  if ("serviceWorker" in navigator) window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });

  render();
  window.__B1_READY = true;
})();
