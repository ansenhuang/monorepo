export const getDOMElement = (selector: string | Element) => {
  if (typeof selector === 'string') {
    return document.querySelector(selector);
  }
  return selector;
};
