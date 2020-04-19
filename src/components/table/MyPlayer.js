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
        const isCurrentTurn = playerId === this.props.currentTurnPlayerSessionId;
        if (isCurrentTurn) {
            cardCount += 1; // + action
        }
        return <Player playerId={playerId} position={"player-current"} isCurrentTurn={isCurrentTurn} cardCount={cardCount}>
            <Viruses playerId={playerId} />
            <Character playerId={playerId} />
            <Hand playerId={playerId} isActivePlayer={isCurrentTurn} />
            <div className="actions">
                <div className="action action-skip" style={{ backgroundImage: "url(/images/action-skip.png)" }} onClick={() => this.onClick_skipTurn()}></div>
            </div>
        </Player>
    }
}

export default connect(
    (state, ownProps) => {
        return {
            currentTurnPlayerSessionId: state.gameFlow.currentTurnPlayerSessionId,
            virusCards: state.players[ownProps.playerId].viruses,
            handCards: state.players[ownProps.playerId].hand
        }
    },
    { skipTurn }
)(MyPlayer)