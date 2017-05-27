import React, { Component } from 'react';
import {
    Link
} from 'react-router';

import $ from 'jquery';

window.$ = window.jQuery = require('jquery');
var Bootstrap = require('bootstrap-sass');
Bootstrap.$ = $;
require('../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap');

import { authService } from '../app';

export default class Header extends Component {
    constructor(props) {
        super(props);
        console.log('constructor');

        if (authService.isSignedIn()) {
            this.state = {
                menuElements: <ul className="nav navbar-nav">
                    <li>
                        <Link to="/providerPanel">Panel</Link>
                    </li>
                    <li>
                        <a href='#' onClick={this.logout}>Wyloguj</a>
                    </li>
                </ul>
            }
        }
        else {
            this.state = {
                menuElements: <ul className="nav navbar-nav">
                    <li>
                        <Link to="/providerPanel/dashboard">Panel</Link>
                    </li>
                    <li>
                        <Link to="/providerPanel">Panel usługodawcy</Link>
                    </li>
                </ul>
            }
        }
    }

    componentDidMount() {
        $(".collapse").collapse();
        $(document).on('changeState', this.handleEvent);
    }

    handleEvent = (event, state) => {
        if (authService.isSignedIn()) {
            this.setState({
                menuElements: <ul className="nav navbar-nav">
                    <li>
                        <Link to="/providerPanel">Panel</Link>
                    </li>
                    <li>
                        <a href='#' onClick={this.logout}>Wyloguj</a>
                    </li>
                </ul>
            })
        }

        else {
            this.setState({
                menuElements: <ul className="nav navbar-nav">
                    <li>
                        <Link to="/">Panel klienta</Link>
                    </li>
                    <li>
                        <Link to="/providerPanel">Panel usługodawcy</Link>
                    </li>
                </ul>
            })
        }
    }

    componentWillUnmount() {
        $(document).off('changeState', this.handleEvent);
    }

    logout = () => {
        if (authService.logout()) {
            $(document).trigger('changeState', [false]);
        }
    }

    render() {
        return (
            <header id="top-header">
                <nav className="navbar navbar-default">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                                aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>

                            <Link to="/" className="navbar-brand">
                                <img className="site-logo site-logo-main" src="images/logo.png" alt="RateMe" />
                            </Link>

                        </div>
                        <div id="navbar" className="navbar-right navbar-collapse collapse">

                            {this.state.menuElements}

                        </div>

                    </div>
                </nav >
            </header >
        )
    }
}