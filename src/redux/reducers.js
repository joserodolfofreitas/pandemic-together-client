import {
    SET_ROOM,
    SET_ROOM_STATE,
    SET_IS_LOADING,
    SET_DRAGGING_CARD,
    SET_DRAG_OVER_CARD
} from './actions'

import setRoom from './reducers/setRoom';
import setRoomState from './reducers/setRoomState';
import setIsLoading from './reducers/setIsLoading';
import setDraggingCard from './reducers/setDraggingCard';
import setDragOverCard from './reducers/setDragOverCard';


const reducerMap = {
    [SET_ROOM]: (state, action) => setRoom(state, action.room),
    [SET_ROOM_STATE]: (state, action) => setRoomState(state, action.roomState),
    [SET_IS_LOADING]: (state, action) => setIsLoading(state, action.isLoading),
    [SET_DRAGGING_CARD]: (state, action) => setDraggingCard(state, action.card),
    [SET_DRAG_OVER_CARD]: (state, action) => setDragOverCard(state, action.card),
}

function reducers(state, action) {
    console.log(action);
    const reducer = reducerMap[action.type];
    return reducer ? reducer(state, action) : state;
}

export default reducers;