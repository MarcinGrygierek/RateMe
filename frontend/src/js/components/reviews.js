import React from 'react';
import Review from './review';

const Reviews = (props) => {
    console.log('props', props);
    let reviews = '';
    if (props.reviews) {
        reviews = props.reviews.map(item => <Review key={item.id} type="review" comment={item.comment}
            serviceRate={item.serviceRate}
            productRate={item.productRate}
            ratioRate={item.ratioRate} />);
    }

    return (
        <section className="reviews">
            <h3>Opinie klientów</h3>
            {reviews}
        </section>
    );
};

export default Reviews;