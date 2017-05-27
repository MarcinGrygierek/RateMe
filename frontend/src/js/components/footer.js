import React, { Component } from 'react';

export default class Footer extends Component {
    constructor(props) {
        super(props);
    }
    
    render () {
        return (
            <footer>
                RateMe, crafted with <span className="heart glyphicon glyphicon-heart"></span> at Jazzy Hackaton
            </footer>
        )
    }
}