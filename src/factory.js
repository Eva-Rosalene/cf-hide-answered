export function createElement(name, attribures, ...children) {
  const element = document.createElement(name);
  const attrs = attribures || {};
  for (let [name, value] of Object.entries(attrs)) {
    if (name === 'ref') {
      continue;
    }
    if (value instanceof Function && name.startsWith('on')) {
      element.addEventListener(name.substr(2), value, true);
      continue;
    }
    element.setAttribute(name, value);
  }
  for (let child of children) {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
      continue;
    }
    element.appendChild(child);
  }
  if (attrs.ref) {
    attrs.ref(element);
  }
  return element;
}