import {
    SET_ROOM,
    SET_ROOM_STATE,
    ADD_BOT,
    SET_CURRENT_PLAYER_SESSION_ID,
    SET_IS_LOADING,
    SET_DRAGGING_CARD,
    SET_DRAG_OVER_CARD,
    SET_VIRUS_PHASE_MESSAGE,
    PUSH_GAME_MESSAGE,
    REMOVE_GAME_MESSAGE,
    RESET_GAME_MESSAGES
} from './actions'

import setRoom from './reducers/setRoom';
import addBot from './reducers/addBot';
import setCurrentPlayerSessionId from './reducers/setCurrentPlayerSessionId';
import setRoomState from './reducers/setRoomState';
import setIsLoading from './reducers/setIsLoading';
import setDraggingCard from './reducers/setDraggingCard';
import setDragOverCard from './reducers/setDragOverCard';
import pushGameMessage from './reducers/pushGameMessage';
import setVirusPhaseMessage from './reducers/setVirusPhaseMessage';
import removeGameMessage from './reducers/removeGameMessage';
import resetGameMessages from './reducers/resetGameMessages';

const reducerMap = {
    [SET_ROOM]: (state, action) => setRoom(state, action.room),
    [ADD_BOT]: (state, action) => setRoom(state, action.botRoom),
    [SET_ROOM_STATE]: (state, action) => setRoomState(state, action.roomState),
    [SET_IS_LOADING]: (state, action) => setIsLoading(state, action.isLoading),
    [SET_DRAGGING_CARD]: (state, action) => setDraggingCard(state, action.card),
    [SET_DRAG_OVER_CARD]: (state, action) => setDragOverCard(state, action.card),
    [SET_VIRUS_PHASE_MESSAGE]: (state, action) => setVirusPhaseMessage(state, action.message),
    [PUSH_GAME_MESSAGE]: (state, action) => pushGameMessage(state, action.gameMessage),
    [REMOVE_GAME_MESSAGE]: (state, action) => removeGameMessage(state, action.gameMessage),
    [RESET_GAME_MESSAGES]: (state, action) => resetGameMessages(state)
    [SET_CURRENT_PLAYER_SESSION_ID]: (state, action) => setCurrentPlayerSessionId(state, action.sessionId),
}

function reducers(state, action) {
    const reducer = reducerMap[action.type];
    return reducer ? reducer(state, action) : state;
}

export default reducers;