import React from 'react';
import { connect } from 'react-redux';
import { addText, toggleStatus } from './actions';

/**
 * fdsf
 */
class Main extends React.Component {
  static propTypes = {
    isEnabled: React.PropTypes.bool
  , inputText: React.PropTypes.string
  , inputTextToAdd: React.PropTypes.string
  , inputPlaceholder: React.PropTypes.string
  , onInputClick: React.PropTypes.func
  , onInputChange: React.PropTypes.func
  , onButtonClick: React.PropTypes.func
  };
  static defaultProps = {
    isEnabled: true
  , inputText: 'Default: Text'
  , inputTextToAdd: 'Default: TextToAdd'
  , inputPlaceholder: 'Default: Placeholder'
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
          onChange={() => { props.onInputChange(); }}
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
      inputText: state.getText
    , isEnabled: state.getStatus
    }
  }
, (dispatch) => {
    return {
      onInputClick: (text) => { dispatch(addText(text)); }
    , onInputChange: () => {}
    , onButtonClick: () => { dispatch(toggleStatus()); }
    }
  }
)(Main);
