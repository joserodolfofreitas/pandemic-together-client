import React from 'react';
import GameMessage from './GameMessage'
import { connect } from 'react-redux';
import * as Constants from './../common/constants';

function mapStateToProps(state) {
    return {
        gameMessages: state.gameMessages,
        roomState: state.roomState,
        currentPlayerSessionId: state.currentPlayerSessionId,
    }
}

class GameMessages extends React.Component {
    messages = []; //messages dictionary

    render() {
        var players = (this.props.roomState) ? this.props.roomState.players : [];
        const currentPlayerSessionId = this.props.currentPlayerSessionId;
        const messageTimersIds = Object.keys(this.messages);
        const now = Date.now();

        // add new messages from redux store into a member dictionary.
        for (var i = 0; i < this.props.gameMessages.length; i++) {
            const gameMessageData = this.props.gameMessages[i];
            if (!messageTimersIds.includes(gameMessageData.messageId)) {
                this.messages[gameMessageData.messageId] = Object.assign(gameMessageData, {start: now});
            }
        }

        // select messages to render based on the time they started.
        var messagesToRender = [];
        for (let id in this.messages) {
            var message = this.messages[id];
            if ((message.start + 6000) > now) {
                messagesToRender.push(message);
            }
        }

        return <div className="game-messages">
                {messagesToRender.map(function(gameMessageData){
                        var messageText = "";
                        var classes = "game-message ";
                        var imgSrc = "";
                        switch (gameMessageData.type) {
                            case "currentTurn":
                                const player = players[gameMessageData.value];
                                if(!player) {
                                    messageText = "undefined player's turn - player must left";
                                    imgSrc = "/images/players-lose.png";
                                    break;
                                }
                                if (player.sessionId == currentPlayerSessionId) {
                                    messageText = "Your turn.";
                                } else {
                                    messageText = player.name + "'s turn.";
                                }
                                classes +="fadeinout";
                                imgSrc = "/images/player-turn.png";
                                break;
                            case "roundState":
                                messageText = "Round Effects (Virus Turn)";
                                classes +="fadeinout";
                                imgSrc = "/images/virus-turn.png";
                                break;
                            case "gameState":
                                switch (gameMessageData.value) {
                                    case Constants.GAME_STATE_OVER:
                                        messageText = "Game Over - The Virus Win.";
                                        imgSrc = "/images/players-lose.png";
                                        break;
                                    case Constants.GAME_STATE_VICTORY_END:
                                        messageText = "You won";
                                        imgSrc = "/images/players-win.png";
                                        break;
                                }
                                classes +="fadein";
                                break;
                            default: // unkonwn messages
                                messageText = gameMessageData.value;
                                classes +="fadeinout";
                                imgSrc = "/images/players-win.png"; //confused virus img
                                break;
                        }

                        const messageView = {messageId: gameMessageData.messageId, text: messageText, classes: classes, imgSrc: imgSrc};
                        return <GameMessage key={messageView.messageId} messageView={messageView} />;
                    })}
                </div>
    }
}

export default connect(mapStateToProps, null )(GameMessages)