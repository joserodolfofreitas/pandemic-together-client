import React from 'react';
import HandCard from './../cards/HandCard';
import { connect } from 'react-redux';
import _getCardItems from './_getCardItems';

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
        return this.displayCardItems = _getCardItems(this.props.handCards, this.displayCardItems);
    }
}

export default connect(
    (state, ownProps) => {
        return {
            draggingCard: state.draggingCard,
            dragOverCard: state.dragOverCard,
            handCards: state.players[ownProps.playerId].hand
        }
    },
    null
)(Hand)