import React from 'react';
import VirusCard from './../cards/VirusCard';
import { connect } from 'react-redux';
import * as Constants from '../../../common/constants';
import _getCardItems from './_getCardItems';

const action2indicatorMap = {
    [Constants.ACTION_DESTROY_VIRUS_TOKEN]: "reduce-tokens",
    [Constants.ACTION_CONTAIN_VIRUS]: "contain"
}

class Viruses extends React.Component {
    displayCardItems = [];

    render() {
        const virusCardItems = this.getCardItems();
        const cardIndicators = this.getCardIndicators(virusCardItems);
        const virusPhaseMessage = this.props.virusPhaseMessage;
        let positionIndex = 0;
        return <div className="virus-infection card-container" style={{ "--card-count": virusCardItems.filter(c => c.state !== "destroyed").length }}>
            {virusCardItems.map((item) => {
                if (item.state === "destroyed") {
                    return <VirusCard key={item.card.cardId} card={item.card} index={positionIndex} isDestroyed={true} dragOverCard={this.props.dragOverCard} draggingCard={this.props.draggingCard} />
                } else {
                    let isFaded = false;
                    let card = item.card;
                    let virusPhaseAction;
                    if(virusPhaseMessage){
                        const updatedCard = virusPhaseMessage.targetCards[card.cardId];
                        if(updatedCard){
                            card = updatedCard;
                            isFaded = false;
                            virusPhaseAction = virusPhaseMessage.action;
                        }else{
                            isFaded = true;
                        }
                    }                    
                    return <VirusCard key={card.cardId} card={card} index={positionIndex++} indicator={cardIndicators[card.cardId]} isFaded={isFaded} virusPhaseAction={virusPhaseAction} dragOverCard={this.props.dragOverCard} draggingCard={this.props.draggingCard} />
                }
            })}
        </div>;
    }

    getCardItems() {
        return this.displayCardItems = _getCardItems(this.props.virusCards, this.displayCardItems);
    }

    getCardIndicators(cardItems) {
        let indicators = {};
        cardItems.forEach((cardItem, index) => {
            if (this.props.dragOverCard && this.props.draggingCard) {
                if (this.props.dragOverCard.cardId === cardItem.card.cardId) {
                    const indicator = action2indicatorMap[this.props.draggingCard.action];
                    indicators[cardItem.card.cardId] = indicator;
                    if (this.props.draggingCard.action === Constants.ACTION_CONTAIN_VIRUS && this.props.draggingCard.maxCardsImpact === 3) { //TODO: #later# separate into maxAffectedCards && maxAffectedTokens to make more generic
                        if (index > 0) { indicators[cardItems[index - 1].card.cardId] = indicator; }
                        if (index < (cardItems.length - 1)) { indicators[cardItems[index + 1].card.cardId] = indicator; }
                    }
                } else {
                    indicators[cardItem.card.cardId] = indicators[cardItem.card.cardId] || null;
                }
            } else {
                indicators[cardItem.card.cardId] = null;
            }
        });
        return indicators;
    }
}

export default connect(
    (state, ownProps) => {
        return {
            draggingCard: state.draggingCard,
            dragOverCard: state.dragOverCard,
            virusCards: state.cards.players[ownProps.playerId].viruses,
            virusPhaseMessage: state.virusPhaseMessage
        }
    },
    null
)(Viruses)