import { connect } from 'react-redux';

import Simple from '~/components/dumb/simple';
import { addItem } from '~/actions/';

export default connect(
  (state) => {
    return {
      items: state.items
    , text: 'This text has been overriden by the `state` value'
    };
  }
, (dispatch) => {
    return {
      onClick: () => { dispatch(addItem()); } }
  }
)(Simple);
