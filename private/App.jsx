import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

import Views from './views/';
import Layouts from './layouts/';

/**
 * Main class
 */
export default class App extends React.Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired
  , history: React.PropTypes.object.isRequired
  };
  static defaultProps = {
  };
  static contextTypes = {
  };

  /**
   * Define what HTML will be rendered to DOM
   * @method render
   * @return {[type]} [description]
   */
  render(){
    return (
      <Provider store={this.props.store}>
        <Router history={this.props.history}>
          <Route path='/' component={Views.Main}>
            <IndexRoute component={Layouts.Home}/>
            <Route path='about' component={Layouts.About}/>
          </Route>
          <Route path='*' component={Views.Error}/>
        </Router>
      </Provider>
    )
  }
}
