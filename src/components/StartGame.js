import React from 'react';
import { connect } from 'react-redux';
import { login, startGame, removeMobileUrlBar, startBot } from './../redux/actions'
import ChatRoom from './shared/ChatRoom';
import HowToPlayGuide from './HowToPlayGuide';
import * as Constants from './../common/constants';


function mapStateToProps(state) {
    return {
        roomState: state.roomState,
        isLoading: state.isLoading,
        bots: state.bots,
        updatesOnRoomState: state.updatesOnRoomState,
    }
}

class StartGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ""
        };
    }

    usedBotNames = [];
    botNames = ["Dannel", "Giskard", "Andrew", "Norby", "Emma-2", "Brackenridge", "Tony", "Lenny", "Speedie", "Robbie", "Z-1", "Z-2", "Z-3", "L-76", "Ez-27" ];
    generateBotName() {
        var arrayOfUnusedNames = this.botNames.filter(item => !this.usedBotNames.includes(item));
        var index = Math.floor(Math.random() * arrayOfUnusedNames.length);
        var name = arrayOfUnusedNames[index];
        this.usedBotNames.push(name);
        return name + "_bot";
    }

    onChange_UpdateUserName = (event) => {
        this.setState({ username: event.target.value });
    }

    onKeyUp_SubmitOnEnter = (event) => {
        if (event.keyCode === 13) {
            this.props.login(this.state.username);
        }
    }

    onClick_Login = () => {
        this.props.login(this.state.username);
    }

    onClick_StartGame() {
        this.props.startGame();
    }

    onClick_StartBot() {
        this.props.startBot(this.generateBotName());
    }

    render() {
        return <div className="start-game" style={{ backgroundImage: "url(/images/background_table.jpg)" }}>
            <div className="content">
                <div className="left">
                    <div className="card" style={{ backgroundImage: "url(/images/card-deck.png)" }}></div>
                </div>
                <div className="right">
                    <div className="user-area">
                        {this.renderUserArea()}
                    </div>
                </div>
            </div>
            <HowToPlayGuide />
        </div>
    }

    renderUserArea() {
        const roomState = this.props.roomState;
        if (this.props.isLoading) {
            return <div className="loading">
                <span className="logo" style={{backgroundImage: "url(/images/logo.png)"}}></span>
                <small>loading</small>
            </div>
        } else if (roomState === null) {
            return (
                <div className="login-box">
                    <h1>Pandemic Together</h1>
                    <input id="username" type="text" name="email" placeholder="Choose your username" value={this.state.username} onChange={this.onChange_UpdateUserName} onKeyUp={this.onKeyUp_SubmitOnEnter} />
                    <br />
                    <button onClick={() => this.onClick_Login()}>Join a Game</button>
                    <br />
                    <small>a collaborative game for staysafe gamejam</small>
                </div>
            );
        } else if (roomState.gameState === Constants.GAME_STATE_WAITING_PLAYERS) {
            var numberOfPlayersInTheRoom = Object.keys(roomState.players).length;
            var disabledStartButton = (Object.keys(roomState.players).length < 3) ? true : false;
            return <div style={{padding:10}}>
                <button disabled={disabledStartButton} className="start-button" onClick={() => this.onClick_StartGame()} >{(disabledStartButton) ?  "waiting for players "  : "Start Game"} {" - (" + numberOfPlayersInTheRoom +"/4)"}</button>
                <button onClick={() => this.onClick_StartBot()}>Add a bot</button>
                <br />
                <ChatRoom />
            </div>
        }
        throw new Error("Unknown state")
    }

    componentDidMount() {
        this.props.removeMobileUrlBar();
    }
}

export default connect(mapStateToProps, { login, startGame, startBot, removeMobileUrlBar })(StartGame)
