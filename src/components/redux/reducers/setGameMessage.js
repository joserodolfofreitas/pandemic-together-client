function setGameMessage(state, gameMessage) {
    console.log("!!!!!!!!! setGameMessage !!!!!!!");
    return {
        ...state,
        gameMessage: gameMessage,
    };
}

export default setGameMessage;