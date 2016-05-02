import React from 'react';
import { connect } from 'react-redux';
import actions from '~/actions/Welcome';

/**
 * Welcome View class
 */
class Welcome extends React.Component {
  static propTypes = {
    isEnabled: React.PropTypes.bool
  , inputText: React.PropTypes.string
  , inputTextToAdd: React.PropTypes.string
  , inputPlaceholder: React.PropTypes.string
  , onInputClick: React.PropTypes.func
  , onButtonClick: React.PropTypes.func
  };
  static defaultProps = {
    isEnabled: true
  , inputText: 'Default: Text'
  , inputTextToAdd: 'Default: TextToAdd'
  , inputPlaceholder: 'Default: Placeholder'
  , onInputClick: () => {}
  , onButtonClick: () => {}
  };
  static contextTypes = {
    history: React.PropTypes.object.isRequired
  };

  /**
   * Define what HTML will be rendered to DOM
   * @method render
   * @return {[type]} [description]
   */
  render(){
    const props = this.props;
    return (
      <div>
        <input
          disabled={!props.isEnabled}
          type='text'
          value={props.inputText}
          placeholder={props.inputPlaceholder}
          onClick={() => { props.onInputClick(props.inputTextToAdd); }}
        />
        <button
          Enable
          onClick={() => { props.onButtonClick(); }}
        >
          Enabled
        </button>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      inputText: state.setText
    , isEnabled: state.setStatus
    };
  }
, (dispatch) => {
    return {
      onInputClick: (...args) => { dispatch(actions.onInputClick(args)); }
    , onButtonClick: (...args) => { dispatch(actions.onButtonClick(args)); }
    };
  }
)(Welcome);
