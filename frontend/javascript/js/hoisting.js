"use strict";

const z  = "hello world" ;

console.log(z);


//definition d'une fonction

function hello(firstName = "Jean") { //paramètre attendu
    
    return "Hello " + firstName; 
} 

//La hoisting ou hissage permet de faire appel
// à une function qui est déclaré plus bas


//Cyril est passé en argument
console.log(hello()); 


{
    let j = 12;
    console.log(j);
    hello();
}