
import * as Constants from './../../common/constants';
import {setVirusPhaseMessage} from './../actions'

function runPlayVirusPhase() {
    return (dispatch, getState) => {
        const state = getState();        
        let roundMessages = [].concat(state.roomState.newRoundMessages || [])
        console.log("runPlayVirusPhase");

        function processNextRoundMessage(){
            if(roundMessages.length){
                var message = roundMessages.splice(0,1)[0];
                dispatch(setVirusPhaseMessage(message));
                setTimeout(processNextRoundMessage, 0.5 * 1000);
            }else{
                dispatch(setVirusPhaseMessage(null));
                //inform server, that all rounds where played
                state.room.send({ type: Constants.GM_END_NEW_ROUND_ANIMATIONS, playerId: state.currentPlayerSessionId });
            }
        }
        processNextRoundMessage();
    }
}
export default runPlayVirusPhase;