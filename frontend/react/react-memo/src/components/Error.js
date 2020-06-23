import React from "react";


export default function Error(props) {
  return (
  <main className="container text-center">
    <div className="row">
      <div className="col">
        <h1>
          {props.location.state.error}
        </h1>
      </div>
    </div>
  </main>);
  
}
