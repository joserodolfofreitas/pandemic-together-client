function pushGameMessage(state, gameMessage) {
    return {
        ...state,
        gameMessages: [...state.gameMessages, gameMessage],
    };
}

export default pushGameMessage;