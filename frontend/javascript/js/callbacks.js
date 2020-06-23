//SIMULATE DATA FROM DATABASE : a list of films
let films = [
    {title:"Les quartes fantastiques", description:"This is a comics"},
    {title:"X-men", description:"This is a comics"},
    {title:"Terminator", description:"This is not a comics"},
    {title: "captain américa", description:"This is a comics"}
];

/**
 * Remove loading paragraph when needed
 */
function removeMessage() {
  const loading = document.getElementById("message");
  loading.remove();
}


/**
 * Create an empty ol Tag in the DOM with bootstrap classes
 * @return {object} olElement
 */
function setOlElement() {
  const olParent = document.getElementsByClassName("col")[2]; //We select the 3rd  div class col in the DOM
  olParent.prepend(document.createElement("ol")); // we create and insert an ol inside the elected col
  const elements = document.getElementsByTagName("ol"); // elements is a collection of <ol></ol>
  const olElement = elements[0]; // we just have one element in the collection
  olElement.classList.add("jumbotron", "text-primary", "p-5");
  return olElement;
}



/**
 * Get the list of films and display it into the DOM after 1 second when needed
 */
function getFilms(removeMessageCallback) {
    setTimeout(()=>{
        let htmlList = '';
        films.forEach(
            film => {
               htmlList += `<li>${film.title} : ${film.description}</li>`; //template
            });
            olElement = setOlElement(); // we just have one element in the collection
            removeMessageCallback();
            olElement.innerHTML =  htmlList; // we push it into the DOM in side the element
    },1000);
}


/**
 * Create a new film and get the list of films after a total of 6 seconds
 * 
 * @param {object} film 
 * @param {function} getFilmsCallback 
 */
function createNewFilm(film, getFilmsCallback) {
    setTimeout(()=> {
        films.push(film);
        getFilmsCallback(removeMessage); // add 1 seconde more from the callback function
        console.log(films)
    },5000); // 5 second
}


//Execute the creation of a film with a an object and a callback function as arguments
createNewFilm({
  title: "Spider-Man",
  description: "This is my favorite",
}, getFilms, );

 