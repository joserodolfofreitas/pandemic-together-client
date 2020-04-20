import React from 'react';
import * as Constants from './../../common/constants';
import { connect } from 'react-redux';

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
            playerName: this.props.players[this.props.myPlayerSessionId].name,
            text: this.state.messageText,
        };
        this.props.room.send(message)
        this.setState({ messageText: "" });
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        const players = this.props.players;
        const gameState = this.props.gameFlow.gameState;
        const currentTurnPlayerSessionId = this.props.gameFlow.currentTurnPlayerSessionId;
        let playerList = [];
        let index = 0;
        for (let id in players) {
            const player = players[id];
            playerList[index++] = player;
        }
        const round = (gameState === Constants.GAME_STATE_STARTED) ? "round " + this.props.gameFlow.roundCount : "";
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
                    {playerList.map(function (player, index) {
                        const isCurrentTurn = currentTurnPlayerSessionId === player.sessionId;
                        return <div key={index} style={{ textAlign: "center" }}>{isCurrentTurn ? <span style={{ float: "left", color: "#050" }}>=></span> : ""}<span>{player.name}</span></div>
                    })}
                    <div><hr /></div>
                    <div style={{ fontSize: "0.6em", color: "#333", textAlign: "center" }}>{gameState}</div>
                    <div style={{ fontSize: "0.7em", color: "#333", textAlign: "center" }}>{round}</div>
                    <div><hr /></div>
                    <div className="chat-messages">
                        {chatMessages.map(function (chatMessage) {
                            return <div>{chatMessage.playerName}: {chatMessage.text}</div>
                        })}
                        <div style={{ float: "left", clear: "both" }}
                            ref={(el) => { this.messagesEnd = el; }}>
                        </div>
                    </div>

                    <div className="chat-input-box">
                        <input placeholder="type your message here" value={this.state.messageText} onChange={this.onChange_UpdateMessageText} onKeyUp={this.onKeyUp_SubmitOnEnter} />
                        <button onClick={() => this.sendMessage()}>SEND</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            room: state.room,
            players: state.cards.players,
            myPlayerSessionId: state.myPlayerSessionId,
            chatMessages: state.chatMessages,
            gameFlow: state.gameFlow
        }
    },
    null
)(ChatRoom)