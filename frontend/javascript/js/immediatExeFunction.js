"use strict";
/**
 * Une fonction anonyme à execution immédiate permet d'isoler du code
 */
(function(a,b) {
  //Creat arrow function
  let firstName = "Cyril";
  const person = (firstName) => {
    return  console.log("Hello " + firstName);
  } 
  person(firstName);
 console.log(a +b)
})(12, 6); //appel de la fonction de façon immédiate


//first class citizen assigner une fonction à une variable

(function(a,b) {
  //Creat arrow function
  let firstName = "Cyril";
  const personFirst = firstName => console.log("Hello " + firstName);
  const personLast = lastName => console.log("Hello " + lastName);
  
  person(firstName);
 console.log(a +b)
})(12, 6); //appel de la fonction de façon immédiate

