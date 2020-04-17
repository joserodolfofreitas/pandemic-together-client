function setDraggingCard(state, card) {
    return {
        ...state,
        draggingCard: card,
    };
}

export default setDraggingCard;