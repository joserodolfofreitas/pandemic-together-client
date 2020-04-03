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
        const currentPlayer = this.props.playerItems.filter(p => p.player.sessionId === this.props.roomState.currentTurn);
        const currentPlayerPosition = (currentPlayer && currentPlayer.length)?currentPlayer[0].position : "player-current";
        const className = `deck ${currentPlayerPosition}`;
        const cardsOnStack = Math.min(this.props.roomState.deck.length, 4);
        if (cardsOnStack > 0) {
            let cards = [];
            for(let i = 0; i < cardsOnStack; i++){
                cards.push(<div className="card" style={{ backgroundImage: "url(/images/card-deck.png)" }} />)
            }
            return <div className={className}>
                    <div className="stack">
                        {cards}
                    </div>
                </div>
        } else {
            return <div className="deck deck-empty"></div>
        }
        
    }
}

export default connect(mapStateToProps, null)(Deck)