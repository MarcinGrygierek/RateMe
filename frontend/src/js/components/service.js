import React, { Component } from 'react';
import Stars from './stars';
import Reviews from './reviews';
import { restService } from '../app';

export default class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      service: null,
      starsConfig: null
    }
  }

  componentDidMount() {
    restService.getService(this.props.routeParams.id).then((response) => {
      console.log('data', response.data);
      this.setState({
        loading: false,
        service: response.data,
        starsConfig: [
          {
            id: 1,
            title: "Jakość usługi",
            value: response.data.averageProductRate
          },
          {
            id: 2,
            title: "Jakość obsługi",
            value: response.data.averageServiceRate
          },
          {
            id: 3,
            title: "Stosunek jakość/cena",
            value: response.data.averageRatioRate
          }
        ]
      })
    })
    console.log('state', this.state);
  }
  render() {
    const ready = this.state.loading;
    return (
      <main className="container">

        {
          ready ? (<h1>elo</h1>)
            :
            (
              <div className="row">
                <div className="col-md-12">
                  <h2>{this.state.service.name}</h2 >
                </div >
                <div className="col-md-6 service-description">
                  {this.state.service.description}
                </div>
                <div className="col-md-6">
                  <Stars type="overview" config={this.state.starsConfig} />
                </div>
                <div className="col-xs-12">
                  <hr />
                  <Reviews reviews={this.state.service.votes} />
                </div>
              </div>
            )
        }
      </main >
    );
  }
};