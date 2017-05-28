import React, { Component } from 'react';
import StarsItem from './starsItem';
import { authService } from '../../app';
import { restService } from '../../app';

const service = {
    id: 108,
    title: 'Mordor',
    description: 'Najlepsze gry planszowe i powieści fantasy'
}

export default class AddReview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: '',
            service: null,
            ready: false,
            finished: false,
            serviceQuality: null,
            satisfaction: null,
            ratio: null
        }

        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        const token = this.props.routeParams.id;
        if (restService.use()) {
            restService.getServiceByToken(token).then((response) => {
                console.log(response.data);
                this.setState({
                    ready: true,
                    service: response.data
                })
            });
        }
        else {
            this.setState({
                ready: true,
                service: {
                    'clientID': 108,
                    'description': "Najlepsze gry planszowe i powieści fantasy",
                    'name': "Mordor"
                }
            })
        }

    }

    handleQualityChange = (count) => {
        this.setState({
            serviceQuality: count
        });
    }

    handleSatisfactionChange = (count) => {
        this.setState({
            satisfaction: count
        });
    }

    handleRatioChange = (count) => {
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
        if (!this.state.serviceQuality || !this.state.satisfaction || !this.state.ratio) {
            console.log('musisz dodać opinię!');
        }
        else {
            this.setState({
                finished: true
            })
        }
    }

    render() {
        const ready = this.state.ready;
        const finished = this.state.finished;
        return (
            <div className="col-md-12 main-box" >
                {!finished ? (
                    <div >
                        {ready ? (
                            <div>
                                <h2 className="page-title" > Jak oceniasz < span className="service-title" > {this.state.service.name}</span >?</h2 >
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
                        ) :
                            (<h1>Trwa ładowanie ładowanie zawartości...</h1>)}
                    </div >
                ) :
                    (
                        <h1>Dziękujemy za ocenienie < span className="service-title" > {this.state.service.name}</span ></h1>
                    )}

            </div >
        );
    }
};