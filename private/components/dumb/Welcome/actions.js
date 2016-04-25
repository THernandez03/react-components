export const addText = (text) => {
  return { type: 'ADD_TEXT', text };
};

export const emptyText = () => {
  return { type: 'EMPTY_TEXT' };
};

export const toggleStatus = () => {
  return { type: 'TOGGLE_STATUS' };
};
