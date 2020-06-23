import Conf from "../config/AppConfigDev";
import Converter from "./DataConverter";

/**
 * Cette classe permet l'accès en lecture et en modification des données de l'API Drupal
 */
class FetchData {
  /**
   * Constructor
   * @param {string} url 
   * @param {string} login 
   * @param {string} pwd 
   * @param {integer} uid 
   */
  constructor(
    url = Conf.api.END_POINT,
    login = Conf.api.LOGIN,
    pwd = Conf.api.PASSWORD,
    uid = Conf.api.USER_ID
  ) {
    this.url = url;
    this.login = login;
    this.pwd = pwd;
    this.uid = uid;
    this.token = "";
    this.converter = new Converter()
  }

  /**
   * Permet de récupérer le token
   * @param  {function} success callback
   * @param  {function} failed callback
   */
  getToken = (success, failed) => {
    fetch(Conf.api.GET_TOKEN_URL) // endpoint ou point d'entrée
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Le serveur n'a pas répondu correctement");
        } else {
          // ça roule !
          return response.text(); // renvoie une promesse
        }
      })
      .then((token) => {
        console.log("token : ", token);
        this.token = token;
        success(token);
      })
      .catch((error) => {
        failed(error);
      });
  };

  /**
   * Permet de récupérer les thèmed de navigation d'un utilisateur donné.
   * @param  {function} success
   * @param  {function} failed
   */
  getTerms = (success, failed) => {
    console.log("Dans getTerms ");
    const method = "GET";
    const source = Conf.api.source.GET_TERMS_SRC;
    const query = this.url + source + this.uid;
    fetch(query, {
      credentials: "same-origin",
      method: method,
      headers: {
        "Content-Type": "application/hal+json",
        "X-CSRF-Token": this.token,
        Authorization: "Basic " + btoa(this.login + ":" + this.pwd), // btoa = encodage en base 64
      },
    })
      .then((response) => {
        console.log("data reçues dans createReqTerms avant json() :", response);
        if (response.status === 200) return response.json();
        else throw new Error("Problème de réponse ", response);
      })
      .then((data) => {
        console.log("data reçues dans getTerms :", data);
        success(data);
      })
      .catch((error) => {
        console.log("error catché dans getTerms", error);
        failed(error);
      });
  };
  
  /**
   * Permet de récupérer les cartes d'un utilisateur donné.
   * @param {integer} term_id
   * @param {function} success
   * @param {function} failed
   */
  getCards = (term_id, success, failed) => {
    console.log("Dans getCards");
    const source = Conf.api.source.GET_CARDS_SRC;
    const method = "GET";
    const query = `${this.url}${source}${
      this.uid
    }/${term_id}&_format=json&time=${Math.floor(Math.random() * 10000)}`;
    fetch(query, {
      credentials: "same-origin",
      method: method,
      headers: {
        "Content-Type": "application/hal+json",
        "X-CSRF-Token": this.token,
        Authorization: "Basic " + btoa(this.login + ":" + this.pwd), // btoa = encodage en base 64
      },
    })
      .then((response) => {
        console.log("data reçues dans getCards avant json() :", response);
        if (response.status === 200) return response.json();
        else throw new Error("Problème de réponse ", response);
      })
      .then((data) => {
        console.log("Data dans getCards : ", data);
        // on convertie les clefs backend pour les adapter
        // avant de les offrir à l'application frontend
        success(this.converter.convert(method, source, data));
      })
      .catch((error) => {
        console.log("Erreur attrapée dans getCards", error);
        failed(error);
      });
  };
}
export default FetchData;
