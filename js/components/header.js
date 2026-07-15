// ===== En-tête : avatar/niveau, PV, ressources, monnaie premium =====
// Monté une seule fois puis patché (textContent) à chaque appel : évite le
// clear()+rebuild qui provoquait un flash visible à chaque setState (régén, etc.).
import { el, fmt, iconNode } from '../utils/dom.js';
import { state } from '../state.js';
import { signOutUser } from '../firebase/auth.js';
import { flushNow } from '../firebase/sync.js';

let R = null; // refs déjà montées sur `root`

// Bouton menu (☰) : pas encore de vrai panneau — sert pour l'instant à se déconnecter
// (seule action nécessaire depuis l'ajout des comptes Firebase). Un vrai menu (options,
// crédits...) pourra remplacer ce raccourci plus tard.
async function onMenuClick() {
  if (!confirm('Se déconnecter ?')) return;
  await flushNow(); // dernière écriture cloud avant de couper, pour ne rien perdre
  await signOutUser();
  location.reload();
}

export function renderHeader(root) {
  if (!R || R.root !== root) R = build(root);

  const p = state.player, r = state.resources, en = state.endurance;
  R.lvl.textContent = 'Lvl. ' + p.level;
  R.hp.textContent = `${p.hp.cur}/${p.hp.max}`;
  R.end.textContent = `${en.cur}/${en.max}`;
  R.bois.textContent = fmt(r.bois);
  R.metal.textContent = fmt(r.metal);
  R.tissu.textContent = fmt(r.tissu);
  R.fragments.textContent = fmt(r.fragments);
  R.or.textContent = fmt(r.or);
  R.eclats.textContent = fmt(r.eclats_ascension);
}

function build(root) {
  const refs = { root };
  root.replaceChildren(
    el('button.hdr-btn', { 'aria-label': 'Menu', onclick: onMenuClick }, [el('span.hamburger-icon')]),

    el('div.hdr-avatar', {}, [
      iconNode('assets/sprites/portraits/default_avatar.png', 'hdr-avatar-img'),
      refs.lvl = el('span.lvl', { text: '' }),
    ]),

    el('div.hp-pill', {}, [
      iconNode('assets/sprites/icons/vie.png', 'icon'),
      refs.hp = el('span', { text: '' }),
    ]),

    el('div.end-pill', {}, [
      iconNode('assets/sprites/icons/stamina.png', 'icon'),
      refs.end = el('span', { text: '' }),
    ]),

    el('div.hdr-res', {}, [
      el('div.res', {}, [iconNode('assets/sprites/ressources/bois.png', 'icon'), refs.bois = el('span', { text: '' })]),
      el('div.res', {}, [iconNode('assets/sprites/ressources/metal.png', 'icon'), refs.metal = el('span', { text: '' })]),
      el('div.res', {}, [iconNode('assets/sprites/ressources/tissu.png', 'icon'), refs.tissu = el('span', { text: '' })]),
      el('div.res', {}, [iconNode('assets/sprites/ressources/fragment.png', 'icon'), refs.fragments = el('span', { text: '' })]),
      // Or : ressource secondaire depuis l'ajout des Éclats d'Ascension (voir
      // .hdr-premium ci-dessous) — déplacé ici avec le reste du vrac le 2026-07-15.
      el('div.res', {}, [iconNode('assets/sprites/objets/piece_or.png', 'icon'), refs.or = el('span', { text: '' })]),
    ]),

    // Monnaie premium : Éclats d'Ascension (game/codex.js ECLATS_PER_KILL, palier
    // Codex "Ressource Premium" à 500 kills/monstre) — a remplacé l'or ici le
    // 2026-07-15, l'or n'étant plus la ressource la plus rare du jeu.
    el('div.hdr-premium', {}, [
      iconNode('assets/sprites/ressources/eclats_ascension.png', 'icon'),
      refs.eclats = el('span', { text: '' }),
    ]),
  );
  return refs;
}
