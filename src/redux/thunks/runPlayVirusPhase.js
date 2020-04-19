
import * as Constants from './../../common/constants';
import {setVirusPhaseMessage} from './../actions'

function runPlayVirusPhase() {
    return (dispatch, getState) => {
        const state = getState();        
        let virusPhaseMessages = [].concat(state.virusPhaseMessages || [])
        
        function processNextRoundMessage(){
            if(virusPhaseMessages.length){
                var message = virusPhaseMessages.splice(0,1)[0];
                dispatch(setVirusPhaseMessage(message));
                setTimeout(processNextRoundMessage, 0.5 * 1000);
            }else{
                dispatch(setVirusPhaseMessage(null));
                //inform server, that all rounds where played
                state.room.send({ type: Constants.GM_END_NEW_ROUND_ANIMATIONS, playerId: state.myPlayerSessionId });
            }
        }
        processNextRoundMessage();
    }
}
export default runPlayVirusPhase;