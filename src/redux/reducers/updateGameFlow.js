function updateGameFlow(state, gameFlow, cards) {
    return {
        ...state,
        gameFlow,
        cards
    };
}

export default updateGameFlow;