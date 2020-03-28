import React from 'react';
import Deck from './Deck';
import * as Colyseus from "colyseus.js";
import { connect } from 'react-redux';
import { setRoom } from './ReduxStore/actions'

class LoginBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: ""
        };
    }

    handleInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    login = () => {
        var client = new Colyseus.Client('ws://localhost:2567');
        console.log("lerolero");
        client.joinOrCreate("pandemic-together-room").then(room => {
            console.log(room.sessionId, "joined", room.name);
            console.log(this.state.input);
            this.props.setRoom(room);
            room.onMessage((message) => {
                console.log(message);
            });

        }).catch(e => {
            console.log("JOIN ERROR", e);
        });
    }

    render() {
        return (
            <div className="login-box">
                <h1>Pandemic Together</h1>
                <input id="username" type="text" name="email" placeholder="Choose your username" value={this.state.input} onChange={this.handleInputChange} />
                <br />
                <button onClick={() => this.login()}>Join a Game</button>
                <br />
                <small>a collaborative game for staysafe gamejam</small>
            </div>
        );
    }
}

export default connect(null, {setRoom}) (LoginBox)
