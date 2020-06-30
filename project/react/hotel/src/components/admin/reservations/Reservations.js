import React, { Component } from 'react';
import FetchData from '../../../services/FetchData';
import Message from '../../common/Message';


class Reservations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      error: false,
      isDeleted: false,
      deletedReservation: null,
    };
    this.fd = new FetchData(); // Singleton
  }
  successReservation = (data) => {
    console.log("Dans successReservation");
    // copie du state
    const copy_state = { ...this.state };
    // Modification de la copie du state
    copy_state.reservations = data;

    this.setState(copy_state);
  };

  failedReservation = (error) => {
    console.log("Dans failedReservation ", error);
    // copie du state
    const copy_state = { ...this.state };
    // Modification de la copie du state
    copy_state.error = error;

    this.setState(copy_state);
  };

  componentDidMount = async () => {
    // Tentative de récupération des données
    try {
      const data = await this.fd.getReservations();
      this.successReservation(data);
    } catch (error) {
      this.failedReservation(error);
    }
  };

  handleClickDelete = async ({ target }) => {
    const code = target.getAttribute("data-code");
    target.parentNode.parentNode.remove();
    const deletedReservation = await this.fd.deleteReservation(code);
    this.displayMessage(deletedReservation);
  };

  displayMessage = (deletedReservation) => {
    console.log("Dans displayMessage ");
    // copie du state
    const copy_state = { ...this.state };
    // Modification de la copie du state
    copy_state.isDeleted = true;
    copy_state.deletedReservation = deletedReservation;

    this.setState(copy_state);
    setTimeout(()=> {
        const copy_state = { ...this.state };
        // Modification de la copie du state
        copy_state.isDeleted = false;
        copy_state.deletedReservation = null;
        this.setState(copy_state);
    },10000)
  };

  render() {
    return (
      <div className="col">
        <h2>Réservation</h2>
        {this.state.isDeleted && (
          <Message
            type="warning"
            message={`La réservation de
                        ${this.state.deletedReservation.data.customer.lastName}
                        ${this.state.deletedReservation.data.customer.firstName}
                        pour un séjour de 
                        ${this.state.deletedReservation.data.nights}
                        nuit(s) pour
                        ${this.state.deletedReservation.data.persons}
                        personne(s) du    
                        ${this.state.deletedReservation.startDate}
                        au
                        ${this.state.deletedReservation.endDate}
                        vient d'être supprimée !`}
          />
        )}
        {this.state.error && (
          <div>
            <h2>Erreur</h2>
            <p>Code de l'erreur : {this.state.error.message}</p>
            <p>Merci de contacter l'administrateur : admin@hotel.com</p>
          </div>
        )}
        <table className="table table-responsive-lg">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Catégorie</th>
              <th>Date de début</th>
              <th>Date de fin</th>
              <th>Nb de personnes</th>
              <th>Nb de nuits</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.reservations.map((reservation) => {
              return (
                <tr key={reservation.id}>
                  <td>{reservation.id}</td>
                  <td>{reservation.categoryId}</td>
                  <td>{reservation.startDate}</td>
                  <td>{reservation.endDate}</td>
                  <td>{reservation.data.persons}</td>
                  <td>{reservation.data.nights}</td>
                  <td>
                    <button
                      data-code={reservation.code}
                      className="btn btn-danger"
                      type="button"
                      onClick={this.handleClickDelete}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="table-dark">
            <tr>
              <th>ID</th>
              <th>Catégorie</th>
              <th>Date de début</th>
              <th>Date de fin</th>
              <th>Nb de personnes</th>
              <th>Nb de nuits</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default Reservations;