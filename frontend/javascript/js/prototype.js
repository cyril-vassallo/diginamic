"use strict";

(function(){

    function Square(width){
      this.width = width;
    }
    /**
     * Objet avec constructeur de cercle
     */
    function Circle(radius, name){
      this.radius = radius;
      this.name = name;
    }
    
    const smallCircle = new Circle(2, 'petit Cercle');
    const largeCircle = new Circle(4, 'grand Cercle');
    const smallSquare = new Square(4);
  
    Circle.prototype.area = function() {
      return this.PI*(Math.pow(this.radius,2));
    }
    
    Circle.prototype.PI = 3.14;
    Square.prototype.ANGLE = 90;
    console.log(`${smallCircle.name} : ${smallCircle.area()}`);
    console.log(`${largeCircle.name} : ${largeCircle.area()}`);
    console.log(smallCircle);
    console.log(smallSquare);
      
  })();