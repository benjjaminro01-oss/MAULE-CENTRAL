/* Maule Central CG · salida v1.2.0 */
(function () {
  var $ = function (i) { return document.getElementById(i); };
  var q = location.search, demo = /[?&]demo/.test(q), prev = /[?&]preview/.test(q);
  if (/[?&](demo|mon|preview)/.test(q)) document.documentElement.className = "demo";
  function P(v) { return (v == null || /^PENDIENTE_/i.test(v)) ? "" : String(v); }   // los pendientes nunca salen al aire
  function fit(el, max) {
    el.style.transform = "none"; var w = el.offsetWidth;
    if (w > max) el.style.transform = "scale(" + (max / w) + ")";
  }
  var shown = { gc: null }, tmr;
  function setGC(id, d) {
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
    $("zt").textContent = P(z.titular); $("zg").textContent = P(z.tag); $("za").textContent = P(z.apoyo);
    $("tagb").style.visibility = P(z.tag) ? "visible" : "hidden";
    fit($("zt"), 1680); fit($("za"), 730); fit($("zg"), 290);
    $("zocalo").classList.toggle("on", !!s.on.zocalo);
    // Tótem
    var t = s.data.totem, items = (t.items || []).map(P).filter(Boolean), h = "";
    $("th").textContent = P(t.head) || "TITULARES";
    var a = +t.active || 0;
    items.forEach(function (x, i) {
      h += '<div class="tr' + (a && a === i + 1 ? " sel" : a ? " dim" : "") + '"><b>' + (i + 1) + "</b><span></span></div>";
    });
    $("tl").innerHTML = h;
    [].forEach.call($("tl").querySelectorAll("span"), function (sp, i) { sp.textContent = items[i]; });
    $("totem").classList.toggle("on", !!s.on.totem);
  }
  // Cortina: se reproduce una vez cada vez que cambia su marca de tiempo
  var cv = $("cv"), lastT, ended = true, wasOn = false;
  cv.onended = function () { ended = true; $("cortina").classList.remove("on"); };
  function cortina(s) {
    var c = s.data.cortina, base = c.src || "videos/cortina_programa";
    if (cv.dataset.s !== base) { cv.dataset.s = base;
      cv.innerHTML = '<source src="' + base + '.webm" type="video/webm"><source src="' + base + '.mp4" type="video/mp4">'; cv.load(); }
    var want = !!s.on.cortina;
    if (lastT === undefined) lastT = c.t;                 // al cargar la página no se repite una cortina vieja
    else if (want && c.t !== lastT) { lastT = c.t; ended = false; cv.currentTime = 0; var pr = cv.play(); if (pr && pr.catch) pr.catch(function () {}); }
    if (!want && wasOn) cv.pause();
    wasOn = want;
    $("cortina").classList.toggle("on", want && !ended);
    $("logo").classList.toggle("on", !!s.on.logo);
  }
  function clock() {
    $("zk").textContent = new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/Santiago" });
  }
  clock(); setInterval(clock, 5000);
  if (prev) window.addEventListener("message", function (e) { if (e.data && e.data.on) render(e.data); });
  else Store.onChange(render);
})();
