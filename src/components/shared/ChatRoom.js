import React from 'react';
import * as Constants from './../../common/constants';
import { connect } from 'react-redux';


function mapStateToProps(state) {
    return {
        player: state.player,
        room: state.room,
        roomState: state.roomState,
        currentPlayerSessionId: state.currentPlayerSessionId,
        chatMessages: state.chatMessages,
        updatesOnRoomState: state.updatesOnRoomState,
    }
}

class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollapsed: this.props.collapsed,
            messageText: "",
        }
    }

    onChange_UpdateMessageText = (event) => {
        this.setState({ messageText: event.target.value });
    }

    onKeyUp_SubmitOnEnter = (event) => {
        if (event.keyCode === 13) {
            this.sendMessage();
        }
    }

    onClick_toggleCollapsed() {
        this.setState({ isCollapsed: !this.state.isCollapsed });
    }

    sendMessage() {
        const message = {
            type: Constants.GM_CHAT_MESSAGE,
            playerName: this.props.roomState.players[this.props.currentPlayerSessionId].name,
            text: this.state.messageText,
        };
        this.props.room.send(message)
        this.setState({messageText: ""});
    }

    render() {
        const roomState = this.props.roomState;
        let players = [];
        let index = 0;
        for (let id in roomState.players) {
            const player = roomState.players[id];
            players[index++] = player;
        }
        const round = (roomState.gameState === Constants.GAME_STATE_STARTED) ? "round " + roomState.round : "";
        const chatMessages = this.props.chatMessages;

        /*<div>player1: lerolero</div>
         <div>player2: blablabla</div>
         <div>player1: hahahaah</div>
         <div>player3: let's play bitches!</div>*/

        return (
            <div className={`chat-room${this.state.isCollapsed ? " collapsed" : ""}`}>
                <div className="chat-header">
                    <span className="icon" style={{ backgroundImage: "url(/images/icon-chat.png)" }} onClick={() => this.onClick_toggleCollapsed()}></span>
                    <h2>Players in the room</h2>
                </div>
                <div className="chat-content">
                    {players.map(function (player, index) {
                        var playerCurrentTurn = roomState.currentTurn === player.sessionId;
                        return <div key={index} style={{ textAlign: "center" }}>{playerCurrentTurn ? <span style={{ float: "left", color: "#050" }}>=></span> : ""}<span>{player.name}</span></div>
                    })}
                    <div><hr /></div>
                    <div style={{ fontSize: "0.6em", color: "#333", textAlign: "center" }}>{roomState.gameState}</div>
                    <div style={{ fontSize: "0.7em", color: "#333", textAlign: "center" }}>{round}</div>
                    <div><hr /></div>
                    <div className="chat-messages">
                        {chatMessages.map(function(chatMessage){
                            return <div>{chatMessage.playerName}: {chatMessage.text}</div>
                        })}

                    </div>
                    <div className="chat-input-box">
                        <input placeholder="type your message here" value={this.state.messageText}  onChange={this.onChange_UpdateMessageText} onKeyUp={this.onKeyUp_SubmitOnEnter} />
                        <button onClick={() => this.sendMessage()}>SEND</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(ChatRoom)