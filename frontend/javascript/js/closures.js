/* Exemple d'effet des closures
*  la variable days est visible depuis le context d'execution de la fonction qui la contient
*/

function getDays() {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

    function getToday(){
        const numberOfToday = new Date().getDay();
        console.log(days[numberOfToday]);
    }
    return getToday;
}

//On assigne la fonction retourné a une variable pour une réutilisation

const today = getDays();
today();
