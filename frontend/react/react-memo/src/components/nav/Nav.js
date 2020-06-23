import React from "react";

export default function Nav(props) {
  function getBtnClass(selected) {
    return selected ? "btn-warning" : "btn-secondary";
  }

  return (
    <nav>
      <ul className="d-flex justify-content-center list-unstyled my-4">
        <button className="btn btn-success align-items-start m-2 px-3">
          +
        </button>
        {props.terms.map((term) => (
          <li
            onClick={(event) => {
              props.onClickTerm(event, term.id);
            }}
            id={term.id}
            className={`m-2 p-2 btn ${getBtnClass(term.selected)}`}
            key={term.id}
          >
            <img
              src="http://localhost:3000/svg/wheel.svg"
              alt="éditer la catégorie"
              className="mr-2"
            />
            {term.name}
          </li>
        ))}
      </ul>
    </nav>
  );
}
