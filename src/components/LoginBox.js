import React from 'react';
import Deck from './Deck';
import * as Colyseus from "colyseus.js";
import { connect } from 'react-redux';
import { setRoom, setRoomState } from './ReduxStore/actions'

function mapStateToProps(state) {
    return {
        room : state.room,
    }
}

class LoginBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: "",
            room: this.props.room,
        };
    }

    handleInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    login = () => {
        var client = new Colyseus.Client('ws://localhost:2567');
        client.joinOrCreate("pandemic-together-room", {name:this.state.input}).then(room => {
            console.log(room.sessionId, "joined", room.name);
            console.log("roomState", room.state);

            room.state.players.onAdd = function(player, i) {
                console.log("player joined!", player);
            };

            room.onMessage((message) => {
                console.log(message);
            });

            room.onStateChange.once((state) => {
                console.log("this is the first room state!", state);
                console.log("currentTurn", state.currentTurn);
                console.log("playerName", state.players);
                this.props.setRoomState(state);
            });

            room.onStateChange((state) => {
                console.log("the room state has been updated:", state);
                console.log("currentTurn", state.currentTurn);
                console.log("playerName", state.players);
                this.props.setRoomState(state);
            });
            this.props.setRoom(room);
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

export default connect(mapStateToProps, {setRoom, setRoomState}) (LoginBox)
