import {
    SET_ROOM,
    SET_ROOM_STATE,
    SET_IS_LOADING,
    SET_DRAGGING_CARD,
    SET_DRAG_OVER_CARD,
    PUSH_GAME_MESSAGE,
    REMOVE_GAME_MESSAGE,
    RESET_GAME_MESSAGES,
} from './actions'

import setRoom from './reducers/setRoom';
import setRoomState from './reducers/setRoomState';
import setIsLoading from './reducers/setIsLoading';
import setDraggingCard from './reducers/setDraggingCard';
import setDragOverCard from './reducers/setDragOverCard';
import pushGameMessage from './reducers/pushGameMessage';
import removeGameMessage from './reducers/removeGameMessage';
import resetGameMessages from './reducers/resetGameMessages';


const reducerMap = {
    [SET_ROOM]: (state, action) => setRoom(state, action.room),
    [SET_ROOM_STATE]: (state, action) => setRoomState(state, action.roomState),
    [SET_IS_LOADING]: (state, action) => setIsLoading(state, action.isLoading),
    [SET_DRAGGING_CARD]: (state, action) => setDraggingCard(state, action.card),
    [SET_DRAG_OVER_CARD]: (state, action) => setDragOverCard(state, action.card),
    [PUSH_GAME_MESSAGE]: (state, action) => pushGameMessage(state, action.gameMessage),
    [REMOVE_GAME_MESSAGE]: (state, action) => removeGameMessage(state, action.gameMessage),
    [RESET_GAME_MESSAGES]: (state, action) => resetGameMessages(state),
}

function reducers(state, action) {
    const reducer = reducerMap[action.type];
    return reducer ? reducer(state, action) : state;
}

export default reducers;