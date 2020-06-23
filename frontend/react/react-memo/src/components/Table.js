import Conf from "../config/AppConfigDev";
import React, { Component } from "react";
import "./App.css";
import Nav from "./nav/Nav";
import Column from "./column/Column";
import FormAddCard from "./FormAddCard";
import FetchData from "../services/FetchData";
import { Redirect } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: [],
      columns: [],
      indexShowFormAddCard: -1, //si égale -1 alors on n'affiche pas le formulaire
      error: false,
    };
    this.fetchData = new FetchData(
      Conf.api.END_POINT,
      Conf.api.LOGIN,
      Conf.api.PASSWORD,
      Conf.api.USER_ID
    );
  }

  addCard = (question, answer, index) => {
    const copyState = { ...this.state };
    copyState.columns[index].cards.push({
      id: this.getLastCardId(),
      question: question,
      answer: answer,
    });
    copyState.indexShowFormAddCard = -1;
    this.setState(copyState);
  };

  getLastCardId = () => {
    let lastId = 0;
    for (let i; i < this.state.columns.length; i++) {
      lastId += this.state.columns.card[i].card.length;
    }
    return lastId;
  };

  handleHideFormAddCard = () => {
    console.log(this.state);
    const copyState = { ...this.state };
    copyState.indexShowFormAddCard = -1;
    this.setState(copyState);
  };

  handleClickAddCard = (event, index) => {
    // copy of state
    console.log(this.state);
    const copyState = { ...this.state };
    //Change state
    copyState.indexShowFormAddCard = index;
    this.setState(copyState);
  };

  handleClickTerm = (event, termId) => {
    this.fetchData.getCards(termId, this.successGetCards, this.failedGetCards);
  };

  successGetCards = (columns) => {
    console.log("Dans successGetCards", columns);
    const copyState = { ...this.state };
    copyState.columns = columns;
    this.setState(copyState);
  };

  successGetToken = (token) => {
    console.log("Dans successGetToken : ", token);
    this.fetchData.getTerms(this.successGetTerms, this.failedGetTerms);
  };

  successGetTerms = (terms) => {
    const copyState = { ...this.state };
    console.log("Dans successGetTerms : ", terms);
    copyState.terms = terms;
    console.log(this.state);
    this.setState(copyState);
  };

  failedGetTerms = (error) => {
    console.log("Dans failedGetTerms", error);
  };

  failedGetToken = (error) => {
    console.log("Dans failedGetToken", error);
    const copyState = { ...this.state };
    copyState.error = error;
    this.setState(copyState);
  };

  failedGetCards = (error) => {
    console.log("Dans failedGetCard", error);

  };

  render() {
    return (
      <div>
        {this.state.error && (
          <Redirect
            to={{
              pathname: "/error",
              state: { error: this.state.error.message }
            }}
          />
        )}
        <Nav onClickTerm={this.handleClickTerm} terms={this.state.terms} />
        <main className="container-fluid">
          <section className="row">
            <div className="col"></div>
            {this.state.indexShowFormAddCard !== -1 && (
              <FormAddCard
                addCard={this.addCard}
                index={this.state.indexShowFormAddCard}
                onHideFormAddCard={this.handleHideFormAddCard}
              />
            )}
          </section>
          <section className="row">
            {this.state.columns.map((column, index) => (
              <Column
                index={index}
                key={column.id}
                column={column}
                onClickAddCard={(event) => {
                  this.handleClickAddCard(event, index);
                }}
              />
            ))}
          </section>
        </main>
      </div>
    );
  }

  componentDidMount() {
    this.fetchData.getToken(this.successGetToken, this.failedGetToken);
    console.log("Dans composant didMount");
  }
}
