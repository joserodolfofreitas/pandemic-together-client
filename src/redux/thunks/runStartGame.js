import * as Constants from './../../common/constants';
import { resetGameMessages } from './../actions'

function runStartGame() {
    return (dispatch, getState) => {
        const state = getState();
        dispatch(resetGameMessages());
        state.room.send({ type: Constants.GM_START_GAME });
    }
}
export default runStartGame;