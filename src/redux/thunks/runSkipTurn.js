
import * as Constants from './../../common/constants';
function runSkipTurn() {
    return (dispatch, getState) => {
        const state = getState();        
        state.room.send({ type: Constants.GM_ADVANCE_TURN, player: state.myPlayerSessionId });
    }
}
export default runSkipTurn;