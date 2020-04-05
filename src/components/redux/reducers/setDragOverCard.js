function setDragOverCard(state, card) {
    console.log(card);
    return {
        ...state,
        dragOverCard: card,
    };
}

export default setDragOverCard;