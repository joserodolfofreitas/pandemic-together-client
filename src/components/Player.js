import React from 'react';
import Card from './Card';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        room: state.room,
        roomState: state.roomState,
        updatesOnRoomState: state.updatesOnRoomState,
    }
}

class Player extends React.Component {

    render() {
        const player = this.props.player;
        const position = this.props.position;
        const containerStyle = { gridArea: position };
        const classes = `player ${position}${this.props.roomState.currentTurn == player.sessionId ? " current-turn" : ""}`;
        const playerField = [player.advantages[0], player.disadvantages[0]];
        const cardCount = player.virusField.length + 2; //2 playerField cards
        return (
            <div className={classes} style={containerStyle}>
                <div className="player-cards card-container" style={{ gridArea: "player-cards", "--card-count": cardCount }}>
                    <div className="virus-infection" style={{ }}>
                        {playerField.map((card, index) => <Card key={card.cardId} card={card} />)}
                    </div>
                    <div className="virus-infection" style={{ }}>
                        {player.virusField.map((card, index) => <Card key={card.cardId} card={card} />)}
                    </div>
                </div>
                <div className="player-name" style={{ gridArea: "player-name" }}>{player.name}</div>
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(Player)