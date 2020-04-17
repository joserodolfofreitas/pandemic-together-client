import React from 'react';
import Card from './../../shared/Card';
import { connect } from 'react-redux';


class Character extends React.Component {
    render() {
        const isFaded = !!this.props.draggingCard;
        return <div className="player-char card-container" style={{ "--card-count": 2 }}>
            {this.props.playerField.map((card, index) => <Card key={card.cardId} card={card} index={index} isFaded={isFaded} />)}
        </div>;
    }
}

export default connect(
    (state, ownProps) => {
        const player = state.roomState.players[ownProps.playerId];
        return {
            draggingCard: state.draggingCard,
            dragOverCard: state.dragOverCard,
            playerField: [player.advantages[0], player.disadvantages[0]]
        }
    },
    null
)(Character)