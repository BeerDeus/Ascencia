// ===== Helpers DOM légers =====

// el('div.card#id', {attrs}, [children|string])
export function el(sel, attrs = {}, children = []) {
  const [tagPart, ...classParts] = sel.split('.');
  let tag = tagPart, id = null;
  if (tag.includes('#')) { [tag, id] = tag.split('#'); }
  const node = document.createElement(tag || 'div');
  if (id) node.id = id;
  if (classParts.length) node.className = classParts.join(' ');

  for (const [k, v] of Object.entries(attrs)) {
    if (v == null) continue;
    if (k === 'class') node.className = [node.className, v].filter(Boolean).join(' ');
    else if (k === 'text') node.textContent = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k === 'dataset') Object.assign(node.dataset, v);
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v);
  }

  const kids = Array.isArray(children) ? children : [children];
  for (const c of kids) {
    if (c == null || c === false) continue;
    node.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return node;
}

export const clear = (node) => { while (node.firstChild) node.removeChild(node.firstChild); };
export const fmt = (n) => Number(n).toLocaleString('fr-FR');
export const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
