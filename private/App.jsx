import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

import { Main, Error } from './views/';
import { Home, Card, Counter, Deck, Field, Hand } from './layouts/';

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
          <Route path='/' component={Main}>
            <IndexRoute component={Home}/>
            <Route path='Card' component={Card}/>
            <Route path='Counter' component={Counter}/>
            <Route path='Deck' component={Deck}/>
            <Route path='Field' component={Field}/>
            <Route path='Hand' component={Hand}/>
          </Route>
          <Route path='*' component={Error}/>
        </Router>
      </Provider>
    )
  }
}
