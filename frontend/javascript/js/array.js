//object
"use strict";

(function () {


    const fruits = ["Banana", "Apple", "Strawberry"];
    fruits.push('Pineapple');
    fruits.pop();
    fruits.push();
    //fruits.shift();

    //Transforme un tableau en un autre tableau
    const fruitsUpper = fruits.map((fruit, index)=> {
        return  index+ ":" + fruit.toUpperCase() ; 
    });

    
    fruits.forEach((fruit)=> {
        console.log(fruit)
    });
    

    //passage par reférence 
    const fruitBis = fruits;
    fruitBis.push('Watermelon');
    console.log(fruits);
    
    
    
    
    //Passage par valeur
    let i = 20;
    let j = i;
     j = 12
    i  = j;
    console.log(i);

    //donne le dernier élément du tableau
    console.log(fruits[fruits.length-1]);
    console.log(fruits.toString());
    console.log(fruits.indexOf('Banana'));
    console.log(fruitsUpper);


    //filter permet de transformer 
    //un tableau grace a une condition appliquer a chaque callback
    const fruitsShort = fruits.filter(fruit => fruit.length > 6 );


    console.log(fruitsShort);


})();