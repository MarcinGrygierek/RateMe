import React, { Component } from 'react';

import SearchBox from './searchBox';
import TokenBox from './tokenBox';
import MainDescription from './mainDescription';
import MainSwitch from './mainSwitch';
import Logo from './logo';

import {
    Router,
    Route,
    Link,
    hashHistory
} from 'react-router';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'search',
            box: <SearchBox handleSearch={this.handleSearch} />
        }
    }


    changeTab = (tab) => {
        console.log(this);
        console.log(tab);

        if ('search' === tab) {
            this.setState({
                box: <SearchBox handleSearch={this.handleSearch} />
            });
        }
        else if ('enter-token' === tab) {
            this.setState({
                box: <TokenBox />
            })
        }
    }

    handleSearch = (term) => {
        console.log(this);
        console.log(term);
        this.props.navigate();
        //hashHistory.push('/search');
    }

    render() {
        return (
           
                <div className="row">
                    <div className="col-md-6 col-md-offset-3 main-content">
                        <Logo />
                        <MainSwitch change={this.changeTab} />
                        {this.state.box}
                        <MainDescription />
                    </div>
                </div>

        )
    }
}