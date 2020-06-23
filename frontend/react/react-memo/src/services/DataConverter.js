/**
 * Class DataConverter
 *
 * Cette classe permet au développeur font-end et back-end
 * de travailler avec les noms de variables qu'il souhaitent
 * il faut néanmoins faire un rapprochement entre les données front-end
 * et back-end dans cette classe ce qui représente du temps supplémentaire
 * en développement qui peut être évité avec une bonne organisation.
 */
export default class DataConverter {
  /**
   * Permet d'automatiser la sélection du converter
   * en fonction des paramètres method et source lors qu'elle est appellée.
   * Il est facile de créer une méthode convertisseuse supplémentaire
   * et de l'ajouter dans les différents switch cases selon le verbe HTTP
   *
   * @param {string} method
   * @param {string} source
   * @param {object} data
   */
  convert(method = "GET", source = "NO", data = [])  {
    if (method === "GET") {
      switch (source) {
        case "memo/list_cartes_term/":
          return this.convertColumnsData(data);
        default:
          break;
      }
    } else if (method === "POST") {
      switch (source) {
        case "memo/source_pour_sauvegarder_une_carte/":
          return this.convertSingleCardData(data);
        default:
          break;
      }
    } else if (method === "PUT") {
      switch (source) {
        case "memo/source_pour_mettre_a_jour/":
          return "";
        default:
          break;
      }
    }
  }

  /**
   * Permet de renommer les clefs reçues en Français depuis l'API drupal
   * (fonctionne)
   * @param {array} columns
   */
  convertColumnsData(columns) {
    return columns.map((column) => {
      return {
        id: column.id,
        title: column.name,
        cards: column.cartes.map((carte) => {
          return {
            column: carte.colonne,
            id: carte.id,
            question: carte.question,
            answer: carte.reponse,
            explanation: carte.explication,
          };
        }),
      };
    });
  }

  /**
   * Permet de renommer les clefs d'une carte avant la soumission en POST vers l'api Drupal
   * (à tester...)
   * @param {array} card
   */
  convertSingleCardData(card) {
    return card.map((param) => {
      return {
        id: param.id,
        question: param.question,
        reponse: param.answer,
        explication: param.explanation,
      };
    });
  }
}
