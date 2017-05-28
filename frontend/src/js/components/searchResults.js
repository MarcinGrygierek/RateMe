import React, { Component } from 'react';
import SearchResult from './searchResult';
import { restService } from '../app';

const records = [
    {
        clientID: 101,
        name: "Sławex",
        email: "slawex@slawex.pl",
        description: "Kompleksowe usługi w dziedzinie hydrualiki"
    },
    {
        clientID: 102,
        name: "Korpopol",
        email: "admin@korpopol.pl",
        description: "Administracja systemami IT"
    },
    {
        clientID: 103,
        name: "BrzePower",
        email: "brze@brzepower.eu",
        description: "Energia odnawialna w twoim domu!"
    },
    {
        clientID: 104,
        name: "DomDom",
        email: "dom@dom.pl",
        description: "Agencja nieruchomości"
    },
    {
        clientID: 105,
        name: "Jedzonko.pl",
        email: "kontakt@jedzonko.pl",
        description: "Catering dla firm"
    },
    {
        clientID: 106,
        name: "Singleton",
        email: "napisz@singleton.pl",
        description: "Najlepszy outsourcing IT w Małopolsce"
    },
    {
        clientID: 107,
        name: "SzybkaRandka",
        email: "szybka@randka.pl",
        description: "Łączymy ludzi!"
    },
    {
        clientID: 108,
        name: "Mordor",
        email: "ork@mordor.pl",
        description: "Najlepsze gry planszowe i powieści fantasy"
    }


]

export default class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: null,
            ready: false
        }
    }

    componentDidMount() {
        if (restService.use()) {
            restService.getServices(this.props.routeParams.term).then((response) => {
                console.log(response.data);
                this.setState({
                    results: response.data,
                    ready: true
                })
            });
        }
        else {
            const filtered = records.filter(r => r.name.toLowerCase().includes(this.props.routeParams.term.toLowerCase()));
            this.setState({
                results: filtered,
                ready: true
            })
        }
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