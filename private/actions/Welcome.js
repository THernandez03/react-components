export const onInputClick = (text) => {
  return { type: 'ADD_TEXT', text };
};

export const onButtonClick = () => {
  return { type: 'TOGGLE_STATUS' };
};

export default {
  onInputClick
, onButtonClick
}
