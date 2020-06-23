import React from "react";
import Card from './card/Card';


const Column = (props) => {

  
  return (
    <section className="col">
      <div className="container-fluid ">
        <div className="row">
          <div className="col-2">
            <button
              onClick={props.onClickAddCard}
              className="btn btn-success mr-2"
            >
              +
            </button>
          </div>
          <div className="col-8">
            <h2 className="h4">{props.column.title}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {props.column.cards.map(card => (
              <Card key={card.id} card={card} />
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Column;
