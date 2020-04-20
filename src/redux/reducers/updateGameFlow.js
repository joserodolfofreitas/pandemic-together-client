function updateGameFlow(state, gameFlow, cards) {
    console.log("updateGameFlow", gameFlow, cards)
    return {
        ...state,
        gameFlow,
        cards
    };
}

export default updateGameFlow;