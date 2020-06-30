import React, { Component } from "react";
import FetchData from "../../../services/FetchData";
import Reservation from "./../reservation/Reservation";
import Error from "./../error/Error"



class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservation: null,
      isBooked: false,
      error: null
    };
    this.fd = new FetchData();
  }

  displayReservation = (reservation) => {
    const copy_state = { ...this.state };
    console.log(copy_state);
    copy_state.reservation = reservation;
    copy_state.isBooked = true;
    this.setState(copy_state);
  }

  displayError = (error) => {
    const copy_state = { ...this.state };
    console.log(copy_state);
    copy_state.error = error;
    copy_state.isBooked = false
    this.setState(copy_state);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      start: event.target.querySelector("#start-date").value,
      end: event.target.querySelector("#end-date").value,
      persons: event.target.querySelector("#nb-person").value,
      category: event.target.querySelector("#category").value,
    };



    try {
      const reservation = await this.fd.postReservation(payload);
      this.displayReservation(reservation);
    } catch (error) {
      console.log(error.message)
      this.displayError(error.message);
    }
  };


  render() {
    return (
        <form className="form" onSubmit={this.handleSubmit}>
          <h3 className="text-center">Reserver cet hotel</h3>
          <div className="container">
            <div className="row from-group">
              <div className="col-6">
                <label className="form-control-label" htmlFor="start-date">
                  Date d'arrivée
                </label>
                  <input
                    className="form-control"
                    id="start-date"
                    type="date"
                    defaultValue={""}
                  />
              </div>
              <div className="col-6">
                <label className="form-control-label" htmlFor="end-date">
                  Date de départ
                </label>
                  <input
                    className="form-control"
                    id="end-date"
                    type="date"
                    defaultValue={""}
                  />
              </div>
            </div>
            <div className="row from-group">
              <div className="col-6">
                <label className="form-control-label" htmlFor="nb-person">
                  Nombre de personnes
                </label>
                  <input
                    className="form-control"
                    id="nb-person"
                    type="number"
                    min="1"
                    max="3"
                    defaultValue={""}
                  />
              </div>
              <div className="col-6">
                <label htmlFor="category">
                  Catégorie de chambre :
                </label>
                  <select required id="category" className="form-control">
                    <option value="1">1 - Chambre simple</option>
                    <option value="2">2 - Chambre double</option>
                    <option value="3">3 - Chambre double - lits séparés</option>
                    <option value="4">
                      4 - Chambre triple - 1 lit double - 1 lit simple
                    </option>
                  </select>
              </div>
            </div>
            <div className="row from-group">
              <div className="col-md-12 text-center my-5">
                <input
                  className="btn btn-success"
                  type="submit"
                  value="Envoyer"
                />
              </div>
            </div>
          </div>
            {this.state.error && !this.state.isBooked && <Error error = {this.state.error}/>}
            {this.state.reservation && this.state.isBooked  && <Reservation reservation = {this.state.reservation} fd={this.fd}/>}
        </form>
    );
  }
}


export default Form;
