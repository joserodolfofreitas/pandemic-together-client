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

        const playerField = [player.advantages[0], player.disadvantages[0]];

        const styles = { gridArea: position, backgroundColor: this.props.isOver ? "#0f0" : null };
        const classes = `player ${position}${this.props.roomState.currentTurn === player.sessionId ? " current-turn" : ""}`;

        return <div className={classes} style={styles}>
            <div className="player-cards card-container" style={{"--card-count": player.virusField.length + 2 }}>
                <div className="player-char card-container" style={{"--card-count": 2 }}>
                    {playerField.map((card, index) => <Card key={card.cardId} card={card} index={index} />)}
                </div>
                <div className="virus-infection card-container" style={{"--card-count": player.virusField.length }}>
                    {player.virusField.map((card, index) => <Card key={card.cardId} card={card} index={index} />)}
                </div>
            </div>
            <div className="player-name">{player.name}</div>
        </div>
            ;
    }
}

export default connect(mapStateToProps, null)(Player)