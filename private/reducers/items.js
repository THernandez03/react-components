const initialState = [];

export const items = (state = initialState, action) => {
  switch (action.type){
    case 'ADD': return [...state, action.item];
    default: return state;
  }
}
