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
        const statusCardCount = player.virusField.length + 2; //2 playerField cards
        const isCurrentTurn = this.props.roomState.currentTurn === player.sessionId;

        const styles = { gridArea: "player-current" };
        const classes = `player player-current${isCurrentTurn ? " current-turn" : ""}`;

        return (
            <div className={classes} style={styles}>
                <div className="player-cards">
                    <div className="player-name" style={{ gridArea: "player-name" }}>{player.name}</div>
                    <div className="status-cards card-container" style={{ gridArea: "status-cards", "--card-count": statusCardCount }}>
                        <div className="virus-infection" style={{ gridArea: "virus-infection" }}>
                            {player.virusField.map(card => <Card key={card.cardId} card={card} />)}
                        </div>
                        <div className="player-char" style={{ gridArea: "player-char" }}>
                            {playerField.map(card => <Card key={card.cardId} card={card} />)}
                        </div>
                    </div>
                    <div className="hand-cards" style={{ gridArea: "hand-cards", "--card-count": player.hand.length }}>
                        {player.hand.map(card => {
                            const isPlayable = isCurrentTurn; //TODO: disadvantage anwenden
                            return <Card key={card.cardId} card={card} isHandCard={true} isPlayable={isPlayable} />
                        })}
                    </div>
                </div>
                <div style={{ backgroundColor: "#0F0", margin: "auto" }}>
                    <span>your hand</span>
                    <span><button onClick={() => this.onClick_advanceTurn()}> End turn (pass)</button></span>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(CurrentPlayer)