import React from 'react';
import Welcome from '../dumb/Welcome/';

/**
 * Main class
 */
export default class Main extends React.Component {
  static propTypes = {
  };
  static defaultProps = {
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
    return (
      <div id='wrapper'>
        <Welcome
          isEnabled={false}
          inputText='Prop: Text'
          inputTextToAdd='Prop: TextToAdd'
          inputPlaceholder='Prop: Placeholder'
        />
      </div>
    )
  }
}
