import React from 'react';
import HandCard from './../cards/HandCard';
import { connect } from 'react-redux';

class Hand extends React.Component {
    displayCardItems = [];

    render() {
        const handCardItems = this.getCardItems();
        let positionIndex = 0;
        return <div className="hand-cards card-container" style={{ "--card-count": handCardItems.filter(c => c.state !== "destroyed").length }}>
            {handCardItems.map((cardItem) => {
                const isPlayable = this.props.isActivePlayer; //TODO: disadvantage anwenden
                if (cardItem.state === "destroyed") {
                    return <HandCard key={cardItem.card.cardId} card={cardItem.card} index={positionIndex} isDestroyed={true} dragOverCard={this.props.dragOverCard} draggingCard={this.props.draggingCard} />
                } else {
                    const isHidden = this.props.draggingCard && this.props.draggingCard.cardId === cardItem.card.cardId;
                    return <HandCard key={cardItem.card.cardId} card={cardItem.card} index={positionIndex++} isPlayable={isPlayable} isFaded={!!this.props.draggingCard} isHidden={isHidden} dragOverCard={this.props.dragOverCard} draggingCard={this.props.draggingCard} />
                }
            })}
        </div>
    }

    getCardItems() {
        let activeCards = this.props.handCards;
        let displayCardItems = this.displayCardItems;
        let activeIndex = 0, displayIndex = 0;
        while (activeIndex < activeCards.length || displayIndex < displayCardItems.length) {
            const activeCard = activeCards[activeIndex];
            const displayCardItem = displayCardItems[displayIndex];

            if (activeCard && displayCardItem && activeCard.cardId === displayCardItem.card.cardId) {
                displayCardItem.state = "displayed";
                activeIndex++;
                displayIndex++;
                continue;
            }
            if (!displayCardItem) {
                displayCardItems.push({ card: Object.assign({}, activeCard), state: "displayed" });
                activeIndex++;
                displayIndex++;
                continue;
            }
            if (!activeCard || activeCard.cardId !== displayCardItem.card.cardId) {
                displayCardItem.state = "destroyed";
                displayIndex++;
                continue;
            }
            throw new Error("unreachable state");
        }
        return this.displayCardItems = displayCardItems;
    }
}

export default connect(
    (state, ownProps) => {
        return {
            draggingCard: state.draggingCard,
            dragOverCard: state.dragOverCard,
            handCards: ownProps.player.hand
        }
    },
    null
)(Hand)