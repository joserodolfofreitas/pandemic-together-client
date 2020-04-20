function _getCardItems(activeCards, displayCardItems) {
    activeCards = activeCards.filter(c => c && c.cardId); //drop empty olyseus proxies
    let activeIndex = 0, displayIndex = 0;
    while (activeIndex < activeCards.length || displayIndex < displayCardItems.length) {
        const displayCardItem = displayCardItems[displayIndex];
        let activeCard = activeCards[activeIndex];
        if (activeCard && displayCardItem && activeCard.cardId === displayCardItem.card.cardId) {
            displayCardItem.card = Object.assign({}, activeCard); //hack: clone card, to avoid reference problems for now
            displayCardItem.state = "displayed";
            activeIndex++;
            displayIndex++;
            continue;
        }
        if (!displayCardItem && activeCard) {
            const newItem = { card: Object.assign({}, activeCard), state: "displayed" }; //hack: clone card, to avoid reference problems for now
            displayCardItems.push(newItem);
            activeIndex++;
            displayIndex++;
            continue;
        }
        if (displayCardItem && (!activeCard || activeCard.cardId !== displayCardItem.card.cardId)) {
            displayCardItem.state = "destroyed";
            displayIndex++;
            continue;
        }
        console.log(displayCardItem, activeCard)
        throw new Error("unreachable state");
    }
    return displayCardItems;
}

export default _getCardItems;