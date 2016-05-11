import React from 'react';

/**
 * Simple class
 */
export default class Simple extends React.Component {
  static propTypes = {
    text: React.PropTypes.string
  , onClick: React.PropTypes.func
  };
  static defaultProps = {
    text: 'This text comes from `defaultProps`'
  };
  static contextTypes = {
  };

  /**
   * [onClick description]
   * @author THernandez03
   * @return {[type]} [description]
   */
  onClick(){
    console.log('This function comes with default value');
  }

  /**
   * Define what HTML will be rendered to DOM
   * @method render
   * @return {[type]} [description]
   */
  render(){
    return (
      <div>
        <input
          type='button'
          value={this.props.text}
          onClick={(this.props.onClick || this.onClick).bind(this)}
        />
      </div>
    )
  }
}
