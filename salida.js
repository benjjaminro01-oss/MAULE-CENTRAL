/* Maule Central CG · salida v1.3.3 */
(function () {
  var $ = function (i) { return document.getElementById(i); };
  var q = location.search, demo = /[?&]demo/.test(q), prev = /[?&]preview/.test(q);
  if (/[?&](demo|mon|preview)/.test(q)) document.documentElement.className = "demo";
  var km = /[?&]chroma(?:=([0-9a-fA-F]{6}))?/.exec(q);   // salida.html?chroma  ·  ?chroma=00B140 (otro verde)
  if (km) { document.documentElement.classList.add("chroma"); document.documentElement.style.setProperty("--key", "#" + (km[1] || "00FF00")); }
  function P(v) { return (v == null || /^PENDIENTE_/i.test(v)) ? "" : String(v); }   // los pendientes nunca salen al aire
  function fit(el, max) {
    el.style.transform = "none"; var w = el.offsetWidth;
    if (w > max) el.style.transform = "scale(" + (max / w) + ")";
  }
  var shown = { gc: null }, tmr, zsig = "", tsig = "";
  var gsig = "";
  function setGC(id, d) {
    var sg = id + JSON.stringify(d); if (sg === gsig) return; gsig = sg;
    $("gn").firstChild.textContent = P(d.l1); $("gc2s").textContent = P(d.l2);
    $("gc2").style.display = P(d.l2) ? "flex" : "none";
    fit($("gn").firstChild, 1500); fit($("gc2s"), 900);
  }
  function render(s) {
    cortina(demo ? { on: {}, data: s.data } : s);
    if (demo) { s = JSON.parse(JSON.stringify(s)); s.on = { gc: null, zocalo: "zocalo", totem: "totem" }; s.data.totem.active = 2; }
    // GC (un solo GC de persona a la vez: el nuevo reemplaza al anterior)
    var g = s.on.gc || null, el = $("gc");
    if (g !== shown.gc) {
      clearTimeout(tmr);
      if (shown.gc && g) { el.classList.remove("on"); tmr = setTimeout(function () { setGC(g, s.data[g]); el.classList.add("on"); }, 700); }
      else if (g) { setGC(g, s.data[g]); el.classList.add("on"); }
      else el.classList.remove("on");
      shown.gc = g;
    } else if (g) setGC(g, s.data[g]);
    // Zócalo
    var z = s.data.zocalo;
    var zs = P(z.tag) + "|" + P(z.apoyo);
    if (zs !== zsig) { zsig = zs; $("zg").textContent = P(z.tag); $("za").textContent = P(z.apoyo);
      $("tagb").style.visibility = P(z.tag) ? "visible" : "hidden"; fit($("za"), 730); fit($("zg"), 290); }
    crawl(z);
    $("zocalo").classList.toggle("on", !!s.on.zocalo);
    // Tótem
    var t = s.data.totem, items = (t.items || []).map(P).filter(Boolean), h = "";
    $("th").textContent = P(t.head) || "TITULARES";
    var a = +t.active || 0;
    items.forEach(function (x, i) {
      h += '<div class="tr' + (a && a === i + 1 ? " sel" : a ? " dim" : "") + '"><b>' + (i + 1) + "</b><span></span></div>";
    });
    var ts = h + "|" + items.join("¦");
    if (ts !== tsig) { tsig = ts; $("tl").innerHTML = h;
      [].forEach.call($("tl").querySelectorAll("span"), function (sp, i) { sp.textContent = items[i]; }); }
    $("totem").classList.toggle("on", !!s.on.totem);
  }
  // Cortina: se reproduce una vez cada vez que cambia su marca de tiempo
  var cv = $("cv"), lastT, ended = true, wasOn = false;
  cv.onended = function () { ended = true; $("cortina").classList.remove("on"); };
  function cortina(s) {
    var c = s.data.cortina, base = c.src || "videos/cortina_programa";
    if (cv.dataset.s !== base) { cv.dataset.s = base;
      cv.innerHTML = '<source src="' + base + '.mp4" type="video/mp4"><source src="' + base + '.webm" type="video/webm">'; cv.load(); }
    var want = !!s.on.cortina;
    if (lastT === undefined) lastT = c.t;                 // al cargar la página no se repite una cortina vieja
    else if (want && c.t !== lastT) { lastT = c.t; ended = false; cv.currentTime = 0; var pr = cv.play(); if (pr && pr.catch) pr.catch(function () {}); }
    if (!want && wasOn) cv.pause();
    wasOn = want;
    $("cortina").classList.toggle("on", want && !ended);
    $("logo").classList.toggle("on", !!s.on.logo);
    var sz = Math.max(20, Math.min(120, +(s.data.logo && s.data.logo.size) || 70));
    document.querySelector("#logo img").style.width = Math.round(380 * sz / 100) + "px";
  }
  // Huincha: los demás titulares corren de derecha a izquierda en bucle continuo
  var csig = "";
  function esc(x) { return String(x).replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }
  function crawl(z) {
    var box = $("zt"), tt = P(z.titular), raw = z.huincha || [], modo = z.modo || "todos";
    var vel = Math.max(40, Math.min(400, +z.vel || 130));
    var others = (Array.isArray(raw) ? raw : Object.values(raw)).map(P).filter(function (x) { return x && x.toLowerCase() !== tt.toLowerCase(); });
    var L = (modo === "solo" ? [tt] : [tt].concat(others)).filter(Boolean);
    var sg = modo + "|" + L.join("|") + "#" + vel;
    if (sg === csig) return; csig = sg;
    box.style.animation = "none"; box.style.transform = "none";
    if (!L.length) { box.innerHTML = ""; return; }
    if (modo === "fijo") { box.innerHTML = "<span>" + esc(tt) + "</span>"; fit(box, 1680); return; }
    var unit = L.map(function (x) { return "<span>" + esc(x) + "</span><i></i>"; }).join("");
    box.innerHTML = unit;
    var w = box.offsetWidth || 1, n = Math.max(1, Math.ceil(1680 / w)), grp = "";
    for (var i = 0; i < n; i++) grp += unit;
    box.innerHTML = grp + grp; var gw = w * n;
    box.style.setProperty("--w", -gw + "px"); box.style.setProperty("--t", (gw / vel) + "s"); box.style.animation = "";
  }
  function clock() {
    $("zk").textContent = new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/Santiago" });
  }
  clock(); setInterval(clock, 5000);
  if (prev) window.addEventListener("message", function (e) { if (e.data && e.data.on) render(e.data); });
  else Store.onChange(render);
  if (/[?&]info/.test(q)) { var vi = document.createElement("div"); vi.textContent = "Salida v" + CFG.version;
    vi.style.cssText = "position:absolute;left:12px;top:8px;padding:4px 10px;background:#000;color:#0f0;font:700 22px Arial;z-index:99"; document.body.appendChild(vi); }
})();
