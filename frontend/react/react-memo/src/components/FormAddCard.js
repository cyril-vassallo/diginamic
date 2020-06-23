import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function FormAddCard(props) {
  function handleSubmit(event) {
    event.preventDefault();
    const question = event.target.querySelector("#input-question").value;
    const response = event.target.querySelector("#input-response").value;
    props.addCard(question, response, props.index);
  }

  const onHideForm = () => {
    props.onHideFormAddCard();
  };

  return (
    <Modal show={true} onHide={onHideForm} animation={false}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Créer une carte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>
            Question :
            <input type="text" defaultValue="" id="input-question" />
          </label>
          <label>
            Réponse :
            <input type="text" defaultValue="" id="input-response" />
          </label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHideForm}>
            Annuler
          </Button>
          <Button variant="success" type="submit">
            Enregistrer
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default FormAddCard;
