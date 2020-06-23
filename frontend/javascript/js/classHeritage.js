//object
"use strict";

(function(){
  /**
   * Object
   */
  class Person{
    constructor(lastName, firstName){
      this.lastName = lastName;
      this.firstName = firstName;
    }

    introduce() {
      console.log(`Je m'appelle ${this.firstName} ${this.lastName}`);
    }
  }

  class Teacher extends Person{

    constructor(lastName, firstName, role){
      super(lastName, firstName);
      this.role = role;
    }

    introduce() {
      super.introduce();
      console.log(`et je suis ${this.role}`);
    }

    teach() {
      console.log("J'enseigne");
    }
  }

  class TeacherJs extends Teacher{
    teachJS() {
      console.log("J'enseigne le Javascript !");
    }
  }

  const cyril = new TeacherJs('Spider', 'Man', 'Professeur');
  console.table(cyril);
  console.log(cyril.teachJS());
  


})();