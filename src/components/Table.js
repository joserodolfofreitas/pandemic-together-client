import React from 'react';
import ChatRoom from './ChatRoom';
import Deck from './Deck';
import Player from './Player';
import CurrentPlayer from './CurrentPlayer';
import { connect } from 'react-redux';
import {startGame} from './redux/actions';

function mapStateToProps(state) {
    return {
        clientSessionId : state.clientSessionId,
        player : state.player,
        room : state.room,
        roomState : state.roomState,
        updatesOnRoomState : state.updatesOnRoomState,
    }
}

class Table extends React.Component {
    render(){
        const playerItems = this.getOtherPlayerItems();
        const currentPlayer = this.getCurrentPlayer();
        const className = `table players-${playerItems.length+1}`;

        return <div className={className} style={{backgroundImage: "url(/images/background_table.jpg)"}}>
            <div className="header">
                <span className="logo" style={{backgroundImage: "url(/images/logo.png)"}}></span>
                <h1>Pandemic Together</h1>
            </div>
            {playerItems.map(function(item, index){
                return <Player key={index} player={item.player} position={item.position}/>
            })}
            <CurrentPlayer player={currentPlayer}/>
            <Deck playerItems={playerItems} />
            <ChatRoom />
            <div className="footer">
                a collaborative effort by lots of people (will add names soon)
            </div>
        </div>
    }

    getOtherPlayerItems(){
        const roomStatePlayers = this.props.roomState.players;
        const currentPlayerSessionId = this.props.room.sessionId;
        let players = [];
        let indexCounter = 0;
        let currentPlayerIndex = 0;
        for (let id in roomStatePlayers) {
            const player = roomStatePlayers[id];
            if (player.sessionId !== currentPlayerSessionId) {
                players.push({player})
            }else{
                currentPlayerIndex = indexCounter;
            }
            indexCounter++;
        }
        players = players.concat(players.splice(0,currentPlayerIndex))
        let positions = players.length === 2 ? ["player-left", "player-right"] : ["player-left", "player-top", "player-right"];
        positions.forEach((p,i) => players[i].position = p);
        return players;
    }

    getCurrentPlayer(){       
        const roomState = this.props.roomState;
        const currentPlayerSessionId = this.props.room.sessionId;
        return Object.values(roomState.players).filter(p => p.sessionId === currentPlayerSessionId)[0]
    }

}

export default connect(mapStateToProps, {startGame}) (Table)
