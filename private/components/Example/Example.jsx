import React from 'react';

export default class Example extends React.Component {
  static propTypes = {
    text: React.PropTypes.string
  , onClick: React.PropTypes.func
  };
  static defaultProps = {
    text: 'This text comes from `defaultProps`'
  };
  static contextTypes = {
  };

  onClick(){
    console.log('This function comes with default value');
  }

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
