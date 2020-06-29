import React, { Component } from "react";
import Header from "../common/Header";
import FetchData from "../../services/FetchData";

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
    this.fd = new FetchData();
  }
  state = {};

  handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      start : event.target.querySelector("#start-date").value,
      end : event.target.querySelector("#end-date").value,
      persons  : event.target.querySelector("#nb-person").value,
      category : event.target.querySelector("#category").value,
    }

    try{
      const reservation = await this.fd.postReservation(payload); 
    }catch(e){
      console.log("Error:" + e);
      
    }
    
  };

  render() {
    return (
      <div>
        <Header path="/" />
        <h1>Reservation</h1>
        <div className="container">
          <div className="row from-group">
            <div className="col-md-12">
              <form onSubmit={this.handleSubmit}>
                <label className="form-control-label" htmlFor="start-date">
                  Date d'arrivée
                  <input
                    className="form-control"
                    id="start-date"
                    type="date"
                    defaultValue={""}
                  />
                </label>
                <label className="form-control-label" htmlFor="end-date">
                  Date de départ
                  <input
                    className="form-control"
                    id="end-date"
                    type="date"
                    defaultValue={""}
                  />
                </label>
                <label className="form-control-label" htmlFor="nb-person">
                  Nombre de personnes
                  <input
                    className="form-control"
                    id="nb-person"
                    type="number"
                    min="1"
                    max="3"
                    defaultValue={""}
                  />
                </label>
                <label htmlFor="category">
                  Catégorie de chambre :
                  <select required id="category">
                    <option value="1">1 - Chambre simple</option>
                    <option value="2">2 - Chambre double</option>
                    <option value="3">3 - Chambre double - lits séparés</option>
                    <option value="4">4 - Chambre triple - 1 lit double - 1 lit simple</option>
                  </select>
                </label>
                <input
                  className="btn btn-success"
                  type="submit"
                  value="Envoyer"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
