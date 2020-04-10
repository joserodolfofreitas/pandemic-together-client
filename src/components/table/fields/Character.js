import React from 'react';
import Card from './../../shared/Card';
import { connect } from 'react-redux';


class Character extends React.Component {
    render() {
        const player = this.props.player;
        const playerField = [player.advantages[0], player.disadvantages[0]];
        const isFaded = !!this.props.draggingCard;
        return <div className="player-char card-container" style={{ "--card-count": 2 }}>
            {playerField.map((card, index) => <Card key={card.cardId} card={card} index={index} isFaded={isFaded} />)}
        </div>;
    }
}

export default connect(
    (state) => {
        return {
            draggingCard: state.draggingCard,
            dragOverCard: state.dragOverCard
        }
    },
    null
)(Character)