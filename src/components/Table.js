import React from 'react';
import ChatRoom from './shared/ChatRoom';
import Deck from './table/Deck';
import OtherPlayer from './table/OtherPlayer';
import CurrentPlayer from './table/CurrentPlayer';
import GameMessages from './GameMessages';
import { connect } from 'react-redux';
import { startGame } from './../redux/actions';

        currentPlayerSessionId : state.currentPlayerSessionId,
class Table extends React.Component {
    render() {
        const playerItems = this.getOtherPlayerItems();
        
        return <div className={`table players-${playerItems.length + 1}`} style={{ backgroundImage: "url(/images/background_table.jpg)" }}>
            <div className="header">
                <span className="logo" style={{ backgroundImage: "url(/images/logo.png)" }}></span>
                <h1>Pandemic Together</h1>
            </div>
            {playerItems.map((item, index) => {
                return <OtherPlayer key={index} playerId={item.playerId} position={item.position} />
            })}
            <CurrentPlayer playerId={this.props.currentPlayerId} />
            <Deck playerItems={playerItems} />
            <ChatRoom />
            <div className="footer">
                a collaborative effort by lots of people (will add names soon)
            </div>
            <GameMessages />
        </div>
    }

    getOtherPlayerItems() {
        let players = [];
        let indexCounter = 0;
        let currentPlayerIndex = 0;
        for (let id in this.props.players) {
            const player = this.props.players[id];
            if (player.sessionId !== this.props.currentPlayerId) {
                players.push({ playerId: player.sessionId })
            } else {
                currentPlayerIndex = indexCounter;
            }
            indexCounter++;
        }
        players = players.concat(players.splice(0, currentPlayerIndex))
        let positions = players.length === 2 ? ["player-left", "player-right"] : ["player-left", "player-top", "player-right"];
        positions.forEach((p, i) => players[i].position = p);
        return players;
    }

}

export default connect(
    (state) => {
        const result = {
            players: state.roomState.players,
            currentPlayerId: state.room.sessionId
        }
        return result;
    },
    { startGame }
)(Table)
