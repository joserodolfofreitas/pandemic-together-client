function removeGameMessage(state, gameMessageToRemove) {
    console.log("delete the focking message!!!!");
    const newGameMessages = [...state.gameMessages].filter((item, index) => item.messageId !== gameMessageToRemove.messageId);
    return {
        ...state,
        gameMessages: newGameMessages
    };
}

export default removeGameMessage;