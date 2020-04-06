import React from 'react';
import Card from './Card';
import { connect } from 'react-redux';
import * as Constants from './common/constants';

function mapStateToProps(state) {
    return {
        draggingCard: state.draggingCard,
        dragOverCard: state.dragOverCard
    }
}

const action2indicatorMap = {
    [Constants.ACTION_DESTROY_VIRUS_TOKEN]:"reduce-tokens",
    [Constants.ACTION_CONTAIN_VIRUS]:"contain"
}

class VirusCards extends React.Component {

    render() {
        const virusCards = this.props.cards;
        const cardIndicators = this.getCardIndicators();

        return <div className="virus-infection card-container" style={{ "--card-count": virusCards.length }}>
            {virusCards.map((card, index) => <Card key={card.cardId} card={card} index={index} indicator={cardIndicators[card.cardId]} />)}
        </div>;
    }

    getCardIndicators(){
        const cards = this.props.cards;
        let indicators = {};
        cards.forEach((card, index) => {
            if(this.props.dragOverCard && this.props.draggingCard){
                if(this.props.dragOverCard.cardId === card.cardId){
                    const indicator = action2indicatorMap[this.props.draggingCard.action];
                    indicators[card.cardId] = indicator;    
                    if(this.props.draggingCard.action === Constants.ACTION_CONTAIN_VIRUS && this.props.draggingCard.maxImpactPerElement === 3){ //TODO: #later# separate into maxAffectedCards && maxAffectedTokens to make more generic
                        if(index>0){indicators[cards[index-1].cardId] = indicator;}
                        if(index<(cards.length-1)){indicators[cards[index+1].cardId] = indicator;}
                    }
                }else{
                    indicators[card.cardId] = indicators[card.cardId] || null;    
                }
            }else{
                indicators[card.cardId] = null;
            }
        });
        return indicators;
    }
}

export default connect(mapStateToProps, null)(VirusCards)