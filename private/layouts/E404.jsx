import React from 'react';
/**
 * NoMatch class
 */
export default class E404 extends React.Component {
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
        <h1>Error 404</h1>
      </div>
    )
  }
}
