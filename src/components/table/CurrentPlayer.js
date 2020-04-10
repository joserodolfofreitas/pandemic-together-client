import React from 'react';
import Viruses from './fields/Viruses';
import Hand from './fields/Hand';
import Character from './fields/Character';
import { connect } from 'react-redux';
import { skipTurn } from './../../redux/actions';
import Player from './Player';

class CurrentPlayer extends React.Component {
    onClick_skipTurn() {
        if (!this.props.isCurrentTurn) {
            return;
        }
        this.props.skipTurn();
    }
    render() {
        const player = this.props.player;
        let cardCount = player.virusField.length + player.hand.length + 2; // + character
        if (this.props.isCurrentTurn) {
            cardCount += 1; // + action
        }
        return <Player player={player} position={"player-current"} isCurrentTurn={this.props.isCurrentTurn} cardCount={cardCount}>
            <Viruses player={player} draggingCard={this.props.draggingCard} dragOverCard={this.props.dragOverCard} />
            <Character player={player} isFaded={!!this.props.draggingCard} />
            <Hand player={player} isCurrentTurn={this.props.isCurrentTurn} draggingCard={this.props.draggingCard} />
            <div className="actions">
                <div className="action action-skip" style={{ backgroundImage: "url(/images/action-skip.png)" }} onClick={() => this.onClick_skipTurn()}></div>
            </div>
        </Player>
    }
}

export default connect(null, { skipTurn })(CurrentPlayer)