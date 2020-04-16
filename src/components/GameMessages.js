import React from 'react';
import GameMessage from './GameMessage'
import { connect } from 'react-redux';
import { removeGameMessage } from './redux/actions'

function mapStateToProps(state) {
    return {
        gameMessages: state.gameMessages,
        roomState: state.roomState,
        room: state.room,
    }
}

class GameMessages extends React.Component {
    messages = [];

    render() {

        var players = (this.props.roomState) ? this.props.roomState.players : [];
        const room = this.props.room;

        const messageTimersIds = Object.keys(this.messages);

        for (var i = 0; i < this.props.gameMessages.length; i++) {
            const gameMessageData = this.props.gameMessages[i];
            if (!messageTimersIds.includes(gameMessageData.messageId)) {
                this.messages[gameMessageData.messageId] = Object.assign(gameMessageData, {start: Date.now()});

            }
        }

        const now = Date.now();
        //const messagesToRender = this.messages.filter((item, index) => (item.start + 5000) > now);
        var messagesToRender = [];
        for (let id in this.messages) {
            var message = this.messages[id];
            if ((message.start + 5000) > now) {
                messagesToRender.push(message);
            }
        }

        console.log("this.messages", this.messages);
        console.log("messagesToRender", messagesToRender);

        return <div className="game-messages">
                {messagesToRender.map(function(gameMessageData){
                        var messageText = "";
                        var classes = "game-message ";
                        var imgSrc = "/images/card-D4.png";

                        console.log("gameMessageData", gameMessageData);

                        switch (gameMessageData.type) {
                            case "currentTurn":
                                console.log("gameMessageData.value", gameMessageData.value);
                                const player = players[gameMessageData.value];
                                if (player.sessionId == room.sessionId) {
                                    messageText = "Your turn.";
                                } else {
                                    messageText = player.name + "'s turn.";
                                }
                                classes +="fadeinout";
                                break;
                            case "roundState":
                                messageText = gameMessageData.value;
                                classes +="fadeinout";
                                break;
                            case "gameState":
                                messageText = gameMessageData.value;
                                classes +="fadein";
                                break;
                            case "test":
                                messageText = gameMessageData.value;
                                classes +="fadeinout";
                                break;
                            default:
                                break;
                        }

                        const messageView = {messageId: gameMessageData.messageId, text: messageText, classes: classes, imgSrc: imgSrc};
                        return <GameMessage key={messageView.messageId} messageView={messageView} />;
                    })}
                </div>
    }
}

export default connect(mapStateToProps, { removeGameMessage })(GameMessages)