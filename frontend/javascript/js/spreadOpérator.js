"use strict";


(function(){


  const bob = {
    name:"bob"
  }

const boby = {...bob, first:"Dylan"};
console.log("bobi is same as bob? " + (-bob===boby));

console.log(boby);


let i = "undefine";
{i && (console.log("hello"))}



const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign({}, target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }


})();
