import React from 'react';
import { Link } from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import BackIcon from 'material-ui/svg-icons//navigation/arrow-back';

/**
 * Main class
 */
export default class Main extends React.Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired
  , location: React.PropTypes.object.isRequired
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
    let backButton = '';
    if(this.props.location.pathname !== '/'){
      backButton = (
        <Link to='/'>
          <FloatingActionButton
            style={{
              position: 'fixed'
            , right: '50px'
            , bottom: '50px'
            }}
          >
            <BackIcon/>
          </FloatingActionButton>
        </Link>
      );
    }
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Drawer>
            <Link to='/Card'><MenuItem>Card</MenuItem></Link>
            <Link to='/Counter'><MenuItem>Counter</MenuItem></Link>
            <Link to='/Deck'><MenuItem>Deck</MenuItem></Link>
            <Link to='/Field'><MenuItem>Field</MenuItem></Link>
            <Link to='/Hand'><MenuItem>Hand</MenuItem></Link>
          </Drawer>
          <div
            style={{
              position: 'fixed'
            , height: '100%'
            , width: 'calc(100% - 256px)'
            , top: 0
            , left: '256px'
            }}
          >
            {this.props.children}
            {backButton}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
