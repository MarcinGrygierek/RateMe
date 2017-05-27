import React from 'react';

const StarsItem = (props) => {
    let stars = [];

    for (let i = 0; i < props.value; i++) {
        stars.push(<span key={i} className='star glyphicon glyphicon-star'></span>);
    }

    return (
        <div>
            <h4 className="rating-heading">{props.title}</h4>
            <div className="stars">
                {stars}
            </div>
        </div>
    );
};

export default StarsItem;