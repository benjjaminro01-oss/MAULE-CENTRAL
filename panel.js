/* Maule Central CG · panel v1.1.0 */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var esc = function (t) { return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var clone = function (o) { return JSON.parse(JSON.stringify(o)); };
  var G = {
    gc_conductor: { n: "GC Conductora", slot: "gc", f: "p" },
    gc_invitado: { n: "GC Invitado", slot: "gc", f: "p" },
    zocalo: { n: "Zócalo titular", slot: "zocalo", f: "z" },
    totem: { n: "Tótem de titulares", slot: "totem", f: "t" }
  };
  var F = {
    p: [["l1", "Nombre", "i"], ["l2", "Cargo", "i"]],
    z: [["titular", "Titular", "i"], ["tag", "Etiqueta", "i"], ["apoyo", "Texto de apoyo", "i"]],
    t: [["head", "Cabecera", "i"], ["items", "Titulares (uno por línea)", "a"], ["active", "Titular activo (0 = ninguno)", "n"]]
  };
  var N1 = { titular: "FILIT UCM celebra su 20ª edición" }, N2 = { titular: "El auge de los foodtrucks en Talca" };
  function p(t) { return { p: t }; }
  function s(n, t, d, g) { return { n: n, t: t, d: d, g: g || [] }; }
  var S = [p("Parte 1"), s(1, "Cortina de inicio", "7 s"), s(2, "Bienvenida en cámara", "20 s", [["gc_conductor"]]),
    s(3, "Titulares", "20 s", [["totem"]]), s(4, "Presentación nota 1 · FILIT", "10 s", [["zocalo", N1]]),
    s(5, "Cortina", "7 s"), s(6, "Video nota informativa 1", "2:15"), s(7, "Cortina", "7 s"),
    s(8, "Comentarios sobre nota", "2 min", [["zocalo", N1]]), s(9, "Cortina", "7 s"), s(10, "Comerciales", "3 min"),
    p("Parte 2"), s(11, "Cortina", "7 s"), s(12, "Presentación invitado", "25 s", [["gc_invitado"]]),
    s(13, "Conversación en estudio", "10 min"), s(14, "Presentación nota 2 · Foodtrucks", "10 s", [["zocalo", N2]]),
    s(15, "Cortina", "7 s"), s(16, "Video nota informativa 2", "2:15"), s(17, "Cortina", "7 s"),
    s(18, "Comentarios sobre nota", "2 min"), s(19, "Cortina", "7 s"),
    s(20, "Cierre y despedida", "1:30", [["gc_invitado"], ["totem"]]), s(21, "Cortina final", "7 s")];
  var draft = {}, step = -1, cap = -1, edit = false, pv = { on: {}, ov: {} };
  var st = function () { return Store.get(); };
  var cfg = function () { return st().data._cfg; };
  function btns() { var b = cfg().btn; return Array.isArray(b) ? b : Object.values(b || {}); }
  function arr(v) { return Array.isArray(v) ? v : Object.values(v || {}); }

  // ---------- acciones sobre la salida ----------
  function show(x, gid) {
    var sl = G[gid].slot; x.on[sl] = gid;
    if (x.data._cfg.excl) { if (sl === "gc") x.on.zocalo = null; if (sl === "zocalo") x.on.gc = null; }
  }
  function commit(x, gid) { if (draft[gid]) { x.data[gid] = clone(draft[gid]); delete draft[gid]; } }
  function toggle(gid) {
    Store.set(function (x) { commit(x, gid); if (x.on[G[gid].slot] === gid) x.on[G[gid].slot] = null; else show(x, gid); });
    render();
  }
  function take(i) {
    var d = S[i]; if (!d || d.p) return; step = i;
    Store.set(function (x) {
      x.on = { gc: null, zocalo: null, totem: null };
      d.g.forEach(function (g) { delete draft[g[0]]; if (g[1]) Object.assign(x.data[g[0]], g[1]); show(x, g[0]); });
    });
    render();
  }
  function pick(i) {
    var d = S[i]; if (!d || d.p) return; step = i; pv = { on: {}, ov: {} };
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
    $("#sync").textContent = Store.mode === "firebase" ? "● sincronizado (Firebase)" : "● modo local";
  }
  function scale() { $$(".mw").forEach(function (w) { w.firstElementChild.style.transform = "scale(" + (w.clientWidth / 1920) + ")"; }); }
  function pvState() {
    var x = clone(st());
    Object.keys(draft).forEach(function (g) { x.data[g] = draft[g]; });
    Object.keys(pv.ov).forEach(function (g) { Object.assign(x.data[g], pv.ov[g]); });
    x.on = { gc: pv.on.gc || null, zocalo: pv.on.zocalo || null, totem: pv.on.totem || null };
    return x;
  }
  function sendPv() { var f = $("#pvf"); try { f.contentWindow.postMessage(pvState(), "*"); } catch (e) {} }
  function isOn(gid) { return st().on[G[gid].slot] === gid; }
  function cur(gid) { return draft[gid] || st().data[gid]; }

  function renderSteps() {
    $("#steps").innerHTML = S.map(function (d, i) {
      if (d.p) return '<div class="ph">' + d.p + "</div>";
      var gs = d.g.map(function (g) { return G[g[0]].n; }).join(" + ");
      return '<button class="st' + (i === step ? " cur" : "") + '" data-i="' + i + '"><span class="n">' + d.n + "</span><span>" + esc(d.t) +
        "<small>" + d.d + (gs ? " · " + esc(gs) : "") + "</small></span></button>";
    }).join("");
  }
  function renderCards() {
    $("#cards").innerHTML = Object.keys(G).map(function (gid) {
      var g = G[gid], d = cur(gid), pend = false;
      var fs = F[g.f].map(function (f) {
        var v = d[f[0]], k = f[0], bad = false;
        if (f[2] === "a") { v = arr(v).join("\n"); bad = /PENDIENTE_/.test(v); pend = pend || bad;
          return '<label>' + f[1] + '<textarea data-k="' + k + '"' + (bad ? ' class="pf"' : "") + ">" + esc(v) + "</textarea></label>"; }
        bad = /^PENDIENTE_/.test(v || ""); pend = pend || bad;
        if (f[2] === "n") return "<label>" + f[1] + '<select data-k="' + k + '">' + [0, 1, 2, 3, 4, 5, 6].map(function (n) {
          return '<option value="' + n + '"' + (+v === n ? " selected" : "") + ">" + n + "</option>"; }).join("") + "</select></label>";
        return "<label>" + f[1] + '<input type="text" data-k="' + k + '" value="' + esc(v) + '"' + (bad ? ' class="pf"' : "") + "></label>";
      }).join("");
      return '<div class="card' + (isOn(gid) ? " air" : "") + '" data-g="' + gid + '"><h3>' + g.n + '<span class="bd">AL AIRE</span>' +
        (pend ? '<span class="pd">PENDIENTE</span>' : "") + "</h3>" + fs +
        '<div class="bt"><button class="go" data-a="show">MOSTRAR</button><button class="red" data-a="hide">OCULTAR</button><button data-a="upd">ACTUALIZAR</button><button data-a="pv">VISTA PREVIA</button></div></div>';
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
    draft[g][k] = k === "items" ? e.target.value.split("\n").map(function (x) { return x.trim(); }).filter(Boolean)
      : k === "active" ? +e.target.value : e.target.value;
    pv = { on: (function (o) { o[G[g].slot] = g; return o; })({}), ov: {} }; sendPv();
  });
  $("#cards").addEventListener("click", function (e) {
    var b = e.target.closest("button"), c = e.target.closest(".card"); if (!b || !c) return;
    var g = c.dataset.g, a = b.dataset.a;
    if (a === "show") { Store.set(function (x) { commit(x, g); show(x, g); }); }
    if (a === "hide") { Store.set(function (x) { if (x.on[G[g].slot] === g) x.on[G[g].slot] = null; }); }
    if (a === "upd") { Store.set(function (x) { commit(x, g); }); }
    if (a === "pv") { pv = { on: (function (o) { o[G[g].slot] = g; return o; })({}), ov: {} }; }
    if (document.activeElement) document.activeElement.blur(); render();
  });
  $("#cards").addEventListener("change", function (e) { if (e.target.dataset.k === "active") { var g = e.target.closest(".card").dataset.g;
    if (isOn(g)) { Store.set(function (x) { commit(x, g); }); } } });
  $("#steps").addEventListener("click", function (e) { var b = e.target.closest(".st"); if (b) pick(+b.dataset.i); });
  $("#prv").onclick = function () { move(-1); }; $("#nxt").onclick = function () { move(1); };
  $("#tk").onclick = function () { take(step); };
  $("#clr").onclick = function () { Store.set(function (x) { x.on = { gc: null, zocalo: null, totem: null }; }); render(); };
  $("#tabs").addEventListener("click", function (e) { var v = e.target.dataset.v; if (v) { localStorage.mc_view = v; render(); setTimeout(scale, 30); } });
  function setBtn(fn) { Store.set(function (x) { var L = arr(x.data._cfg.btn).slice(); fn(L); x.data._cfg.btn = L; }); }
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
