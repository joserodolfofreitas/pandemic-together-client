
import { setRoom, playVirusPhase, pushChatMessage, pushGameMessage, updateGameFlow } from '../actions'
import * as Constants from './../../common/constants';
import { mapStateChangeToGameMessage } from './dataMappers/mapStateChangeToGameMessage'
import { mapRoomMessageToChatMessage } from './dataMappers/mapRoomMessageToChatMessage';
import { mapRoomStateToGameFlow, mapRoomStateToVirusPhaseMessages, mapRoomStateToCards } from './dataMappers/mapRoomState';

function runSetMyPlayerRoom(room){
    return (dispatch, getState) => {
        dispatch(setRoom(room));
        room.onMessage((message) => {
            const chatMessage = mapRoomMessageToChatMessage(message);
            if(chatMessage){
                dispatch(pushChatMessage(chatMessage));
            }
        });

        room.state.onChange = (changes) => {
            changes.forEach(change => {
                const message = mapStateChangeToGameMessage(change)
                if(message){
                    dispatch(pushGameMessage(message));
                }
            });
        };    

        room.onStateChange((roomState) => {
            console.log("### ROOMSTATE ###", roomState);

            const gameFlow = mapRoomStateToGameFlow(roomState);
            const cards = mapRoomStateToCards(roomState);

            if(gameFlow.roundState === Constants.ROUND_STATE_VIRUS_PHASE){
                const messages = mapRoomStateToVirusPhaseMessages(roomState);
                dispatch(playVirusPhase(gameFlow, cards, messages));
            }else{
                dispatch(updateGameFlow(gameFlow, cards));
            }
        });
    };
}

export default runSetMyPlayerRoom;