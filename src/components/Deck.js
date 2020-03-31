import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        roomState: state.roomState,
        updatesOnRoomState: state.updatesOnRoomState,
    }
}

class Deck extends React.Component {
    render() {
        const currentPlayer = this.props.playerItems.filter(p => p.player.sessionId == this.props.roomState.currentTurn);
        const currentPlayerPosition = (currentPlayer && currentPlayer.length)?currentPlayer[0].position : "player-current";
        const className = `deck ${currentPlayerPosition}`;
        if (this.props.roomState.deck.length > 0) {
            return <div className={className}>
                    <div className="stack">
                        <div className="card" style={{ backgroundImage: "url(/images/card-deck.png)" }} />
                        <div className="card" style={{ backgroundImage: "url(/images/card-deck.png)" }} />
                        <div className="card" style={{ backgroundImage: "url(/images/card-deck.png)" }} />
                        <div className="card" style={{ backgroundImage: "url(/images/card-deck.png)" }} />
                    </div>
                </div>
        } else {
            return <div className="deck deck-empty"></div>
        }
        
    }
}

export default connect(mapStateToProps, null)(Deck)