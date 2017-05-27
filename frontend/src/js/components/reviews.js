import React from 'react';
import Review from './review';

const Reviews = (props) => {
    const reviews = props.reviews.map(item => <Review key={item.id} type="review" comment={item.comment} ratings={item.ratings} />);
    return (
        <section className="reviews">
            {reviews}
        </section>
    );
};

export default Reviews;