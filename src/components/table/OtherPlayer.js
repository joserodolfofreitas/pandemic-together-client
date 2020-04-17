import React from 'react';
import Viruses from './fields/Viruses';
import { connect } from 'react-redux';
import Character from './fields/Character';
import Player from './Player';
import * as Constants from '../../common/constants';

class OtherPlayer extends React.Component {
    render() {
        const playerId = this.props.playerId;
        const cardCount = this.props.virusCards.length + 2;
        const isActivePlayer = playerId === this.props.activePlayerId;

        return <Player playerId={playerId} position={this.props.position} isActivePlayer={isActivePlayer} cardCount={cardCount}>
            <Character playerId={playerId} />
            <Viruses playerId={playerId} />
        </Player>
    }
}

export default connect(
    (state, ownProps) => {
        return {
            activePlayerId: state.roomState.roundState === Constants.ROUND_STATE_PLAYERS_PHASE ? state.roomState.currentTurn : null,
            virusCards: state.roomState.players[ownProps.playerId].virusField,
        }
    },
    null
)(OtherPlayer)