/**
 * SIMULATE DATA FROM DATABASE or API: a list of films
 */
let films = [
  { title: "Les quartes fantastiques", description: "This is a comics" },
  { title: "X-men", description: "This is a comics" },
  { title: "Terminator", description: "This is not a comics" },
  { title: "Captain américa", description: "This is a comics" },
];

/**
 * General execution context statut code variable to simulate request result
 */
let statusCode = 201;

/**
 * Add event on button to switch promise to reject when change the status code
 */
function rejectPromiseEvent() {
  const button = document.getElementsByTagName("button");
  button[0].addEventListener("click", () => {
    statusCode = 404;
    console.log(statusCode);
  });
}

/**
 * Get the list of films and display it into the DOM after 1 second when needed
 */
function getFilms() {
  setTimeout(() => {
    let htmlList = "";
    films.forEach((film) => {
      htmlList += `<li>${film.title} : ${film.description}</li>`; //template
    });
    removeMessage();
    const olElement = setOlElement();
    olElement.innerHTML = htmlList; // we push it into the DOM in side the element
  }, 1000);
}

/**
 * Remove message paragraph when needed
 */
function removeMessage() {
  const message = document.getElementById("message");
  message.remove();
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
 * Display an error when called
 *
 * @param {string} error
 */
function displayError(error) {
  const message = document.getElementById("message");
  message.classList.add("alert", "alert-warning");
  message.textContent = error;
}

/**
 * This is the Promise
 * resolve display the list of films and insert a new film
 * reject send and error message
 *
 * @param {object} film
 */
function createNewFilm(film) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (statusCode == 200 || statusCode == 201) {
        films.push(film);
        console.log(
          `Le film ${film.title} a été ajouté à la liste, il y a maintenant ${films.length} films`
        );
        console.log(films);
        resolve();
      } else {
        console.log(
          `Le film ${film.title} n'a pas été ajouté à la liste, il y a toujours ${films.length} films`
        );
        console.log(films);
        reject(
          `Error : Quelqu'un a appuyé sur le bouton rouge, la promesse d'afficher la liste des films à été rejetée et le film ${film.title} n'as pas été ajouté !`
        );
      }
    }, 5000); // 5 second
  });
}

/**
 * Execute the rejectPromiseEvent function just after the page is loaded
 */
document.onload = rejectPromiseEvent();

/**
 * Call of createNewFilm promise
 */
createNewFilm({ title: "Spider-man", description: "This is my favorite !" })
  .then(getFilms)
  .catch((error) => displayError(error));
