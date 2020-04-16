import * as Colyseus from "colyseus.js";
import { setRoom, setRoomState, isLoading, pushGameMessage, removeGameMessage } from './../actions'
import * as Constants from '../../common/constants';
const serverUrl = (process.env.NODE_ENV === 'production') ? 'wss://pandemic-together-server.herokuapp.com' : 'ws://localhost:2567'
//const serverUrl = (window.location.hostname.indexOf("herokuapp") === -1)
//? "ws://localhost:2567" // development (local)
//: "ws://pandemic-together-server.herokuapp.com" // production (remote)

function runLogin(username) {

    return (dispatch, getState) => {
        if (!username) {
            return;
        }
        dispatch(isLoading(true));

        var client = new Colyseus.Client(serverUrl);
        client.joinOrCreate("pandemic-together-room", { name: username })
            .then(room => {
                console.log(room.sessionId, "joined", room.name);
                console.log("roomState", room.state);

                room.state.players.onAdd = function (player, i) {
                    console.log("player joined!", player);
                };

                room.onMessage((message) => {
                    console.log(message);
                });

                room.onStateChange.once((state) => {
                    console.log("this is the first room state!", state);
                    dispatch(setRoomState(state));
                });

                room.onStateChange((roomState) => {
                    console.log("the room state has been updated:", roomState);
                    dispatch(setRoomState(roomState));
                });
		room.state.onChange = (changes) => {
                    changes.forEach(change => {
                        console.log("******* on state step change");
                        console.log(change.field);
                        console.log(change.value);
                        console.log(change.previousValue);
                        console.log("*******")


                        //TODO  extract this into a data processors (to allow multiple processors)
                        switch (change.field) {
                            case "currentTurn":
                                if (change.value && change.value != "") {
                                    const messageId = change.field + "_" + Date.now();
                                    const messageData = {messageId: messageId, type: change.field, value: change.value};
                                    dispatch(pushGameMessage(messageData));
                                }
                            case "roundState":
                                if (change.value && (change.value == Constants.ROUND_STATE_VIRUS_PHASE)) {
                                    const messageId = change.field + "_" + Date.now();
                                    dispatch(pushGameMessage({messageId: messageId, type: change.field, value: change.value}));
                                }
                            case "gameState":
                                if (change.value && (change.value == Constants.GAME_STATE_VICTORY_END || change.value == Constants.GAME_STATE_OVER )) {
                                    const messageId = change.field + "_" + Date.now();
                                    dispatch(pushGameMessage({messageId: messageId, type: change.field, value: change.value}));
                                }
                                break;
                            default:
                                break;
                        }
                    });
                };

                room.state.players.onAdd = (player, key) => {
                    player.hand.onAdd = function(card) {
                            console.log("******* card added on hand of", player.sessionId, player.name);
                            console.log(card.cardId);
                            console.log(card.elementId);
                            console.log("*******")
                    }
                    player.hand.onRemove = function(card) {
                        console.log("******* card removed on hand of", player.sessionId, player.name);
                        console.log(card.cardId);
                        console.log(card.elementId);
                        console.log("*******")
                    }
                    player.virusField.onAdd = function(card) {
                        console.log("******* card added on virusField of", player.sessionId, player.name);
                        console.log(card.cardId);
                        console.log(card.elementId);
                        console.log("*******")
                    }

                    player.virusField.onRemove = function(card) {
                        console.log("******* card removed on virusField of", player.sessionId, player.name);
                        console.log(card.cardId);
                        console.log(card.elementId);
                        console.log("*******")
                    }
                };


                dispatch(setRoom(room));
                dispatch(isLoading(false));
            }).catch(e => {
                console.log("JOIN ERROR", e);
            });
    }
}
export default runLogin;
