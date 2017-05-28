import React, { Component } from 'react';
import { authService } from '../app';
import $ from 'jquery';
import ProviderDashboard from './providerPanel/providerDashboard';
import ClientDashboard from './clientPanel/clientDashboard';

export default class AdminPanel extends Component {
    constructor(props) {
        const signed = authService.isSignedIn();
        let component = null;
        if (signed) {
            if ("ROLE_SERVICE" === authService.getRole())
                component = <ProviderDashboard />;
            else if ("ROLE_CLIENT" === authService.getRole())
                component = <ClientDashboard />;
        }
        super(props);
        this.state = {
            login: '',
            password: '',
            signed: authService.isSignedIn(),
            component: component
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
        if (authService.login(this.state.login, this.state.password)) {
            $(document).trigger("changeState", [true]);
        };
    }

    handleEvent = (event, state) => {
        if (state) {
            let component = null;
            if ("ROLE_SERVICE" === authService.getRole())
                component = <ProviderDashboard />;
            else if ("ROLE_CLIENT" === authService.getRole())
                component = <ClientDashboard />;
            console.log(component);
            this.setState({
                signed: state,
                component: component
            })
        }
        else {
            this.setState({
                signed: state,
                component: null
            })
        }
    }

    componentDidMount() {
        $(document).on('changeState', this.handleEvent);
    }

    componentWillUnmount() {
        $(document).off('changeState', this.handleEvent);
    }

    render() {
        const isSigned = this.state.signed;
        console.log(this.state.component);
        return (
            <main className="container centered">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3 main-content">
                        {isSigned ? (this.state.component)
                            :
                            (
                                < div >

                                    <div className="form-group main-box login-box">
                                        <input type="email"
                                            onChange={e => this.handleLoginChange(e)}
                                            className="form-control main-field" placeholder="Email..."
                                            value={this.state.login}
                                        />
                                        <input type="password"
                                            onChange={e => this.handlePasswordChange(e)}
                                            className="form-control main-field" placeholder="Hasło..."
                                            value={this.state.password}
                                        />
                                        <button onClick={this.handleLogin}
                                            className="btn btn-lg btn-primary">
                                            Zaloguj się
                                        </button>
                                    </div>
                                </div>)
                        }
                    </div>
                </div>
            </main>

        )
    }
}