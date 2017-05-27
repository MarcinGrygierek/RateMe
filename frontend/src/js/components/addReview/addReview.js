import React, { Component } from 'react';
import StarsItem from './starsItem';

const service = {
    id: 12,
    title: 'Warsztat u Ani',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean velit urna, condimentum ut cursus sed, aliquam at tellus. Nulla consequat lectus ut neque condimentum eleifend. Mauris tincidunt augue ac nulla aliquam, ut tincidunt est suscipit. Donec enim turpis, dapibus vitae viverra a, pharetra eget ligula.'
}

export default class AddReview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: '',
            serviceQuality: null,
            satisfaction: null,
            ratio: null
        }

        // this.handleQualityChange = this.handleQualityChange.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSatisfactionChange = this.handleSatisfactionChange.bind(this);
        // this.handleRatioChange = this.handleRatioChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        console.log(this);
        const token = this.props.routeParams.id;
        console.log(token);
    }

    handleQualityChange = (count) => {
        this.setState({
            serviceQuality: count
        });
    }

    handleSatisfactionChange = (count) => {
        console.log('satisfaction');
        this.setState({
            satisfaction: count
        });
    }

    handleRatioChange = (count) => {
        console.log('ratio');
        this.setState({
            ratio: count
        });
    }

    handleChange = (e, count) => {
        this.setState({
            comment: e.target.value
        });
    }

    handleSave(e) {
        if(!this.state.serviceQuality || !this.state.satisfaction || !this.state.ratio) {
            console.log('chyba nie');
        }
        else console.log(this.state);
    }

    render() {
        return (
            <div>
                <div className="col-md-12 main-box">
                    <h2 className="page-title">Jak oceniasz <span className="service-title">{service.title}</span>?</h2>
                    <section className="rating">
                        <StarsItem key="1" handleChange={this.handleQualityChange} title="Jakość usługi" />
                        <StarsItem key="2" handleChange={this.handleSatisfactionChange} title="Jakość obsługi" />
                        <StarsItem key="3" handleChange={this.handleRatioChange} title="Stosunek jakość/cena" />
                    </section>
                    <div className="rating-comment">
                        <h3 className="rating-heading">Komentarz</h3>
                        <textarea onChange={this.handleChange} className="form-control" placeholder="Dodaj opcjonalny komentarz">{this.state.comment}</textarea>
                    </div>
                    <button onClick={this.handleSave} className="btn btn-lg btn-primary">Dodaj opinię</button>
                </div>

            </div>
        );
    }
};