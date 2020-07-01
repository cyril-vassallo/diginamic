import React from 'react';

const Error = ({error}) => {
    return ( 

        <div className="row">
            <div className="col-12">
                <p className="alert alert-danger">{error}</p>
            </div> 
        </div>
         );
}
 
export default Error;