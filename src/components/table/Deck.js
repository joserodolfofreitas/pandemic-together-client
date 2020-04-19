import React from 'react';
import { connect } from 'react-redux';

class Deck extends React.Component {
    render() {
        const activePlayer = this.props.playerItems.filter(p => p.playerID === this.props.activePlayerId);
        const activePlayerPosition = (activePlayer && activePlayer.length) ? activePlayer[0].position : "player-current";
        const className = `deck ${activePlayerPosition}`;

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
            activePlayerId: state.currentTurn,
            cardsOnStack: Math.min(state.deck.length, 4)
        }
    },
    null
)(Deck)