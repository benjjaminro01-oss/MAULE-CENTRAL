/* Maule Central CG · core v1.2.0 · estado compartido (local o Firebase) */
(function () {
  var C = window.CFG, K = "mc_state_" + C.sala, subs = [], st = null;
  var fb = C.databaseURL && !/^PENDIENTE_/.test(C.databaseURL);
  var url = fb ? C.databaseURL.replace(/\/$/, "") + "/salas/" + C.sala + ".json" : "";
  var bc = window.BroadcastChannel ? new BroadcastChannel(K) : null;
  function D() { return JSON.parse(JSON.stringify(C.defaults)); }
  function norm(x) {
    var d = D(); x = x || {}; x.on = Object.assign(d.on, x.on || {});
    x.data = x.data || {};
    Object.keys(d.data).forEach(function (k) { x.data[k] = Object.assign(d.data[k], x.data[k] || {}); });
    var it = x.data.totem.items; if (it && !Array.isArray(it)) x.data.totem.items = Object.values(it);
    return x;
  }
  function emit() { subs.forEach(function (f) { f(st); }); }
  function local() { try { return JSON.parse(localStorage.getItem(K)); } catch (e) { return null; } }
  function pull() {
    fetch(url).then(function (r) { return r.json(); }).then(function (j) { st = norm(j); emit(); }).catch(function () {});
  }
  window.Store = {
    mode: fb ? "firebase" : "local",
    get: function () { return st; },
    onChange: function (f) { subs.push(f); if (st) f(st); },
    set: function (fn) {
      var n = JSON.parse(JSON.stringify(st)); fn(n); n.v = (n.v || 0) + 1; st = n; emit();
      try { localStorage.setItem(K, JSON.stringify(n)); } catch (e) {}
      if (bc) bc.postMessage(n);
      if (fb) fetch(url, { method: "PUT", body: JSON.stringify(n) }).catch(function () {});
    }
  };
  st = norm(local());
  if (bc) bc.onmessage = function (e) { st = norm(e.data); emit(); };
  window.addEventListener("storage", function (e) { if (e.key === K) { st = norm(local()); emit(); } });
  if (fb) {
    pull();
    var es = new EventSource(url);
    es.addEventListener("put", pull); es.addEventListener("patch", pull);
  }
})();
