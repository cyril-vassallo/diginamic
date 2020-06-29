import React, { Component } from 'react';
import FetchData from '../../../services/FetchData';
class Reservations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: [],
            error: false
        };
        this.fd = new FetchData(); // Singleton

    }
    successReservation = (data) => {
        console.log('Dans successReservation');
        // copie du state
        const copy_state = { ...this.state };
        // Modification de la copie du state
        copy_state.reservations = data;

        this.setState(copy_state);
    }
    failedReservation = (error) => {
        console.log('Dans failedReservation ', error);
        // copie du state
        const copy_state = { ...this.state };
        // Modification de la copie du state
        copy_state.error = error;

        this.setState(copy_state);

    }
    componentDidMount = async () => {
        // Tentative de récupération des données
        try {
            const data = await this.fd.getReservations();
            this.successReservation(data);
        } 
        catch(error) {
            this.failedReservation(error);
        }

    }
    render() {
        return (
            <div className="col">
                <h2>Réservation</h2>
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
                        </tr>
                    </thead>
                    {this.state.reservations.map(reservation => {
                        return (
                            <tr key={reservation.id}>
                                <td>{reservation.id}</td>
                                <td>{reservation.categoryId}</td>
                                <td>{reservation.startDate}</td>
                                <td>{reservation.endDate}</td>
                                <td>{reservation.data.persons}</td>
                                <td>{reservation.data.nights}</td>
                            </tr>
                        )

                    })}
                </table>
            </div>
        );
    }
}

export default Reservations;