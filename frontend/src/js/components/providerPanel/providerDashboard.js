import React, { Component } from 'react';
import { authService } from '../../app';
import $ from 'jquery';
import ProviderDashboardTiles from './providerDashboardTiles';
import CodeGenerator from './codeGenerator';

export default class ProviderDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            component: <ProviderDashboardTiles generateCode={this.generateCode} />
        }
    }

    generateCode = (e) => {
        this.setState({
            component: <CodeGenerator token="leleleleleel" />
        })
        e.preventDefault();

    }

    render() {
        return (
            <div>
                {this.state.component}
            </div>
        )
    }
}