import React from 'react';
import { connect } from 'react-redux';

class Deck extends React.Component {
    render() {
        const currentTurnPlayer = this.props.playerItems.filter(p => p.playerId === this.props.currentTurnPlayerSessionId);
        const currentTurnPlayerPosition = (currentTurnPlayer && currentTurnPlayer.length) ? currentTurnPlayer[0].position : "player-current";
        const className = `deck ${currentTurnPlayerPosition}`;

        if (this.props.cardsOnStack > 0) {
            let cards = [];
            for (let i = 0; i < this.props.cardsOnStack; i++) {
                cards.push(<div key={`card-${i}`} className="card" style={{ backgroundImage: "url(/images/card-deck.png)" }} />)
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

export default connect(
    (state) => {
        return {
            currentTurnPlayerSessionId: state.gameFlow.currentTurnPlayerSessionId,
            cardsOnStack: Math.min(state.deck.length, 4)
        }
    },
    null
)(Deck)