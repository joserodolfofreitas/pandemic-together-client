import * as Colyseus from "colyseus.js";
import { addBot, isLoading } from './../actions'
import * as Constants from '../../common/constants';

const serverUrl = (process.env.NODE_ENV === 'production') ? 'wss://pandemic-together-server.herokuapp.com' : 'ws://localhost:2567'

function runStartBot(username) {

    return (dispatch, getState) => {
        if (!username) {
            return;
        }
        dispatch(isLoading(true));

        var client = new Colyseus.Client(serverUrl);
        client.join ("pandemic-together-room", { name: username })
            .then(botRoom => {
                console.log(botRoom.sessionId, "bot joined", botRoom.name);

                botRoom.state.players.onAdd = function (player, i) {
                    console.log("player joined!", player);
                };

                botRoom.onStateChange.once((state) => {
                    console.log("bot onStateChange once");
                });

                botRoom.onStateChange((roomState) => {
                    console.log("bot onStateChange update");
                    if(roomState.roundState === Constants.ROUND_STATE_VIRUS_PHASE){
                        botRoom.send({ type: Constants.GM_END_NEW_ROUND_ANIMATIONS, playerId: botRoom.sessionId });
                    }
                });
		        botRoom.state.onChange = (changes) => {
                    changes.forEach(change => {
                        console.log("bot onState step change");
                        if (change.field == "currentTurn") {
                            if (change.value == botRoom.sessionId) {
                                const players = getState().roomState.players;
                                setTimeout(()=>{
                                    console.log(" bot will play and iterate over players ");
                                    for (let id in players) {
                                        const player = players[id];
                                        console.log("player.name", player.name);
                                    }
                                    const message = { type: Constants.GM_ADVANCE_TURN, player: botRoom.sessionId };
                                    botRoom.send(message);
                                }, 6000);
                            }
                        }
                    });
                };
                dispatch(addBot(botRoom));
                dispatch(isLoading(false));
            }).catch(e => {
                console.log("JOIN ERROR", e);
            });
    }
}
export default runStartBot;
