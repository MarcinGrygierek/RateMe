import React, { Component } from 'react';

export default class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange(e) {
        this.setState({
            searchTerm: e.target.value
        });
    }

    handleSearch(e) {
        this.props.handleSearch(this.state.searchTerm);
    }


    render() {
        return (
            <div className="form-group main-box search-box">
                <input type="search"
                    onChange={e => this.handleChange(e)}
                    className="form-control main-field" placeholder="Wyszukaj interesujący Cię biznes/lokalizację..."
                    value={this.state.searchTerm}
                />
                <button onClick={this.handleSearch}
                    className="btn btn-lg btn-primary">
                    Wyszukaj
                    </button>
            </div>
        );
    }
};