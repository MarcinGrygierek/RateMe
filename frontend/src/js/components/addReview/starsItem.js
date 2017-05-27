import React, { Component } from 'react';

export default class StarsItem extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const props = this.props;
        console.log(props);
        $('.star').hover(function () {
            $(this).prevAll().addClass('hovered');
            $(this).nextAll().removeClass('hovered');
        }, function () {
            $('.star').removeClass('hovered');
        })

        $('.star').on('click', function () {
            $(this).addClass('active').prevAll().addClass('active');
            $(this).nextAll().removeClass('active');
            const count = $(this).data('id');
        });

    }

    render() {
        let stars = [1, 2, 3, 4, 5];

        const mappedStars = stars.map(e => <a key={e} onClick={() => this.props.handleChange(e)} className="star" data-id={e}><span className="glyphicon glyphicon-star"></span></a>)

        return (
            <div className="rating-stars">
                <h3 className="rating-heading">{this.props.title}</h3>
                <div className="stars">
                    {mappedStars}
                </div>
            </div>
        );
    }
};