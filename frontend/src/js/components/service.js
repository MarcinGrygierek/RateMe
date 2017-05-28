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
    if (restService.use()) {
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
    }
    else {
      this.setState({
        loading: false,
        service: {
          'clientID': 108,
          'description': "Najlepsze gry planszowe i powieści fantasy",
          'name': "Mordor",
          'averageProductRate': 5,
          'averageRatioRate': 3,
          'averageServiceRate': 3,
          votes: [{
            'comment': "Pierwszy dystrybutor ulubionej gry planszowej w Polsce! Niemiły nowy kasjer",
            'id': 15,
            'productRate': 4,
            'ratioRate': 3,
            'serviceRate': 2,
          },
          {
            'comment': "Pierwszy dystrybutor w Polsce nowej części ulubionej serii fantasy",
            'id': 16,
            'productRate': 5,
            'ratioRate': 5,
            'serviceRate': 4,
          }]
        },
        starsConfig: [
          {
            id: 1,
            title: "Jakość usługi",
            value: 3
          },
          {
            id: 2,
            title: "Jakość obsługi",
            value: 4
          },
          {
            id: 3,
            title: "Stosunek jakość/cena",
            value: 5
          }
        ]
      })
    }
    console.log('state', this.state);
  }
  render() {
    const ready = this.state.loading;
    return (
      <main className="container">

        {
          ready ? (<h1>Trwa ładowanie zawartości...</h1>)
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