import React, { Component } from 'react';
import SearchResult from './searchResult';

const results = [
    {
        id: 1,
        title: 'Warsztat "U Ani"',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lectus massa, molestie et orci eu, porta pretium lectus. Vivamus elementum ut metus lobortis gravida.'
    },
    {
        id: 2,
        title: 'Janusz ProCars Inc.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lectus massa, molestie et orci eu, porta pretium lectus. Vivamus elementum ut metus lobortis gravida.'
    },
    {
        id: 3,
        title: 'EloAuto',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lectus massa, molestie et orci eu, porta pretium lectus. Vivamus elementum ut metus lobortis gravida.'
    }
];


export default class SearchResults extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(e) {
        this.setState({
            searchTerm: e.target.value
        });
    }

   /* shuffle(a) {
        let b = [];
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [b[i - 1], b[j]] = [a[j], a[i - 1]];
        }
        return b;
    }*/

    render() {
     /*   const shuffled = this.shuffle(results);
        console.log(shuffled);*/
        let renderedResults = results.map(r => <SearchResult key={r.id} id={r.id} title={r.title} description={r.description} />);
        
        return (

            <div>
                <h2 className="page-title">
                    Wyniki wyszukiwania
                </h2>
                {renderedResults}
            </div>
        );
    }
};