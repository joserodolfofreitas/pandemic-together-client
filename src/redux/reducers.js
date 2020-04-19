import {
    SET_ROOM,
    ADD_BOT,
    SET_IS_LOADING,
    SET_DRAGGING_CARD,
    SET_DRAG_OVER_CARD,
    SET_VIRUS_PHASE_MESSAGE,
    PUSH_GAME_MESSAGE,
    PUSH_CHAT_MESSAGE,
    REMOVE_GAME_MESSAGE,
    RESET_GAME_MESSAGES,
    UPDATE_GAME_FLOW,
    updateGameFlow
} from './actions'

import setRoom from './reducers/setRoom';
import addBot from './reducers/addBot';
import setIsLoading from './reducers/setIsLoading';
import setDraggingCard from './reducers/setDraggingCard';
import setDragOverCard from './reducers/setDragOverCard';
import pushChatMessage from './reducers/pushChatMessage';
import pushGameMessage from './reducers/pushGameMessage';
import setVirusPhaseMessage from './reducers/setVirusPhaseMessage';
import removeGameMessage from './reducers/removeGameMessage';
import resetGameMessages from './reducers/resetGameMessages';

const reducerMap = {
    [SET_ROOM]: (state, action) => setRoom(state, action.room),
    [ADD_BOT]: (state, action) => addBot(state, action.botRoom),
    
    [SET_IS_LOADING]: (state, action) => setIsLoading(state, action.isLoading),
    
    [SET_DRAGGING_CARD]: (state, action) => setDraggingCard(state, action.card),
    [SET_DRAG_OVER_CARD]: (state, action) => setDragOverCard(state, action.card),
    
    [SET_VIRUS_PHASE_MESSAGE]: (state, action) => setVirusPhaseMessage(state, action.message),
    
    [PUSH_CHAT_MESSAGE]: (state, action) => pushChatMessage(state, action.chatMessage),
    
    [PUSH_GAME_MESSAGE]: (state, action) => pushGameMessage(state, action.gameMessage),
    [REMOVE_GAME_MESSAGE]: (state, action) => removeGameMessage(state, action.gameMessage),
    [RESET_GAME_MESSAGES]: (state, action) => resetGameMessages(state),

    [UPDATE_GAME_FLOW]: (state, action) => updateGameFlow(state, action.gameFlow, action.cards)
}

function reducers(state, action) {
    const reducer = reducerMap[action.type];
    return reducer ? reducer(state, action) : state;
}

export default reducers;