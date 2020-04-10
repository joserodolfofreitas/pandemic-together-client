import React from 'react';
import Viruses from './fields/Viruses';
import Hand from './fields/Hand';
import Character from './fields/Character';
import { connect } from 'react-redux';
import { skipTurn } from './../../redux/actions';
import Player from './Player';

class CurrentPlayer extends React.Component {
    onClick_skipTurn() {
        if (this.props.player.sessionId !== this.props.activePlayerId) {
            return;
        }
        this.props.skipTurn();
    }
    render() {
        const player = this.props.player;
        let cardCount = this.props.virusCards.length + player.hand.length + 2; // + character
        const isActivePlayer = this.props.player.sessionId === this.props.activePlayerId;
        if (isActivePlayer) {
            cardCount += 1; // + action
        }
        console.log("render current player")
        return <Player player={player} position={"player-current"} isActivePlayer={isActivePlayer} cardCount={cardCount}>
            <Viruses player={player} />
            <Character player={player} />
            <Hand player={player} isActivePlayer={isActivePlayer} />
            <div className="actions">
                <div className="action action-skip" style={{ backgroundImage: "url(/images/action-skip.png)" }} onClick={() => this.onClick_skipTurn()}></div>
            </div>
        </Player>
    }
}

export default connect(
    (state, ownProps) => {
        return {
            activePlayerId: state.roomState.currentTurn,
            virusCards: ownProps.player.virusField
        }
    },
    { skipTurn }
)(CurrentPlayer)