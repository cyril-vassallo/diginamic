class FetchData {
    constructor() {
        this.url = 'http://localhost:8000/';
        this.headers = {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("admin:admin") // btoa = encodage en base 64
        };
        this.credentials = "same-origin";
    }
    getReservations = () => {
        return fetch(`${this.url}admin/reservations`, {
            credentials: this.credentials,
            method: "GET",
            headers: this.headers
        }).then(function (response) {
            if (response.status !== 200) {
                throw new Error("Erreur " + response.status);
            }
            return response.json();// teste si c'est bien du json
        })
            .then(function (data) {
                console.log('data : ', data);// J'ai ma donnée au format json
                return data;
            });

    }

    postReservation = ({start, end, persons, category}) => {
    
        return fetch(`${this.url}booking/try-booking?start=${start}&end=${end}&persons=${persons}&category=${category}`, {
            credentials: this.credentials,
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                customer: {
                    firstName: "Jean",
                    lastName: "Peg",
                    phone: "04-06-66-66-66",
                    email: "jean.peg@gmail.com",
                    address: {
                      street: "Avenue du poulet",
                      zipcode: "34500",
                      city: "Montcalsson",
                      country: "Amplouf"
                    }
                  }
            })
        }).then(async(response) => {
            if (response.status !== 201) {
                console.log('Post');
                const error = await response.json()
                throw new Error("Erreur " + error.message);
            }
            return response.json();// teste si c'est bien du json
        })
            .then(function (data) {
                console.log('data : ', data);// J'ai ma donnée au format json
                return data;
            });

    }

    deleteReservation = (code) => {
        return fetch(`${this.url}booking/${code}`, {
            credentials: this.credentials,
            method: "DELETE",
            headers: this.headers
        }).then(function (response) {
            if (response.status !== 200) {
                throw new Error("Erreur " + response.status);
            }
            return response.json();// teste si c'est bien du json
        })
            .then(function (data) {
                console.log('data : ', data);// J'ai ma donnée au format json
                return data;
            });

    }
}

export default FetchData;