function selectCard(state, card) {
    return {
        ...state,
        selectedCards: [...state.selectedCards, card],
    };
}

export default selectCard;