import React from 'react';

const ProviderDashboardTiles = (props) => {
    const progressWidth = {
        width: `${(props.value * 100) / 5.0}%`
    };

    return (
        <div className="row">
            <div className="col-sm-6">
                <button onClick={props.generateCode} className="tile">
                    <h2 className="tile-title">Generuj kod</h2>
                </button>
            </div>
            <div className="col-sm-6">
                <div className="tile">
                    <h2 className="tile-title">Ustawienia</h2>
                </div>
            </div>
        </div>
    );
};

export default ProviderDashboardTiles;