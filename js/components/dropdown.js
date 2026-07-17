// ===== Dropdown custom (façon DA Ascencia) =====
// Extrait de views/village.js (filtres Forge) le 2026-07-16 pour être réutilisé par
// l'Enchanteur (sélecteur de note, voir views/capitale.js) — un <select> natif ne peut
// pas être stylé dans le thème sombre/or (menu déroulant = chrome du navigateur).
// Bouton + panneau flottant, mêmes couleurs que le reste de l'UI. Un seul ouvert à la fois.
import { el } from '../utils/dom.js';

let openDropdown = null;

// options[].locked (optionnel) : rendu grisé, le clic déclenche onLockedClick(option)
// au lieu de sélectionner l'option — voir le filtre Rareté de la Forge (village.js).
export function dropdown(options, value, onChange, { onLockedClick } = {}) {
  const labelFor = (v) => (options.find((o) => o.value === v) || {}).label || '';
  const labelEl = el('span.dd-label', { text: labelFor(value) });
  const btn = el('button.dd-btn', { onclick: (e) => { e.stopPropagation(); toggle(); } }, [
    labelEl, el('span.dd-chevron', { text: '▾' }),
  ]);
  const panelEl = el('div.dd-panel');
  panelEl.style.display = 'none';
  const root = el('div.dd', {}, [btn, panelEl]);

  function renderPanel() {
    panelEl.replaceChildren(...options.map((o) => el('button.dd-item' + (o.value === value ? '.sel' : '') + (o.locked ? '.locked' : ''), {
      text: o.label,
      onclick: (e) => {
        e.stopPropagation();
        if (o.locked) { close(); onLockedClick && onLockedClick(o); return; }
        value = o.value; labelEl.textContent = o.label; close(); onChange(value);
      },
    })));
  }
  function open() {
    if (openDropdown && openDropdown !== closeFn) openDropdown();
    renderPanel();
    panelEl.style.display = '';
    btn.classList.add('open');
    openDropdown = closeFn;
    document.addEventListener('click', onDocClick, true);
  }
  function close() {
    panelEl.style.display = 'none';
    btn.classList.remove('open');
    if (openDropdown === closeFn) openDropdown = null;
    document.removeEventListener('click', onDocClick, true);
  }
  function closeFn() { close(); }
  function toggle() { panelEl.style.display === 'none' ? open() : close(); }
  function onDocClick(e) { if (!root.contains(e.target)) close(); }

  return { root, get: () => value };
}
