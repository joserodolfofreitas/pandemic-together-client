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
    displayCardItems = [];

    render() {
        const virusCardItems = this.getCardItems();
        const cardIndicators = this.getCardIndicators(virusCardItems);
        let positionIndex = 0;
        return <div className="virus-infection card-container" style={{ "--card-count": virusCardItems.filter(c => c.state !== "destroyed").length }}>
            {virusCardItems.map((cardItem) => {
                if (cardItem.state === "destroyed") {
                    return <Card key={cardItem.card.cardId} card={cardItem.card} index={positionIndex} indicator={cardIndicators[cardItem.card.cardId]} isDestroyed={true} />
                }else{
                    return <Card key={cardItem.card.cardId} card={cardItem.card} index={positionIndex++} indicator={cardIndicators[cardItem.card.cardId]} />
                }
            })}
        </div>;
    }

    getCardItems(){
        let activeCards = this.props.cards;
        let displayCardItems = this.displayCardItems;        
        let activeIndex=0, displayIndex = 0;
        while(activeIndex < activeCards.length || displayIndex < displayCardItems.length){
            const activeCard = activeCards[activeIndex];
            const displayCardItem = displayCardItems[displayIndex];

            if(activeCard && displayCardItem && activeCard.cardId === displayCardItem.card.cardId){
                displayCardItem.state = "displayed";
                activeIndex++;
                displayIndex++;
                continue;
            }        
            if(!displayCardItem){
                displayCardItems.push({card: Object.assign({}, activeCard), state: "displayed"});
                activeIndex++;
                displayIndex++;
                continue;
            }
            if(!activeCard || activeCard.cardId !== displayCardItem.card.cardId){
                displayCardItem.state = "destroyed";
                displayIndex++;
                continue;
            }    
            throw new Error("unreachable state");
        }
        return this.displayCardItems = displayCardItems;  
    }

    getCardIndicators(cardItems){
        let indicators = {};
        cardItems.forEach((cardItem, index) => {
            if(this.props.dragOverCard && this.props.draggingCard){
                if(this.props.dragOverCard.cardId === cardItem.card.cardId){
                    const indicator = action2indicatorMap[this.props.draggingCard.action];
                    indicators[cardItem.card.cardId] = indicator;    
                    if(this.props.draggingCard.action === Constants.ACTION_CONTAIN_VIRUS && this.props.draggingCard.maxImpactPerElement === 3){ //TODO: #later# separate into maxAffectedCards && maxAffectedTokens to make more generic
                        if(index>0){indicators[cardItems[index-1].cardId] = indicator;}
                        if(index<(cardItems.length-1)){indicators[cardItems[index+1].cardId] = indicator;}
                    }
                }else{
                    indicators[cardItem.card.cardId] = indicators[cardItem.card.cardId] || null;    
                }
            }else{
                indicators[cardItem.card.cardId] = null;
            }
        });
        return indicators;
    }
}

export default connect(mapStateToProps, null)(VirusCards)