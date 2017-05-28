import React, { Component } from 'react';
import SearchResult from './searchResult';
import { restService } from '../app';

export default class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: null,
            ready: false
        }
    }

    componentDidMount() {
        restService.getServices(this.props.routeParams.term).then((response) => {
            console.log(response.data);
            this.setState({
                results: response.data,
                ready: true
            })
        });
    }

    render() {
        const ready = this.state.ready;
        let renderedResults = '';
        if (true === ready)
            renderedResults = this.state.results.map(r => <SearchResult key={r.clientID} id={r.clientID} title={r.name} description={r.description} />);

        return (
            <main className="container">
                <div>
                    <h2 className="page-title">
                        Wyniki wyszukiwania
                </h2>
                    {renderedResults}
                </div>
            </main>
        );
    }
};