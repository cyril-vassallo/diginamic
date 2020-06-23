"use strict";

(function () {
    class Furniture {
      constructor(family, material, price, color, isAvailable) {
        this.family = family;
        this.material = material;
        this.price = price;
        this.color = color;
        this.isAvailable = isAvailable;
      }

      sellArticle() {
        console.log(`this article has been sold out !`);
      }
    }

    class Table extends Furniture {
      constructor(
        material,
        price,
        color,
        isAvailable,
        nbDrawer,
        nbFeet,
        shape
      ) {
        super("table", material, price, color, isAvailable);
        this.nbDrawer = nbDrawer;
        this.nbFeet = nbFeet;
        this.shape = shape;
        this.owner = "";
      }

      setOwner(owner) {
        this.owner = owner;
      }

      getOwner() {
        return this.owner;
      }
    }

    const drawerTable = new Table("wooden", 189, ["white", 'black', "gray"], true, 1, 4, "circle");
    drawerTable.setOwner("Cyril Vassallo");

   console.log(drawerTable)

})();

(function(){
    
    const table =  {
        shape: "circle",
        price: 198,
        owner: "",
        setOwner : function(owner) {
            this.owner = owner;
        }
    }
    
    table.setOwner("Wooden Man");
    console.log(table["owner"]);
    table.prototype.getOwner = function() {
        return this.owner;
    }

})();