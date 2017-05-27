import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
    Router,
    Route,
    IndexRoute,
    hashHistory,
    Link
} from 'react-router';

import RestService from './services/restService';

import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import SearchResults from './components/searchResults';
import Service from './components/service';
import Services from './components/services';

export const restService = new RestService();

const navigate = () => {
    hashHistory.push('/search');
}


const MainWrapper = () => {
    return (
        <Main navigate={navigate} />
    )
}

class RateMeApp extends Component {
    constructor(props) {
        super(props);
    }




    render() {
        return (
            <div id="content">
                <Header />
                <main className="container">
                    {this.props.children}
                </main>
                <Footer />
            </div>
        )
    }
}
//hashHistory.push('/search');
ReactDOM.render(
    <Router history={hashHistory}>

        <Route path="/" component={RateMeApp} >
            <IndexRoute component={MainWrapper} />
            <Route path="search" component={SearchResults} />
            <Route path="services/:id" component={Service} />
        </Route>
    </Router>
    ,
    document.getElementById('app')
)
