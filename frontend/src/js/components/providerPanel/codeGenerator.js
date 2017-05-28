import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import { authService } from '../../app';
import { restService } from '../../app';

export default class CodeGenerator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            ready: false
        }
    }

    handleChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    handleSave = (e) => {
        console.log(this.state.name, this.props.token);
        if (restService.use()) {
            restService.generateCode(this.state.name, authService.getId()).then((response) => {
                console.log(response.data);
                if ('Ok' === response.data.status) {
                    this.setState({
                        ready: true,
                        token: `http://showcase.itdotfocus.com/rateme/#/addReview/${response.data.hashText}`
                    })
                }
            });
        }
        else {
            this.setState({
                ready: true,
                token: `http://showcase.itdotfocus.com/rateme/#/addReview/80A876D93F40249F19E34BD85E2471B7551BAFC349D86FEE81049AF37F35FE4A`
            })
        }

    }


    render() {
        const ready = this.state.ready;
        return (
            <div>
                {ready ? (
                    <section className="QRCode">
                        <QRCode size="512" value={this.state.token} />
                    </section>
                ) : (
                        <div className="form-group main-box search-box">
                            <input type="text"
                                onChange={e => this.handleChange(e)}
                                className="form-control main-field" placeholder="Podaj swój identyfikator..."
                                value={this.state.name}
                            />
                            <button onClick={this.handleSave}
                                className="btn btn-lg btn-primary">
                                Wyślij
                            </button>
                        </div>)}

            </div>
        );
    }
};