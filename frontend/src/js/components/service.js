import React from 'react';
import Stars from './stars';
import Reviews from './reviews';

const service = {
  title: 'Warsztat u Ani',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean velit urna, condimentum ut cursus sed, aliquam at tellus. Nulla consequat lectus ut neque condimentum eleifend. Mauris tincidunt augue ac nulla aliquam, ut tincidunt est suscipit. Donec enim turpis, dapibus vitae viverra a, pharetra eget ligula.',
  serviceQuality: 4.4,
  satisfaction: 4.2,
  ratio: 5,
  reviews: [
    {
      id: 1,
      ratings: {
        serviceQuality: 4,
        satisfaction: 4,
        ratio: 5
      },
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: 2,
      ratings: {
        serviceQuality: 1,
        satisfaction: 1,
        ratio: 2
      }
    },
    {
      id: 3,
      ratings: {
        serviceQuality: 3,
        satisfaction: 3,
        ratio: 4
      },
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
  ]

}
const Service = () => {
  const starsConfig = [
    {
      id: 1,
      title: "Jakość usługi",
      value: service.serviceQuality
    },
    {
      id: 2,
      title: "Jakość obsługi",
      value: service.satisfaction
    },
    {
      id: 3,
      title: "Stosunek jakość/cena",
      value: service.ratio
    }
  ];

  console.log();
  return (
    <div>
      <div className="col-md-12">
        <h2>{service.title}</h2>
      </div>
      <div className="col-md-6 service-description">
        {service.description}
      </div>
      <div className="col-md-6">
        <Stars type="overview" config={starsConfig} />
      </div>
      <div className="col-xs-12">
        <hr />
        <Reviews reviews={service.reviews} />
      </div>
    </div>
  );
};

export default Service;