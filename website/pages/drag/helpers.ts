export const getElementFromTarget = (
  target: HTMLElement | null,
  expression: (el: HTMLElement) => boolean,
): HTMLElement | null => {
  let current = target;
  while (current && !expression(current)) {
    current = current.parentElement;
  }
  return current;
};

export const createHTMLElement = (tagName: string = 'div'): HTMLElement => {
  const el = document.createElement(tagName);
  el.textContent = 'clone';
  el.style.height = '20px';
  el.style.backgroundColor = '#ccc';
  return el;
};
