import React from 'react';
import { connect } from 'react-redux';
import { login, startGame, removeMobileUrlBar } from './redux/actions'
import ChatRoom from './ChatRoom';
import * as Constants from './common/constants';


function mapStateToProps(state) {
    return {
        roomState: state.roomState
    }
}

class StartGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ""
        };
    }

    onChange_UpdateUserName = (event) => {
        this.setState({ username: event.target.value });
    }

    onKeyUp_SubmitOnEnter = (event) => {
        if(event.keyCode === 13){
            this.props.login(this.state.username);    
        }
    }

    onClick_Login = () => {
        this.props.login(this.state.username);
    }

    onClick_StartGame() {
        this.props.startGame();
    }

    render() {
        return <div className="start-game" style={{ backgroundImage: "url(/images/background.jpg)" }}>
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
        </div>
    }

    renderUserArea() {
        const roomState = this.props.roomState;
        if (roomState === null) {
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
            return <div>
                <button className="start-button" onClick={() => this.onClick_StartGame()} >Start Game</button>
                <ChatRoom />
            </div>
        }
        throw new Error("Unknown state")
    }

    componentDidMount(){
        this.props.removeMobileUrlBar();
    }
}

export default connect(mapStateToProps, { login, startGame, removeMobileUrlBar })(StartGame)
