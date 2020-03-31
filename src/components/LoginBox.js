import React from 'react';
import * as Colyseus from "colyseus.js";
import { connect } from 'react-redux';
import { setRoom, setRoomState } from './ReduxStore/actions'

//const serverUrl = (process.env.NODE_ENV === 'production') ?  'ws://pandemic-together-client.herokuapp.com:2567' : 'ws://localhost:2567'
const serverUrl = (window.location.hostname.indexOf("herokuapp") === -1)
    ? "ws://localhost:2567" // development (local)
    : "ws://pandemic-together-server.herokuapp.com" // production (remote)

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
        var client = new Colyseus.Client(serverUrl);
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
                this.props.setRoomState(state);
            });

            room.onStateChange((state) => {
                console.log("the room state has been updated:", state);
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
