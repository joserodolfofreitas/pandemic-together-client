import {
    SET_ROOM,
    SET_ROOM_STATE,
    SET_IS_LOADING
} from './actions'

import setRoom from './reducers/setRoom';
import setRoomState from './reducers/setRoomState';
import setIsLoading from './reducers/setIsLoading';

const reducerMap = {
    [SET_ROOM]: (state, action) => setRoom(state, action.room),
    [SET_ROOM_STATE]: (state, action) => setRoomState(state, action.roomState),
    [SET_IS_LOADING]: (state, action) => setIsLoading(state, action.isLoading),
}

function reducers(state, action) {
    const reducer = reducerMap[action.type];
    return reducer ? reducer(state, action) : state;
}

export default reducers;