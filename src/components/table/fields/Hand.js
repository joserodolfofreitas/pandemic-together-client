import React from 'react';
import Card from '../../shared/Card';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        roomState: state.roomState,
        draggingCard: state.draggingCard
    }
}

class Hand extends React.Component {
    displayCardItems = [];

    render() {
        const player = this.props.player;
        const handCardItems = this.getCardItems();

        let positionIndex = 0;

        const isCurrentTurn = this.props.roomState.currentTurn === player.sessionId;
        const isDraggingCard = !!this.props.draggingCard;

        return <div className="hand-cards card-container" style={{ "--card-count": handCardItems.filter(c => c.state !== "destroyed").length }}>
            {handCardItems.map((cardItem) => {
                const isPlayable = isCurrentTurn; //TODO: disadvantage anwenden
                if (cardItem.state === "destroyed") {
                    return <Card key={cardItem.card.cardId} card={cardItem.card} index={positionIndex} isHandCard={true} isDestroyed={true} />
                } else {
                    return <Card key={cardItem.card.cardId} card={cardItem.card} index={positionIndex++} isHandCard={true} isPlayable={isPlayable} isFaded={isDraggingCard} isHidden={isDraggingCard && this.props.draggingCard.cardId == cardItem.card.cardId} />
                }
            })}
        </div>
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
}

export default connect(mapStateToProps, null)(Hand)