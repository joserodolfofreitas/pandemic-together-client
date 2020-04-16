import React from 'react';
import Viruses from './fields/Viruses';
import Hand from './fields/Hand';
import Character from './fields/Character';
import { connect } from 'react-redux';
import { skipTurn } from '../../redux/actions';
import Player from './Player';
import * as Constants from '../../common/constants';

class MyPlayer extends React.Component {
    onClick_skipTurn() {
        if (this.props.playerId !== this.props.activePlayerId) {
            return;
        }
        this.props.skipTurn();
    }
    render() {
        const playerId = this.props.playerId;
        let cardCount = this.props.virusCards.length + this.props.handCards.length + 2; // + character
        const isActivePlayer = playerId === this.props.activePlayerId;
        if (isActivePlayer) {
            cardCount += 1; // + action
        }
        return <Player playerId={playerId} position={"player-current"} isActivePlayer={isActivePlayer} cardCount={cardCount}>
            <Viruses playerId={playerId} />
            <Character playerId={playerId} />
            <Hand playerId={playerId} isActivePlayer={isActivePlayer} />
            <div className="actions">
                <div className="action action-skip" style={{ backgroundImage: "url(/images/action-skip.png)" }} onClick={() => this.onClick_skipTurn()}></div>
            </div>
        </Player>
    }
}

export default connect(
    (state, ownProps) => {
        return {
            activePlayerId: state.roomState.roundState === Constants.ROUND_STATE_PLAYERS_PHASE ? state.roomState.currentTurn : null,
            virusCards: state.roomState.players[ownProps.playerId].virusField,
            handCards: state.roomState.players[ownProps.playerId].hand
        }
    },
    { skipTurn }
)(MyPlayer)