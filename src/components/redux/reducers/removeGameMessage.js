function removeGameMessage(state, gameMessageToRemove) {
    const newGameMessages = [...state.gameMessages].filter((item, index) => item.messageId !== gameMessageToRemove.messageId);
    return {
        ...state,
        gameMessages: newGameMessages
    };
}

export default removeGameMessage;