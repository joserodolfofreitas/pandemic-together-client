import {
    DRAW_CARD,
    UPDATE_PLAYER,
    SET_ROOM,
} from './actions'

function addWindow(state, windowProps) {

    if (windowProps.bufferNumber == null) {
        windowProps.bufferNumber = state.currentBufferNumber + 1;
    }
    return {
        ...state,
        windows: [...state.windows, windowProps],
        windowsIds: [...state.windowsIds, windowProps.stringId],
        currentBufferNumber: windowProps.bufferNumber,
    };
}

function setRoom(state, room) {
    return {
        ...state,
        room: room
    };
}

function removeWindow(state, stringId) {
    const newWindowArray = [...state.windows].filter((item, index) => item.stringId !== stringId)
    const newWindowIdsArray = [...state.windowsIds].filter((item, index) => item !== stringId)
    return {
        ...state,
        windows: newWindowArray,
        windowsIds: newWindowIdsArray
    };
}

function reducers(state, action) {
    switch (action.type) {
        case SET_ROOM:
            return setRoom(state, action.room);
        case DRAW_CARD:
            return addWindow(state);

        /*case REMOVE_WINDOW:
            let removeIndex = state.windowsIds.indexOf(action.stringId);

            if (removeIndex !== -1) {
                return removeWindow(state, action.stringId);
            }
            //window doesn't exist
            return state;
        case INCREMENT_NEXT_Z_INDEX:
            return {
                ...state,
                nextZIndex: ++state.nextZIndex,
            };*/
        default:
            return state;
    }
}

export default reducers;