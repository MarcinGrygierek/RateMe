import React from 'react';
import Stars from './stars';

const Review = (props) => {
    console.log('review', props);

    let config = [{
        id: 1,
        title: "Jakość usługi",
        value: props.productRate
    },
    {
        id: 2,
        title: "Jakość obsługi",
        value: props.serviceRate
    },
    {
        id: 3,
        title: "Stosunek jakość/cena",
        value: props.ratioRate
    }];

    return (
        <section className="review">
            <div className="row">
                <Stars type="review" config={config} />
            </div>
            {props.comment ?
                <div className="row">
                    <div className="col-md-12 review-comment">
                        {props.comment}
                    </div>
                </div>
                : ''}
        </section>
    );
};

export default Review;