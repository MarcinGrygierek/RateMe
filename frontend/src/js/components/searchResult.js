import React from 'react';
import {
    Link
} from 'react-router';

const SearchResult = (props) => {
    return (
        <figure>
            <figcaption>
                <Link to={`/services/${props.id}`}><h3> {props.title} </h3></Link>
            </figcaption>
            {props.description}
        </figure>
    );
};

export default SearchResult;