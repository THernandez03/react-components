import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

import { Main, Error } from './views/';
import { Home, CardLayout, CounterLayout, DeckLayout, FieldLayout, HandLayout } from './layouts/';

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
            <Route path='Card' component={CardLayout}/>
            <Route path='Counter' component={CounterLayout}/>
            <Route path='Deck' component={DeckLayout}/>
            <Route path='Field' component={FieldLayout}/>
            <Route path='Hand' component={HandLayout}/>
          </Route>
          <Route path='*' component={Error}/>
        </Router>
      </Provider>
    )
  }
}
