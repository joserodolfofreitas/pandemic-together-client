function setCurrentPlayerSessionId(state, sessionId) {
    return {
        ...state,
        currentPlayerSessionId: sessionId,
    };
}

export default setCurrentPlayerSessionId;