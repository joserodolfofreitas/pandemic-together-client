function addBot(state, botRoom) {
    return {
        ...state,
        bots: [...state.bots, botRoom],
    };
}

export default addBot;