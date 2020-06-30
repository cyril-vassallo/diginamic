import React, { Component } from "react";
import Header from "../common/Header";
import Form from './form/Form'
import "./home.css";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Header path="/" />
        <h1 className="text-center">Reservation</h1>
        <div className="content">
        <div className="container header">
          <div className="row">
            <div className="col-12">
            </div>
          </div>
          <div className="row description">
            <div className="col-10 ">
              <ul className="list-unstyled text-light d-flex m-3">
                <li className="mx-3 my-1">Parking</li>
                <li className="mx-3 my-1">Wifi/AccessInternet</li>
                <li className="mx-3 my-1">Petit-Déjeuner</li>
                <li className="mx-3 my-1">Bar</li>
                <li className="mx-3 my-1">Restaurant</li>
                <li className="mx-3 my-1">Air Conditioné</li>
                <li className="mx-3 my-1">+ 17 services</li>
              </ul>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
          <Form/>
        </div>
      </div>
    );
  }
}

export default Home;
