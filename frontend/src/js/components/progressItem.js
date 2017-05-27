import React from 'react';

const ProgressItem = (props) => {
    const progressWidth = {
        width: `${(props.value * 100) / 5.0 }%`
    };

    return (
        <div>
            <h3 className="rating-heading">{props.title}</h3>
            <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow={props.value}
                    aria-valuemin="0" aria-valuemax="5" style={progressWidth}>
                </div>
                <span className="progress-bar-value">{props.value}</span>
            </div>
        </div>
    );
};

export default ProgressItem;