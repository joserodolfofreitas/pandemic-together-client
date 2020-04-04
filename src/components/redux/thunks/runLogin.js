import * as Colyseus from "colyseus.js";
import { setRoom, setRoomState } from './../actions'
const serverUrl = (process.env.NODE_ENV === 'production') ? 'wss://pandemic-together-server.herokuapp.com' : 'ws://localhost:2567'
//const serverUrl = (window.location.hostname.indexOf("herokuapp") === -1)
//? "ws://localhost:2567" // development (local)
//: "ws://pandemic-together-server.herokuapp.com" // production (remote)

function runLogin(username) {

    return (dispatch, getState) => {
        if (!username) {
            return;
        }

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
                dispatch(setRoom(room));
            }).catch(e => {
                console.log("JOIN ERROR", e);
            });
    }
}
export default runLogin;