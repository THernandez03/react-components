import React from 'react';
import { Card } from '../components/Card';

/**
 * Main class
 */
export default class CardLayout extends React.Component {
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
      <Card/>
    )
  }
}
