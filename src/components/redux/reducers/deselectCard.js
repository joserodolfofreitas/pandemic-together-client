function deselectCard(state, cardId) {
    console.log("state.selectedCards.length", state.selectedCards.length);
    console.log(cardId, "cardId");
    const newSelectedCards = [...state.selectedCards].filter((card, index) => card.cardId !== cardId);
    console.log("newSelectedCards", newSelectedCards);
    return {
        ...state,
        selectedCards: newSelectedCards,
    };
}



export default deselectCard;