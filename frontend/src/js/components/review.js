import React from 'react';
import Stars from './stars';

const Review = (props) => {
    const config = [{
        id: 1,
        title: "Jakość usługi",
        value: props.ratings.serviceQuality
    },
    {
        id: 2,
        title: "Jakość obsługi",
        value: props.ratings.satisfaction
    },
    {
        id: 3,
        title: "Stosunek jakość/cena",
        value: props.ratings.ratio
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