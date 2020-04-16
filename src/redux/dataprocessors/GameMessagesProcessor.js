import { pushGameMessage } from './../actions'
import * as Constants from '../../common/constants';

export function processGameMessages(dispatch, dataChange) {
    switch (dataChange.field) {
        case "currentTurn":
            if (dataChange.value && dataChange.value !== "") {
                const messageId = dataChange.field + "_" + Date.now();
                const messageData = {messageId: messageId, type: dataChange.field, value: dataChange.value};
                dispatch(pushGameMessage(messageData));
            }
            break;
        case "roundState":
            if (dataChange.value && (dataChange.value === Constants.ROUND_STATE_VIRUS_PHASE)) {
                const messageId = dataChange.field + "_" + Date.now();
                dispatch(pushGameMessage({messageId: messageId, type: dataChange.field, value: dataChange.value}));
            }
            break;
        case "gameState":
            if (dataChange.value && (dataChange.value === Constants.GAME_STATE_VICTORY_END || dataChange.value === Constants.GAME_STATE_OVER )) {
                const messageId = dataChange.field + "_" + Date.now();
                dispatch(pushGameMessage({messageId: messageId, type: dataChange.field, value: dataChange.value}));
            }
            break;
        default:
            break;
    }

}