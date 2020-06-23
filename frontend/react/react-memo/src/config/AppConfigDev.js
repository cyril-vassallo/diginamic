const Conf = {
  app: {
    DOMAINE: "http://localhost:3000/", // CRÉER UN FICHIER DIFFÉRENT POUR LA PROD
  },

  api: {
    GET_TOKEN_URL: "http://www.coopernet.fr/rest/session/tokn/",
    END_POINT: "http://www.coopernet.fr/",
    LOGIN: "cyrilvssll34",
    PASSWORD: "cyrilvssll34",
    USER_ID: 89,
    source: {
      GET_TERMS_SRC: "memo/themes/",
      GET_CARDS_SRC: "memo/list_cartes_term/",
    },
  },
};
export default Conf;
