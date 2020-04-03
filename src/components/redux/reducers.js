import {
    SET_ROOM,
    SET_ROOM_STATE,
    SELECT_CARD,
    DESELECT_CARD,
    RESET_SELECTED_CARDS,
} from './actions'

import deselectCard from './reducers/deselectCard';
import resetSelectedCards from './reducers/resetSelectedCards';
import selectCard from './reducers/selectCard';
import setRoom from './reducers/setRoom';
import setRoomState from './reducers/setRoomState';

const reducerMap = {
    [SET_ROOM]: (state, action) => setRoom(state, action.room),
    [SET_ROOM_STATE]: (state, action) => setRoomState(state, action.roomState),
    [SELECT_CARD]: (state, action) => selectCard(state, action.card),
    [DESELECT_CARD]: (state, action) => deselectCard(state, action.card.cardId),
    [RESET_SELECTED_CARDS]: (state, action) => resetSelectedCards(state),
}

function reducers(state, action) {
    const reducer = reducerMap[action.type];
    return reducer ? reducer(state, action) : state;
}

export default reducers;