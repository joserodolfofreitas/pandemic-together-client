function setDragOverCard(state, card) {
    console.log("setDragOverCard",card);
    return {
        ...state,
        dragOverCard: card,
    };
}

export default setDragOverCard;