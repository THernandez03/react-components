import React from 'react';
import { Example } from '../components/';

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
      <div>
        <Example/>
      </div>
    )
  }
}
