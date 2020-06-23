import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Conf from './../config/AppConfigDev';
import Table from './Table';
import About from './About';
import Error from './Error';


export default class App extends Component {

  render(){
    return (
      <div className="App">
        <header >
        <h1 className="text-center bg-secondary p-3 text-white">
              <img src={Conf.app.DOMAINE + "svg/memo.svg"} alt="M" />
              emo
              <img
                src={Conf.app.DOMAINE + "svg/user.svg"}
                alt=""
                className="ml-5"
              />
              <img
                className="rotating"
                id="react"
                src={Conf.app.DOMAINE + "logo192.png"}
                alt=""
              />
            </h1>
        </header>
        <main>
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/error" component={Error} />
            <Route path="/" component={Table} />
          </Switch>
        </main>
      </div>
  );
  }
}