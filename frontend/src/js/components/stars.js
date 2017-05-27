import React from 'react';
import StarsItem from './starsItem';
import ProgressItem from './progressItem';

const Stars = (props) => {
    let stars = null;
    if ("overview" === props.type)
        stars = props.config.map(item => <ProgressItem key={item.id} title={item.title} value={item.value} />);
    else if ("review" === props.type)
        stars = props.config.map(item => <div className="col-md-4"><StarsItem key={item.id} title={item.title} value={item.value} /></div>);
    return (
        <section className="rating">
            {stars}
        </section>
    );
};

export default Stars;