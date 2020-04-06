import React from 'react';
import Card from './Card';
import VirusCards from './VirusCards';
import * as Constants from './common/constants';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        room: state.room,
        roomState: state.roomState,
        updatesOnRoomState: state.updatesOnRoomState,
        draggingCard: state.draggingCard
    }
}

class CurrentPlayer extends React.Component {
    onClick_advanceTurn() {
        if (this.props.roomState.currentTurn !== this.props.room.sessionId) {
            return;
        }
        const message = { type: Constants.GM_ADVANCE_TURN, player: this.props.room.sessionId };
        this.props.room.send(message);
    }
    render() {
        const player = this.props.player;

        const playerField = [player.advantages[0], player.disadvantages[0]];
        const isCurrentTurn = this.props.roomState.currentTurn === player.sessionId;
        const isDraggingCard = !!this.props.draggingCard;

        const styles = { gridArea: "player-current" };
        const classes = `player player-current${isCurrentTurn ? " current-turn" : ""}`;

        return (
            <div className={classes} style={styles}>
                <div className="player-cards">
                    <div className="player-name">{player.name}</div>
                    <div className="status-cards">
                        <VirusCards cards={player.virusField} />
                        <div className="player-char card-container" style={{ "--card-count": 2 }}>
                            {playerField.map((card, index) => <Card key={card.cardId} card={card} index={index} isFaded={isDraggingCard} />)}
                        </div>
                    </div>
                    <div className="hand-cards card-container" style={{ "--card-count": player.hand.length }}>
                        {player.hand.map((card, index) => {
                            const isPlayable = isCurrentTurn; //TODO: disadvantage anwenden
                            return <Card key={card.cardId} card={card} index={index} isHandCard={true} isPlayable={isPlayable} isFaded={isDraggingCard} isHidden={isDraggingCard && this.props.draggingCard.cardId == card.cardId} />
                        })}
                    </div>
                    <div className="actions">
                        <div className="action action-skip" style={{ backgroundImage: "url(/images/action-skip.png)" }} onClick={() => this.onClick_advanceTurn()}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(CurrentPlayer)