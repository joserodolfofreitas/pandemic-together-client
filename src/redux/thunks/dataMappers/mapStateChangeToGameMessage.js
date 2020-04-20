import * as Constants from '../../../common/constants';

export function mapStateChangeToGameMessage(dataChange) {
    switch (dataChange.field) {
        case "currentTurn":
            if (dataChange.value && dataChange.value !== "") {
                const messageId = dataChange.field + "_" + Date.now();
                return {messageId: messageId, type: dataChange.field, value: dataChange.value};
            }
            break;
        case "roundState":
            if (dataChange.value && (dataChange.value === Constants.ROUND_STATE_VIRUS_PHASE)) {
                const messageId = dataChange.field + "_" + Date.now();
                return {messageId: messageId, type: dataChange.field, value: dataChange.value};
            }
            break;
        case "gameState":
            if (dataChange.value && (dataChange.value === Constants.GAME_STATE_VICTORY_END || dataChange.value === Constants.GAME_STATE_OVER )) {
                const messageId = dataChange.field + "_" + Date.now();
                return {messageId: messageId, type: dataChange.field, value: dataChange.value};
            }
            break;
        default:
            break;
    }
}