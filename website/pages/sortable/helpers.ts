import uniqueId from 'lodash/uniqueId';

export const getExampleItems = (prefix = uniqueId()) =>
  [
    { key: '1', name: 'Item 1' },
    { key: '2', name: 'Item 2' },
    { key: '3', name: 'Item 3' },
    { key: '4', name: 'Item 4' },
    { key: '5', name: 'Item 5' },
    { key: '6', name: 'Item 6' },
  ].map((item) => {
    item.key = prefix + '_' + item.key;
    return item;
  });
