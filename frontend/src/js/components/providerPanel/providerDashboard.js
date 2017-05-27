import React, { Component } from 'react';
import { authService } from '../../app';
import $ from 'jquery';

import ProviderDashboardTiles from './providerDashboardTiles';
import GeneratedCode from './generatedCode';

export default class ProviderDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            component: <ProviderDashboardTiles generateCode={this.generateCode} />
        }
    }

    handleLoginChange(e) {
        this.setState({
            login: e.target.value
        });
    }


    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin = () => {
        if (authService.providerLogin(this.state.login, this.state.password)) {
            $(document).trigger("changeState", [true]);
        };
    }

    generateCode = (e) => {
        console.log('generating code')
        this.setState({
            component: <GeneratedCode />
        })
        e.preventDefault();

    }

    render() {
        return (
            <div>
                { this.state.component }
            </div>
        )
    }
}