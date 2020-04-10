import React from 'react';
import Viruses from './fields/Viruses';
import { connect } from 'react-redux';
import Character from './fields/Character';
import Player from './Player';

class OtherPlayer extends React.Component {
    render() {
        const player = this.props.player;
        const cardCount = player.virusField.length + 2;

        return <Player player={player} position={this.props.position} isCurrentTurn={this.props.isCurrentTurn} cardCount={cardCount}>
            <Character player={player} isFaded={!!this.props.draggingCard} />
            <Viruses player={player} draggingCard={this.props.draggingCard} dragOverCard={this.props.dragOverCard} />
        </Player>
    }
}

export default connect(null, null)(OtherPlayer)