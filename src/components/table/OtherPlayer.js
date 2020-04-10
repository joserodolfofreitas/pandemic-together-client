import React from 'react';
import Card from '../shared/Card';
import Viruses from './fields/Viruses';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        room: state.room,
        roomState: state.roomState,
        updatesOnRoomState: state.updatesOnRoomState,
        draggingCard: state.draggingCard
    }
}


class OtherPlayer extends React.Component {

    render() {
        const player = this.props.player;
        const position = this.props.position;

        const playerField = [player.advantages[0], player.disadvantages[0]];
        const isDraggingCard = !!this.props.draggingCard;

        const styles = { gridArea: position, backgroundColor: this.props.isOver ? "#0f0" : null };
        const classes = `player ${position}${this.props.roomState.currentTurn === player.sessionId ? " current-turn" : ""}`;
        const cardCount = player.virusField.length + 2;//TODO remove filter(c => !c.graveyard), when graveyard property is removed

        return <div className={classes} style={styles}>
            <div className="player-cards card-container" style={{ "--card-count": cardCount }}>
                <div className="player-char card-container" style={{ "--card-count": 2 }}>
                    {playerField.map((card, index) => <Card key={card.cardId} card={card} index={index} isFaded={isDraggingCard} />)}
                </div>
                <Viruses cards={player.virusField} />
            </div>
            <div className="player-name">{player.name}</div>
        </div>;
    }
}

export default connect(mapStateToProps, null)(OtherPlayer)