import {
    SET_ROOM,
    SET_ROOM_STATE,
    SELECT_CARD,
    DESELECT_CARD,
    RESET_SELECTED_CARDS,
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
        room: room,
    };
}

function setRoomState(state, newRoomState) {
    return {
        ...state,
        roomState: newRoomState,
        updatesOnRoomState: state.updatesOnRoomState + 1, // cheap workaround to guaranteee re-render after updating roomState.
    };
}

function selectCard(state, card) {
    return {
        ...state,
        selectedCards: [...state.selectedCards, card],
    };
}

function deselectCard(state, cardId) {
    console.log("state.selectedCards.length", state.selectedCards.length);
    console.log(cardId, "cardId");
    const newSelectedCards = [...state.selectedCards].filter((card, index) => card.cardId != cardId);
    console.log("newSelectedCards", newSelectedCards);
    return {
        ...state,
        selectedCards: newSelectedCards,
    };
}

function resetSelectedCards (state) {
    return {
        ...state,
        selectedCards: [],
    };
}


function reducers(state, action) {
    switch (action.type) {
        case SET_ROOM:
            return setRoom(state, action.room);
        case SET_ROOM_STATE:
            return setRoomState(state, action.roomState);
        case SELECT_CARD:
            return selectCard(state, action.card);
        case DESELECT_CARD:
            return deselectCard(state, action.card.cardId);
        case RESET_SELECTED_CARDS:
            return resetSelectedCards(state);
        default:
            return state;
    }
}

export default reducers;