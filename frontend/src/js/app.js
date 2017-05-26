import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';

import RestService from './services/restService';
export const restService = new RestService();

import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';

class RateMeApp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                <Main />
                <Footer />
            </div>
        )
    }
}

ReactDOM.render(
        <Router history={browserHistory}>
            <Route path="/" component={RateMeApp}>
                <IndexRoute component={RateMeApp} />
            </Route>

        </Router>,
    document.getElementById('content')
)