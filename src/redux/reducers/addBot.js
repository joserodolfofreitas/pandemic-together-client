function addBot(state, botRoom, isLoading) {
    return {
        ...state,
        bots: [...state.bots, botRoom],
        isLoading
    };
}

export default addBot;