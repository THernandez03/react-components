export const getText = (state = '', action) => {
  switch (action.type) {
    case 'ADD_TEXT':
      return `${state} ${action.text}`;
    case 'EMPTY_TEXT':
      return '';
    default:
      return state;
  }
};

export const getStatus = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_STATUS':
      return !state;
    case 'ENABLE_STATUS':
      return true;
    case 'DISABLE_STATUS':
      return false;
    default:
      return state;
  }
};
