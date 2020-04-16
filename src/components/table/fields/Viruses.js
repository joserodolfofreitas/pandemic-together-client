import React from 'react';
import VirusCard from './../cards/VirusCard';
import { connect } from 'react-redux';
import * as Constants from '../../../common/constants';

const action2indicatorMap = {
    [Constants.ACTION_DESTROY_VIRUS_TOKEN]: "reduce-tokens",
    [Constants.ACTION_CONTAIN_VIRUS]: "contain"
}

class Viruses extends React.Component {
    displayCardItems = [];

    render() {
        const virusCardItems = this.getCardItems();
        const cardIndicators = this.getCardIndicators(virusCardItems);
        let positionIndex = 0;
        console.log("Viruses render", this.props.playerId, virusCardItems)
        return <div className="virus-infection card-container" style={{ "--card-count": virusCardItems.filter(c => c.state !== "destroyed").length }}>
            {virusCardItems.map((cardItem) => {
                console.log("Viruses card",cardItem.card.cardId,cardItem);
                //FIXME: properties dont change, even if card-state or card tokens changed, so virus card isn't rendered
                if (cardItem.state === "destroyed") {
                    return <VirusCard key={cardItem.card.cardId} card={cardItem.card} index={positionIndex} isDestroyed={true} dragOverCard={this.props.dragOverCard} draggingCard={this.props.draggingCard} />
                } else {
                    return <VirusCard key={cardItem.card.cardId} card={cardItem.card} index={positionIndex++} indicator={cardIndicators[cardItem.card.cardId]} dragOverCard={this.props.dragOverCard} draggingCard={this.props.draggingCard} />
                }
            })}
        </div>;
    }

    getCardItems() {
        let activeCards = this.props.virusCards;
        let displayCardItems = this.displayCardItems;
        let activeIndex = 0, displayIndex = 0;
        while (activeIndex < activeCards.length || displayIndex < displayCardItems.length) {
            const activeCard = activeCards[activeIndex];
            const displayCardItem = displayCardItems[displayIndex];

            if (activeCard && displayCardItem && activeCard.cardId === displayCardItem.card.cardId) {
                displayCardItem.card = Object.assign({}, activeCard); //clone card, to avoid reference problems for now
                displayCardItem.state = "displayed";
                activeIndex++;
                displayIndex++;
                continue;
            }
            if (!displayCardItem) {
                const newItem = { card: Object.assign({}, activeCard), state: "displayed" }; //clone card, to avoid reference problems for now
                displayCardItems.push(newItem);
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
        console.log("connect viruses", ownProps.playerId, state.roomState.players[ownProps.playerId].virusField)
        return {
            draggingCard: state.draggingCard,
            dragOverCard: state.dragOverCard,
            virusCards: state.roomState.players[ownProps.playerId].virusField
        }
    },
    null
)(Viruses)