import React from 'react';


function Message ({message,type}) {
    return(
        <div className="row">
            <div className="col">
                <p className={`alert alert-${type}`}>{message}</p>
            </div>
        </div>
    )
    
}

export default  Message;