import * as Colyseus from "colyseus.js";
import { setMyPlayerRoom, isLoading } from './../actions'
const serverUrl = (process.env.NODE_ENV === 'production') ? 'wss://pandemic-together-server.herokuapp.com' : 'ws://localhost:2567'
function runLogin(username) {

    return (dispatch, getState) => {
        if (!username) {
            return;
        }
        dispatch(isLoading(true));

        var client = new Colyseus.Client(serverUrl);
        client.joinOrCreate("pandemic-together-room", { name: username })
            .then(room => {
                dispatch(setMyPlayerRoom(room));
                dispatch(isLoading(false));
            }).catch(e => {
                console.error("JOIN ERROR", e);
            });
    }
}
export default runLogin;