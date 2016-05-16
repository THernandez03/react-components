import React from 'react';

/**
 * Main class
 */
export default class Main extends React.Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired
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
        {this.props.children}
      </div>
    )
  }
}
