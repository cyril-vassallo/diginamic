//object
"use strict";

(function () {

    const Person = {
        name: "Dusse",
        firstName: "Jean-Claude",
        sePresenter: function(){
          console.log("Bonjour, je m'appelle " +
          this.firstName + " " + this.name);
        }
      }

      for(let key in Person) {
        // console.log(key + " : " + jc[key]);
        if(typeof Person[key] === "function"){
            Person[key]();
        }
      }
      

      // Tableau littéral à index
        var personnages = ["Harry","Hermione","Ron","Voldemore"];

        let taille = personnages.length;

        for(let i = 0; i < personnages.length; i ++) {
        console.log(personnages[i]);
        }

        

      // LES OBJETS EN JS SONT DES TABLEAUX ASSOCIATIFS
    //   console.log(jc.name);
    //   console.log(jc["name"]);
    //   console.log(jc.sePresenter());
    //   console.log(jc["sePresenter"]());

})();