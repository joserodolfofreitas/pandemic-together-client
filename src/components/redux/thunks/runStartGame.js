
import * as Constants from '../../common/constants';
function runStartGame() {
    return (dispatch, getState) => {
        const state = getState();
        state.room.send({ type: Constants.GM_START_GAME });
    }
}
export default runStartGame;