import React from 'react';
import Card from './Card';
import * as Constants from './common/constants';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        room: state.room,
        roomState: state.roomState,
        updatesOnRoomState: state.updatesOnRoomState,
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

        const styles = { gridArea: "player-current" };
        const classes = `player player-current${isCurrentTurn ? " current-turn" : ""}`;

        return (
            <div className={classes} style={styles}>
                <div className="player-cards">
                    <div className="player-name">{player.name}</div>
                    <div className="status-cards">
                        <div className="virus-infection card-container" style={{ "--card-count": player.virusField.length }}>
                            {player.virusField.map((card, index) => <Card key={card.cardId} card={card} index={index} />)}
                        </div>
                        <div className="player-char card-container" style={{ "--card-count": 2 }}>
                            {playerField.map((card, index) => <Card key={card.cardId} card={card} index={index} />)}
                        </div>
                    </div>
                    <div className="hand-cards card-container" style={{ "--card-count": player.hand.length }}>
                        {player.hand.map((card, index) => {
                            const isPlayable = isCurrentTurn; //TODO: disadvantage anwenden
                            return <Card key={card.cardId} card={card} index={index} isHandCard={true} isPlayable={isPlayable} />
                        })}
                    </div>
                    <div className="actions">
                        <div className="action action-skip" style={{backgroundImage:"url(/images/action-skip.png)"}} onClick={() => this.onClick_advanceTurn()}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(CurrentPlayer)