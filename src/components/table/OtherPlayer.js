import React from 'react';
import Viruses from './fields/Viruses';
import { connect } from 'react-redux';
import Character from './fields/Character';
import Player from './Player';

class OtherPlayer extends React.Component {
    render() {
        const player = this.props.player;
        const cardCount = player.virusField.length + 2;
        const isActivePlayer = this.props.player.sessionId === this.props.activePlayerId;

        return <Player player={player} position={this.props.position} isActivePlayer={isActivePlayer} cardCount={cardCount}>
            <Character player={player} />
            <Viruses player={player} />
        </Player>
    }
}

export default connect(
    (state) => {
        return {
            activePlayerId: state.roomState.currentTurn
        }
    },
    null
)(OtherPlayer)