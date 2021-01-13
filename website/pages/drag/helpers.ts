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
