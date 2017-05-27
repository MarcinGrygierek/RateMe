import React, { Component } from 'react';
import { authService } from '../../app';
import $ from 'jquery';
import ProviderDashboard from './providerDashboard';

export default class ProviderPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            signed: authService.isSignedIn()
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

    handleEvent = (event, state) => {
        this.setState({
            signed: state
        })
    }

    componentDidMount() {
        $(document).on('changeState', this.handleEvent);
    }

    componentWillUnmount() {
        $(document).off('changeState', this.handleEvent);
    }

    render() {
        const isSigned = this.state.signed;
        return (
            <div className="col-md-6 col-md-offset-3 main-content">
                {!isSigned ? (
                    < div className="row" >

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
                    :
                    (<ProviderDashboard />)
                }
            </div>

        )
    }
}