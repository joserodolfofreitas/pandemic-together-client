import React from 'react';
import Viruses from './fields/Viruses';
import { connect } from 'react-redux';
import Character from './fields/Character';
import Player from './Player';

class OtherPlayer extends React.Component {
    render() {
        const playerId = this.props.playerId;
        const cardCount = this.props.virusCards.length + 2;
        const isCurrentTurn = playerId === this.props.currentTurnPlayerSessionId;

        return <Player playerId={playerId} position={this.props.position} isCurrentTurn={isCurrentTurn} cardCount={cardCount}>
            <Character playerId={playerId} />
            <Viruses playerId={playerId} />
        </Player>
    }
}

export default connect(
    (state, ownProps) => {
        return {
            currentTurnPlayerSessionId: state.gameFlow.currentTurnPlayerSessionId,
            virusCards: state.cards.players[ownProps.playerId].viruses,
        }
    },
    null
)(OtherPlayer)