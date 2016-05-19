import React from 'react';
import { Link } from 'react-router';

import DumbSimple from '../components/dumb/simple';
import Simple from '../components/simple';

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
        <Link to='/about'>
          <h1>Hello Home</h1>
        </Link>
        <hr/>
        <h1>Dumb</h1>
        <DumbSimple/>
        <br/>
        <DumbSimple
          text='This text has been overriden by `props`'
          onClick={() => {
            console.log('This function has been overriden by `props`');
          }}
        />
        <hr/>
        <h1>Smart</h1>
        <Simple/>
        <br/>
        <h6>In this case, this value has been set his props but it never shown because has been linked to the app state</h6>
        <Simple
          text='Never Shown'
          onClick={() => { console.log('Never Shown'); }}
        />
      </div>
    )
  }
}
