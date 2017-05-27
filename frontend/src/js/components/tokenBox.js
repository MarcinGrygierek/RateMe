import React from 'react';

const TokenBox = () => {
    return (
        <div className="form-group main-box token-box">
            <input type="search" className="form-control main-field" placeholder="Wprowadź token..." />
            <button className="btn btn-lg btn-primary">Wprowadź</button>
        </div>
    );
};

export default TokenBox;