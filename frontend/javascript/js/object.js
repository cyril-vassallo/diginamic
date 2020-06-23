//object
"use strict";


(function(){
//Déclaration de la fonction constructeur
  function Card(question, answer){
    //Les propriété de l'objet
    this.question = question;
    this.answer = answer;
    console.log(this);
    console.log(typeof this);
    

    //getter and setter

    this.getQuestion = function(){
      return this.question;
    } 

    this.getAnswer = function(){
      return this.answer;
    } 
  }

//Instanciation d'une carte

const card1 = new Card("Comment s'appelle le créateur du web", "Tim Berners-lee")
const card2 = new Card("Youpi", "POO")
console.log(card1.getQuestion());
console.log(card1.getAnswer());
console.log(card1);
console.log(card2);

})();


