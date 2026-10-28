/* Maule Central CG · panel v1.3.8 */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var esc = function (t) { return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var clone = function (o) { return JSON.parse(JSON.stringify(o)); };
  var G = {
    gc_conductor: { n: "GC Conductora", slot: "gc", f: "p" },
    gc_invitado: { n: "GC Invitado", slot: "gc", f: "p" },
    zocalo: { n: "Zócalo titular", slot: "zocalo", f: "z" },
    totem: { n: "Tótem de titulares", slot: "totem", f: "t" },
    cortina: { n: "Cortina del programa", slot: "cortina", f: "c", h: "Video: videos/cortina_programa. Se reproduce una vez y sale sola." },
    logo: { n: "Logo esquina", slot: "logo", f: "l", h: "Arriba a la derecha. Queda fijo: Limpiar salida y los pasos no lo tocan." }
  };
  var F = {
    p: [["l1", "Nombre", "i"], ["l2", "Cargo", "i"]],
    z: [["titular", "Titular", "i"], ["tag", "Etiqueta", "i"], ["apoyo", "Redes sociales (@ del programa)", "i"], ["huincha", "Demás titulares (corren después del principal; uno por línea)", "a"], ["modo", "Animación del titular", "s", [["todos", "Corre titular + demás titulares"], ["solo", "Corre solo el titular"], ["fijo", "Fijo (no corre)"]]], ["vel", "Velocidad del titular (px/s)", "r", 40, 400, 10, 130]],
    c: [], l: [["size", "Tamaño del logo (%)", "r", 20, 120, 5, 70]], t: [["head", "Cabecera", "i"], ["items", "Titulares (uno por línea)", "a"], ["active", "Titular activo (0 = ninguno)", "n"]]
  };
  var N1 = { titular: "FILIT UCM celebra su 20ª edición" }, N2 = { titular: "El auge de los foodtrucks en Talca" };
  function p(t) { return { p: t }; }
  function s(n, t, d, g, x) { x = x || {}; x.n = n; x.t = t; x.d = d; x.g = g || []; return x; }
  var CO = { so: "Cortina musical (1) institucional «Maule Central»", im: "VTR intro del programa. Gráfica del noticiero", gu: "—" };
  function C(n, r, tt) { return s(n, tt || "Cortina", "7 s", [["cortina"]], { r: r || "VTR cortina y Música 1", so: CO.so, im: CO.im, gu: CO.gu }); }
  function T(n, t, ti) { return s(n, t, "", [["zocalo", { titular: ti }]], { sub: 1 }); }
  var S = [p("Parte 1"),
    C(1, "VTR cortina y Música 1 comienza", "Cortina de inicio"),
    s(2, "Bienvenida en cámara", "20 s", [["gc_conductor"]], { r: "PG estudio · comienza Música 2", so: "Cortina Música (2) · micrófono conductor ON", im: "PG en estudio, conductor al centro. GC con nombre y cargo", gu: "«Muy buenas tardes a toda la Región. Bienvenidos a una nueva edición de Maule Central…»" }),
    s(3, "Titulares", "20 s", [["totem"]], { r: "DÚPLEX · Música 2", so: "Cortina Música (2) · micrófono conductor", im: "DÚPLEX: conductor a la izquierda, recuadro a la derecha. GC titulares y VTR imágenes de apoyo (pendiente)", gu: "«Para empezar la FILIT celebra su vigésima edición…»" }),
    s(4, "Presentación nota 1 · FILIT", "10 s", [["zocalo", N1]], { r: "GC · audio nota · Música 2", so: "Audio nota informativa · micrófono conductor", im: "Conductor de frente. GC «FILIT UCM celebra su 20ª edición»", gu: "«Comenzamos con una de las más importantes tradiciones de la ciudad de Talca…»" }),
    C(5), s(6, "Video nota informativa 1", "2:15", [], { r: "VTR 1 · audio nota", im: "VTR nº 1 (archivo de video pendiente)" }),
    C(7, "VTR cortina y Música 1 comienza"),
    s(8, "Comentarios sobre nota", "2 min", [["zocalo", N1]], { r: "PM conductor · Música 1", so: "Cortina de retorno Música (2) · micrófono conductor e invitado", im: "PG estudio, conductor en el set. GC «FILIT UCM celebra su 20ª edición»", gu: "«Sin duda, la lectura nos abre las puertas a nuevas historias… Hacemos ahora una breve pausa comercial.»" }),
    C(9), s(10, "Comerciales", "3 min", [], { r: "Tanda de VTR de marcas", so: "Cortina Música (1) · audio comerciales", im: "Tanda VTR (marcas pendientes)" }),
    p("Parte 2"),
    C(11, "VTR cortina y Música 1 comienza"),
    s(12, "Presentación invitado", "25 s", [["gc_invitado"]], { r: "GC nombre invitado · Música 2", so: "Cortina de retorno (1)", im: "PG estudio, conductor junto al invitado. PM ambos. GC nombre del invitado, Analista Regional", gu: "«Ya estamos de regreso. Como les prometimos, hoy nos acompaña nuestro analista regional…»" }),
    s(13, "Conversación en estudio", "10 min", [], { r: "DÚPLEX · Música 2", so: "Música de fondo (2) · micrófono conductor e invitado", im: "DÚPLEX. PM conductor e invitado", gu: "Tres temas: El Niño, rebaja del TAG y BTS en el Estadio Nacional" }),
    T("13.1", "Tema 1 · El Niño", "Posibles efectos del fenómeno de El Niño"),
    T("13.2", "Tema 2 · Rebaja del TAG", "Rebaja de hasta 25% en las tarifas del TAG"),
    T("13.3", "Tema 3 · BTS", "BTS llega al Estadio Nacional"),
    s(14, "Presentación nota 2 · Foodtrucks", "10 s", [["zocalo", N2]], { r: "GC · audio nota", so: "Audio nota informativa", im: "PM conductor. GC de la nota", gu: "«Y dejando de lado estos temas, ahora nos trasladamos hasta las calles de Talca…»" }),
    C(15), s(16, "Video nota informativa 2", "2:15", [], { r: "VTR 2 · audio nota", im: "VTR nº 2 (archivo de video pendiente)" }),
    C(17), s(18, "Comentarios sobre nota", "2 min", [], { r: "Música 1", so: "Música de fondo (2) · micrófono conductor e invitado", im: "PG estudio, conductor junto al invitado. PM a cada uno", gu: "«Sin duda, los foodtrucks son una alternativa interesante para comer y emprender.»" }),
    C(19), s(20, "Cierre y despedida", "1:30", [["gc_invitado"], ["totem"]], { r: "GC · Música 1", so: "Cortina Música fondo (1) · micrófono conductor e invitado", im: "PG estudio con el invitado. PM a cada uno. GC nombre del invitado; resumen de titulares", gu: "«Y bueno, así vamos llegando al final de nuestra edición de hoy…»" }),
    C(21, "VTR cortina y Música 1", "Cortina final")];
  function sec(d) { var m; if ((m = /^(\d+):(\d+)$/.exec(d))) return m[1] * 60 + +m[2]; if ((m = /(\d+) min/.exec(d))) return m[1] * 60; if ((m = /(\d+) s/.exec(d))) return +m[1]; return 0; }
  function fmt(n) { return Math.floor(n / 60) + ":" + ("0" + (n % 60)).slice(-2); }
  (function () { var acc = 0, hd = null; S.forEach(function (x) {
    if (x.p) { hd = x; hd.tot = 0; } else if (!x.sub) { var q = sec(x.d); acc += q; x.a = acc; hd.tot += q; } }); S.total = acc; })();
  var draft = {}, step = -1, cap = -1, edit = false, pv = { on: {}, ov: {} };
  var st = function () { return Store.get(); };
  var cfg = function () { return st().data._cfg; };
  var OFF = function (sl) { return sl === "logo" ? "" : null; };   // Firebase borra los null: el logo apagado se guarda como ""
  var DEF = { cortina: { gid: "cortina", key: "F18", label: "Cortina programa", color: "#C8102E" }, logo: { gid: "logo", key: "F22", label: "Logo esquina", color: "#1B2A49" } };
  function btns() { var b = cfg().btn, L = Array.isArray(b) ? b.slice() : Object.values(b || {});
    if (!(cfg().mig >= 2)) ["cortina", "logo"].forEach(function (g) { if (!L.some(function (x) { return x.gid === g; })) L.push(clone(DEF[g])); });
    return L; }
  function arr(v) { return Array.isArray(v) ? v : Object.values(v || {}); }

  // ---------- acciones sobre la salida ----------
  function show(x, gid) {
    var sl = G[gid].slot; x.on[sl] = gid; if (gid === "cortina") x.data.cortina.t = Date.now();
    if (x.data._cfg.excl) { if (sl === "gc") x.on.zocalo = null; if (sl === "zocalo") x.on.gc = null; }
  }
  function commit(x, gid) { if (draft[gid]) { x.data[gid] = clone(draft[gid]); delete draft[gid]; } }
  function toggle(gid) {
    Store.set(function (x) { commit(x, gid); if (x.on[G[gid].slot] === gid) x.on[G[gid].slot] = OFF(G[gid].slot); else show(x, gid); });
    sched(); render();
  }
  function sched() {   // la cortina sale sola al terminar el video
    var c = st().data.cortina, t = c.t; if (!st().on.cortina) return;
    setTimeout(function () { var y = st(); if (y.on.cortina && y.data.cortina.t === t) Store.set(function (x) { x.on.cortina = null; }); render(); }, ((c.dur || 5) + 0.4) * 1000);
  }
  function take(i) {
    var d = S[i]; if (!d || d.p) return; step = i;
    Store.set(function (x) {
      x.on.gc = x.on.zocalo = x.on.totem = x.on.cortina = null;
      d.g.forEach(function (g) { delete draft[g[0]]; if (g[1]) Object.assign(x.data[g[0]], g[1]); show(x, g[0]); });
    });
    sched(); render();
  }
  function pick(i) {
    var d = S[i]; if (!d || d.p) return; step = i; pv = { on: {}, ov: {}, t: Date.now() };
    d.g.forEach(function (g) { pv.on[G[g[0]].slot] = g[0]; if (g[1]) pv.ov[g[0]] = g[1]; });
    render();
  }
  function move(dir) { var i = step + dir; while (S[i] && S[i].p) i += dir; if (S[i]) pick(i); }

  // ---------- vista ----------
  function dev() { var m = localStorage.mc_dev || "auto"; if (m !== "auto") return m;
    return (matchMedia("(pointer:coarse)").matches && innerWidth < 1100) || innerWidth < 700 ? "btn" : "full"; }
  function view() { return dev() === "btn" ? "botonera" : (localStorage.mc_view || "control"); }
  function paint() {
    var v = view(); document.body.dataset.view = v;
    $("#tabs").style.display = dev() === "btn" ? "none" : "flex";
    $$("#tabs [data-v]").forEach(function (b) { b.classList.toggle("act", b.dataset.v === v); });
    $("#sync").textContent = Store.mode === "firebase" ? "● sincronizado (Firebase)" : "● modo local"; $("#sync").textContent += " · v" + CFG.version;
  }
  function scale() { $$(".mw").forEach(function (w) { w.firstElementChild.style.transform = "scale(" + (w.clientWidth / 1920) + ")"; }); }
  function pvState() {
    var x = clone(st());
    Object.keys(draft).forEach(function (g) { x.data[g] = draft[g]; });
    Object.keys(pv.ov).forEach(function (g) { Object.assign(x.data[g], pv.ov[g]); });
    x.data.cortina.t = pv.t || 0;
    x.on = { gc: pv.on.gc || null, zocalo: pv.on.zocalo || null, totem: pv.on.totem || null, cortina: pv.on.cortina || null, logo: st().on.logo };
    return x;
  }
  function sendPv() { var f = $("#pvf"); try { f.contentWindow.postMessage(pvState(), "*"); } catch (e) {} }
  function isOn(gid) { return st().on[G[gid].slot] === gid; }
  function cur(gid) { return draft[gid] || st().data[gid]; }

  function renderSteps() {
    var cur = S[step], det = "";
    if (cur && !cur.p) {
      var gs = cur.g.map(function (g) { return G[g[0]].n; }).join(" + ") || "sin gráficas";
      det = '<div class="det"><div><b>' + esc(cur.n + " · " + cur.t) + "</b> · " + (cur.d || "") + "</div>" +
        [["Gráficas", gs], ["Recursos", cur.r], ["Sonido", cur.so], ["Imagen", cur.im], ["Guion", cur.gu]].filter(function (r) { return r[1]; })
        .map(function (r) { return "<div><b>" + r[0] + ":</b> " + esc(r[1]) + "</div>"; }).join("") + "</div>";
    }
    $("#steps").innerHTML = det + S.map(function (d, i) {
      if (d.p) return '<div class="ph">' + d.p + " · " + fmt(d.tot) + "</div>";
      var gs = d.g.map(function (g) { return G[g[0]].n; }).join(" + ");
      return '<button class="st' + (d.sub ? " sub" : "") + (i === step ? " cur" : "") + '" data-i="' + i + '"><span class="n">' + d.n + "</span><span>" + esc(d.t) +
        "<small>" + (d.d || "") + (d.a ? " · acum. " + fmt(d.a) : "") + (gs ? " · " + esc(gs) : "") + "</small></span></button>";
    }).join("") + '<div class="ph">Total ' + fmt(S.total) + " de 26:00 máx.</div>";
  }
  function renderCards() {
    $("#cards").innerHTML = Object.keys(G).map(function (gid) {
      var g = G[gid], d = cur(gid), pend = false;
      var fs = F[g.f].map(function (f) {
        var v = d[f[0]], k = f[0], bad = false;
        if (f[2] === "a") { v = arr(v).join("\n"); bad = /PENDIENTE_/.test(v); pend = pend || bad;
          return '<label>' + f[1] + '<textarea data-k="' + k + '"' + (bad ? ' class="pf"' : "") + ">" + esc(v) + "</textarea></label>"; }
        if (f[2] === "s") return "<label>" + f[1] + '<select data-k="' + k + '">' + f[3].map(function (o) {
          return '<option value="' + o[0] + '"' + ((v || f[3][0][0]) === o[0] ? " selected" : "") + ">" + o[1] + "</option>"; }).join("") + "</select></label>";
        if (f[2] === "r") return "<label>" + f[1] + " <output>" + (v || f[6]) + '</output><input type="range" min="' + f[3] + '" max="' + f[4] + '" step="' + f[5] + '" data-k="' + k + '" value="' + (v || f[6]) + '"></label>';
        bad = /^PENDIENTE_/.test(v || ""); pend = pend || bad;
        if (f[2] === "n") return "<label>" + f[1] + '<select data-k="' + k + '">' + [0, 1, 2, 3, 4, 5, 6].map(function (n) {
          return '<option value="' + n + '"' + (+v === n ? " selected" : "") + ">" + n + "</option>"; }).join("") + "</select></label>";
        return "<label>" + f[1] + '<input type="text" data-k="' + k + '" value="' + esc(v) + '"' + (bad ? ' class="pf"' : "") + "></label>";
      }).join("");
      return '<div class="card' + (isOn(gid) ? " air" : "") + '" data-g="' + gid + '"><h3>' + g.n + '<span class="bd">AL AIRE</span>' +
        (pend ? '<span class="pd">PENDIENTE</span>' : "") + "</h3>" + fs +
        '<div class="bt">' + (g.h ? '<p class="mut" style="flex:1 1 100%;margin:0">' + g.h + "</p>" : "") + '<button class="go" data-a="show">MOSTRAR</button><button class="red" data-a="hide">OCULTAR</button><button data-a="upd">ACTUALIZAR</button><button data-a="pv">VISTA PREVIA</button></div></div>';
    }).join("");
  }
  function renderBot() {
    var L = btns(), h = '<div id="bar"><button data-b="edit">' + (edit ? "Listo" : "Editar botones") + "</button>" +
      (edit ? '<button class="go" data-b="add">+ Botón</button>' : "") + "</div>";
    h += L.map(function (b, i) {
      var on = G[b.gid] && isOn(b.gid), e = "";
      if (edit) e = '<div class="ed"><select data-e="gid" class="w2">' + Object.keys(G).map(function (g) {
        return '<option value="' + g + '"' + (g === b.gid ? " selected" : "") + ">" + G[g].n + "</option>"; }).join("") + "</select>" +
        '<input type="text" class="w2" data-e="label" value="' + esc(b.label) + '" aria-label="Texto">' +
        '<input type="color" data-e="color" value="' + esc(b.color) + '" aria-label="Color">' +
        '<button data-b="key">' + (cap === i ? "Pulsa tecla…" : "Tecla: " + esc(b.key || "—")) + "</button>" +
        '<button data-b="l">◀</button><button data-b="r">▶</button><button class="red w2" data-b="del">Quitar</button></div>';
      return '<div class="bw" data-i="' + i + '"><button class="bb' + (on ? " on" : "") + '" style="--c:' + esc(b.color) + '" data-b="tap">' +
        esc(b.label) + "<small>" + (on ? "AL AIRE · " : "") + esc(b.key || "") + "</small></button>" + e + "</div>";
    }).join("");
    $("#bot").innerHTML = h;
  }
  function status() {
    $$(".card").forEach(function (c) { c.classList.toggle("air", isOn(c.dataset.g)); });
    renderBot(); renderSteps();
  }
  function render() {
    paint();
    var a = document.activeElement;
    if (a && /INPUT|TEXTAREA|SELECT/.test(a.tagName) && $("#cards").contains(a)) { status(); }
    else if (a && a.dataset && a.dataset.e && $("#bot").contains(a)) { /* editando un botón */ }
    else { renderCards(); renderBot(); renderSteps(); }
    sendPv(); scale();
  }

  // ---------- eventos ----------
  $("#cards").addEventListener("input", function (e) {
    var c = e.target.closest(".card"), k = e.target.dataset.k; if (!c || !k) return;
    var g = c.dataset.g; draft[g] = draft[g] || clone(st().data[g]);
    draft[g][k] = (k === "items" || k === "huincha") ? e.target.value.split("\n").map(function (x) { return x.trim(); }).filter(Boolean)
      : (k === "active" || k === "size" || k === "vel") ? +e.target.value : e.target.value;
    if (k === "size" || k === "vel") e.target.parentNode.querySelector("output").textContent = e.target.value;
    pv = { on: (function (o) { o[G[g].slot] = g; return o; })({}), ov: {} }; sendPv();
  });
  $("#cards").addEventListener("click", function (e) {
    var b = e.target.closest("button"), c = e.target.closest(".card"); if (!b || !c) return;
    var g = c.dataset.g, a = b.dataset.a;
    if (a === "show") { Store.set(function (x) { commit(x, g); show(x, g); }); sched(); }
    if (a === "hide") { Store.set(function (x) { if (x.on[G[g].slot] === g) x.on[G[g].slot] = OFF(G[g].slot); }); }
    if (a === "upd") { Store.set(function (x) { commit(x, g); }); }
    if (a === "pv") { pv = { on: (function (o) { o[G[g].slot] = g; return o; })({}), ov: {}, t: Date.now() }; }
    if (document.activeElement) document.activeElement.blur(); render();
  });
  $("#cards").addEventListener("change", function (e) { var k = e.target.dataset.k, g = e.target.closest(".card").dataset.g;
    if ((k === "size" && g === "logo") || ((k === "active" || k === "vel" || k === "modo") && isOn(g))) { Store.set(function (x) { commit(x, g); }); } });
  $("#steps").addEventListener("click", function (e) { var b = e.target.closest(".st"); if (b) pick(+b.dataset.i); });
  $("#prv").onclick = function () { move(-1); }; $("#nxt").onclick = function () { move(1); };
  $("#tk").onclick = function () { take(step); };
  $("#clr").onclick = function () { Store.set(function (x) { x.on.gc = x.on.zocalo = x.on.totem = x.on.cortina = null; }); render(); };
  $("#tabs").addEventListener("click", function (e) { var v = e.target.dataset.v; if (v) { localStorage.mc_view = v; render(); setTimeout(scale, 30); } });
  function setBtn(fn) { Store.set(function (x) { var L = btns(); fn(L); x.data._cfg.btn = L; x.data._cfg.mig = 2; }); }
  $("#bot").addEventListener("click", function (e) {
    var b = e.target.closest("button"), w = e.target.closest(".bw"); if (!b) return;
    var a = b.dataset.b, i = w ? +w.dataset.i : -1;
    if (a === "edit") { edit = !edit; cap = -1; }
    else if (a === "add") setBtn(function (L) { L.push({ gid: "gc_conductor", key: "", label: "Nuevo botón", color: "#1B2A49" }); });
    else if (a === "tap") { var gid = btns()[i].gid; if (G[gid]) { toggle(gid); return; } }
    else if (a === "key") cap = cap === i ? -1 : i;
    else if (a === "del") setBtn(function (L) { L.splice(i, 1); });
    else if (a === "l" && i > 0) setBtn(function (L) { L.splice(i - 1, 0, L.splice(i, 1)[0]); });
    else if (a === "r") setBtn(function (L) { if (i < L.length - 1) L.splice(i + 1, 0, L.splice(i, 1)[0]); });
    render();
  });
  $("#bot").addEventListener("change", function (e) {
    var k = e.target.dataset.e, w = e.target.closest(".bw"); if (!k || !w) return;
    setBtn(function (L) { L[+w.dataset.i][k] = e.target.value; }); render();
  });
  document.addEventListener("keydown", function (e) {
    var t = e.target.tagName, typing = /INPUT|TEXTAREA|SELECT/.test(t);
    if (cap >= 0) { e.preventDefault(); var i = cap; cap = -1;
      if (e.key !== "Escape") setBtn(function (L) { L[i].key = e.key; }); render(); return; }
    if (e.key === "PageDown" || e.key === "PageUp") { e.preventDefault(); move(e.key === "PageDown" ? 1 : -1); return; }
    if (e.key === "Enter" && !typing && t !== "BUTTON" && step >= 0) { take(step); return; }
    var b = btns().filter(function (x) { return x.key && x.key === e.key; })[0];
    if (b && G[b.gid] && (!typing || /^F\d+$/.test(e.key))) { e.preventDefault(); toggle(b.gid); }
  });
  $("#cfgb").onclick = function () { $("#dev").value = localStorage.mc_dev || "auto"; $("#excl").checked = !!cfg().excl;
    $("#info").textContent = "Sala: " + CFG.sala + " · " + (Store.mode === "firebase" ? "Firebase" : "modo local") + " · v" + CFG.version; $("#dlg").showModal(); };
  $("#dev").onchange = function () { localStorage.mc_dev = this.value; render(); };
  $("#excl").onchange = function () { var v = this.checked ? 1 : 0; Store.set(function (x) { x.data._cfg.excl = v; }); };
  $("#dok").onclick = function () { $("#dlg").close(); };
  addEventListener("resize", function () { render(); });
  $("#pvf").addEventListener("load", sendPv);
  Store.onChange(render);
})();
