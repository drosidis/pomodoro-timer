import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import StartStop from './StartStop';
import PastTasks from './PastTasks';
import Reports from './Reports';
import Settings from './Settings';

class App extends Component {
  render() {
    return (
      <>
        <Header></Header>
        <Switch>
          <Route exact path='/' component={StartStop} />
          <Route path='/past' component={PastTasks} />
          <Route path='/reports' component={Reports} />
          <Route path='/settings' component={Settings} />
        </Switch>
      </>
    );
  }
}

export default App;
