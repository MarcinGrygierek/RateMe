import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import {
    Router,
    Route,
    IndexRoute,
    hashHistory,
    Link
} from 'react-router';

import RestService from './services/restService';
import AuthService from './services/authService';

import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import SearchResults from './components/searchResults';
import Service from './components/service';
import Services from './components/services';
import ProviderPanel from './components/providerPanel/providerPanel';
import AddReview from './components/addReview/addReview';

export const restService = new RestService();
export const authService = new AuthService();

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
        this.state = {
            signed: false
        }
    }

    handleEvent = (event, state) => {
        this.setState({
            signed: state
        })
    }

    componentDidMount() {
        $(document).on('changeState', this.handleEvent);
    }

    componentWillUnmount() {
        $(document).off('changeState', this.handleEvent);
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

ReactDOM.render(
    <Router history={hashHistory}>

        <Route path="/" component={RateMeApp} >
            <IndexRoute component={MainWrapper} />
            <Route path="search" component={SearchResults} />
            <Route path="services/:id" component={Service} />
            <Route path="providerPanel" component={ProviderPanel}>
                <IndexRoute component={ProviderPanel} />
            </Route>
            <Route path="addReview/:id" component={AddReview} />
        </Route>
    </Router>
    ,
    document.getElementById('app')
)
