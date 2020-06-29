import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Admin from './components/admin/Admin';
import Home from './components/public/Home';


export default class App extends Component {

  render(){
    return (
      <div className="App">
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/" component={Home} />
          </Switch>
      </div>
  );
  }
}