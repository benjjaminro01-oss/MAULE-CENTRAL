/* Maule Central CG · config v1.1.0 */
window.CFG = {
  version: "1.1.0",
  sala: "maule-central",
  /* Pega aquí la URL de tu Realtime Database (es pública, no es una clave). Mientras diga PENDIENTE_ usa modo local. */
  databaseURL: "https://maule-central-default-rtdb.firebaseio.com",
  defaults: {
    on: { gc: null, zocalo: null, totem: null },
    data: {
      gc_conductor: { l1: "Francisca Azócar", l2: "Conductora" },
      gc_invitado:  { l1: "Carlos Peña", l2: "Analista regional" },
      zocalo: { titular: "FILIT UCM celebra su 20ª edición", tag: "ÚLTIMAS NOTICIAS", apoyo: "PENDIENTE_TEXTO_APOYO" },
      _cfg: { excl: 1, btn: [
        { gid: "gc_conductor", key: "F13", label: "GC Conductora", color: "#1B2A49" },
        { gid: "gc_invitado",  key: "F14", label: "GC Invitado",   color: "#1B2A49" },
        { gid: "zocalo",       key: "F15", label: "Zócalo titular", color: "#1B2A49" },
        { gid: "totem",        key: "F16", label: "Tótem titulares", color: "#1B2A49" } ] },
      totem: { head: "TITULARES", active: 0, items: [
        "FILIT UCM celebra su 20ª edición",
        "Posibles efectos del fenómeno de El Niño",
        "Rebaja de hasta 25% en las tarifas del TAG",
        "BTS llega al Estadio Nacional",
        "El auge de los foodtrucks en Talca" ] }
    }
  }
};
