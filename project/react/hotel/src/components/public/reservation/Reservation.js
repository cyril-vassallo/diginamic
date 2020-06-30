import React from 'react';
import "./reservation.css";

const Reservation = ({reservation, fd}) => {

        const handleDelete = async() => {
            const deleted = await fd.deleteReservation(reservation.code);
            if(deleted){
                console.log("Réservation deleted");
                
            }
        }
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center"> Vous avez réservez: </h3>
                    </div> 
                </div>
                <div className="row">
                    <div className="col-12">
                        <ul className="list-unstyled">
                            <li>Chambre category : {reservation.categoryId}</li>
                            <li>Arrivé prévue: {reservation.startDate}</li>
                            <li>Départ prévue: {reservation.endDate}</li>
                            <li>Votre code d'annulation: {reservation.code}</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <ul className="list-unstyled text-center">
                            <button className="btn btn-danger"type="button" onClick={handleDelete}>Annuler la réservation</button>
                        </ul>
                    </div>
                </div>
            </>
          );

}
 
export default Reservation ;