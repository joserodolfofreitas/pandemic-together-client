
import { setRoom, playVirusPhase, pushChatMessage } from '../actions'
import { processGameMessages } from './dataprocessors/GameMessagesProcessor'
import * as Constants from './../../common/constants';

function transformChatMessage(message){
    return Object.assign({}, message);
}

function runSetMyPlayerRoom(room){
    return (dispatch, getState) => {
        dispatch(setRoom(room, false));

        room.onMessage((message) => {
            if (message.type == Constants.GM_CHAT_MESSAGE) {
                dispatch(pushChatMessage(transformChatMessage(message)));
            }
        });

        room.state.onChange = (changes) => {
            changes.forEach(change => {
                processGameMessages(dispatch, change);
            });
        };    

        room.onStateChange((roomState) => {
            console.log("### ROOMSTATE ###", roomState);

            if(roomState.roundState === Constants.ROUND_STATE_VIRUS_PHASE){
                console.log("dispatch(playVirusPhase());")
                dispatch(playVirusPhase());
            }
        });
    };
}

export default runSetMyPlayerRoom;