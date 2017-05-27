import React, { Component } from 'react';
import { authService } from '../../app';
import $ from 'jquery';

export default class ClientDashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="client-summary">
                <h2>Witaj, {authService.getEmail()}</h2>
                <h3>Liczba zgromadzonych punktów:</h3><span className="points-count">10</span>
                Oceniaj regularnie aby zdobyć kolejne punkty, które możesz później wymienić na rabaty u naszych partnerów.
            </div>
        )
    }
}