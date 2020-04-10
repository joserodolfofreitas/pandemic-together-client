import React from 'react';
import ChatRoom from './shared/ChatRoom';
import Deck from './table/Deck';
import OtherPlayer from './table/OtherPlayer';
import CurrentPlayer from './table/CurrentPlayer';
import { connect } from 'react-redux';
import {startGame} from './../redux/actions';

function mapStateToProps(state) {
    return {
        room : state.room,
        roomState : state.roomState,
        updatesOnRoomState : state.updatesOnRoomState,
        draggingCard: state.draggingCard,
        dragOverCard: state.dragOverCard
    }
}

class Table extends React.Component {
    render(){
        const playerItems = this.getOtherPlayerItems();
        const currentPlayer = this.getCurrentPlayer();

        const currentTurnPlayerSessionId = this.props.roomState.currentTurn;
        const draggingCard = this.props.draggingCard;
        const dragOverCard = this.props.dragOverCard;

        return <div className={`table players-${playerItems.length+1}`} style={{backgroundImage: "url(/images/background_table.jpg)"}}>
            <div className="header">
                <span className="logo" style={{backgroundImage: "url(/images/logo.png)"}}></span>
                <h1>Pandemic Together</h1>
            </div>
            {playerItems.map(function(item, index){
                return <OtherPlayer key={index} player={item.player} position={item.position} isCurrentTurn={item.player.sessionId === currentTurnPlayerSessionId} draggingCard={draggingCard} dragOverCard={dragOverCard}/>
            })}
            <CurrentPlayer player={currentPlayer} isCurrentTurn={currentPlayer.sessionId === currentTurnPlayerSessionId} draggingCard={draggingCard} dragOverCard={dragOverCard}/>
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
