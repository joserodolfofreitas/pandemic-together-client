import React from 'react';
import Card from './../../shared/Card';
import { connect } from 'react-redux';


class Character extends React.Component {
    render() {
        const virusPhaseMessage = this.props.virusPhaseMessage;
        return <div className="player-char card-container" style={{ "--card-count": 2 }}>
            {this.props.characterCards.map((card, index) => {
                let isFaded = !!this.props.draggingCard;
                if (virusPhaseMessage) {
                    isFaded = card.cardId !== virusPhaseMessage.sourceCardId
                }
                return <Card key={card.cardId} card={card} index={index} isFaded={isFaded} />
            })}
        </div>;
    }
}

export default connect(
    (state, ownProps) => {
        return {
            draggingCard: state.draggingCard,
            dragOverCard: state.dragOverCard,
            characterCards: state.cards.players[ownProps.playerId].character,
            virusPhaseMessage: state.virusPhaseMessage
        }
    },
    null
)(Character)