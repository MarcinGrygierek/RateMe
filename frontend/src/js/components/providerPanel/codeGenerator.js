import React, { Component } from 'react';
import QRCode from 'qrcode.react';

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
        this.setState({
            ready: true
        })
    }


    render() {
        const ready = this.state.ready;
        return (
            <div>
                {ready ? (
                    <section className="QRCode">
                        <QRCode size="512" value="http://facebook.github.io/react/" />
                    </section>
                ) : (
                        <div className="form-group main-box search-box">
                            <input type="text"
                                onChange={e => this.handleChange(e)}
                                className="form-control main-field" placeholder="Podaj swój login..."
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