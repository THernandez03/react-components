let index = 0;

export const addItem = () => {
  console.log('This function has been overriden to dispatch an action');
  return {
    type: 'ADD'
  , item: `Item-${index++}`
  };
};
