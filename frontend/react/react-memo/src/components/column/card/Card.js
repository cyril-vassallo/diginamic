import React from 'react'

const Card = (props) => {

  function onClickShowCardAnswer(event) {
    event.target.style.display = "block";

  }


    return (
      <article className="card my-3 p-3 bg-secondary text-white shadow">
        <h3 onClick={event => { onClickShowCardAnswer(event)}} className="d-flex flex-direction column">{props.card.question}</h3>
        <h4 style={{display:"none"}}>{props.card.answer}</h4>
        <div>
          <button className="btn btn-warning">Proposer une réponse</button>
          <img
            src="http://localhost:3000/svg/wheel.svg"
            alt="éditer la catégorie"
            className="ml-5"
          />
        </div>
      </article>
    );
}
 
export default Card;