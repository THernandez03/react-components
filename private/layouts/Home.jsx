import React from 'react';

/**
 * Main class
 */
export default class Home extends React.Component {
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
      <h1>Home</h1>
    )
  }
}
