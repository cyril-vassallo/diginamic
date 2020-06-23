//object
"use strict";

(function(){
  /**
   * Objet avec constructeur de cercle
   */
  class Circle{
    constructor(radius, name){
      this.name = name;
      this.radius = radius;

    }

    area(){
      return this.PI*(Math.pow(this.radius,2));
    }
  }

  
  const smallCircle = new Circle(2, 'petit Cercle');
  const largeCircle = new Circle(4, 'grand Cercle');
  Circle.prototype.PI = 3.14;
  console.log(`${smallCircle.name} : ${smallCircle.area()}`);
  console.log(`${largeCircle.name} : ${largeCircle.area()}`);
  console.log(smallCircle);

    
})();