import React from 'react';
import LoginBox from './LoginBox';
import ChatRoom from './ChatRoom';
import Deck from './Deck';
import Player from './Player';
import CurrentPlayer from './CurrentPlayer';
import { connect } from 'react-redux';
import * as Constants from './common/constants';

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
    constructor(props) {
        super(props);
        this.state = {
            currentTurn: 0,
            room: this.props.room,
            roomState: this.props.roomState,
        };
    }

    onClick_StartGame() {
        let room = this.props.room;
        room.send({type: Constants.GM_START_GAME});
        this.setState({currentTurn: this.state.currentTurn});
    }

    render() {
        const roomState = this.props.roomState;
        if (roomState == null) {
            return this.renderLogin();
        } else if (roomState.gameState == Constants.GAME_STATE_WAITING_PLAYERS) {
            return this.renderWaitingForPlayers();
        }
        else if (roomState.gameState == Constants.GAME_STATE_STARTED) {
            return this.renderTable();
       
        }

        else if (roomState.gameState == Constants.GAME_STATE_VICTORY_END) {
            return this.renderTable(); //TODO VICTORY SCREEN

        }
        throw new Error("Unknown state")
    }

    renderLogin(){
        return <LoginBox/>
    }

    renderWaitingForPlayers(){
        return <div className="table">
            <button className="start-button" onClick={() => this.onClick_StartGame()} >Start Game</button>
            <ChatRoom />       
        </div>;
    }

    renderTable(){
        const playerItems = this.getOtherPlayerItems();
        const currentPlayer = this.getCurrentPlayer();
        const className = `table players-${playerItems.length+1}`;

        return <div className={className}>
            <div className="header">
                <span className="logo" style={{backgroundImage: "url(/images/logo.png)"}}></span>
                Pandemic Together
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
        console.log("--->",this.props.roomState,this.props.room);
        const roomStatePlayers = this.props.roomState.players;
        const currentPlayerSessionId = this.props.room.sessionId;
        console.log(Object.keys(roomStatePlayers));
        let players = [];
        let indexCounter = 0;
        let currentPlayerIndex = 0;
        for (let id in roomStatePlayers) {
            const player = roomStatePlayers[id];
            if (player.sessionId != currentPlayerSessionId) {
                players.push({player})
            }else{
                currentPlayerIndex = indexCounter;
            }
            indexCounter++;
        }
        players = players.concat(players.splice(0,currentPlayerIndex))
        let positions = players.length == 2 ? ["player-left", "player-right"] : ["player-left", "player-top", "player-right"];
        positions.forEach((p,i) => players[i].position = p);
        return players;
    }

    getCurrentPlayer(){       
        const roomState = this.props.roomState;
        const currentPlayerSessionId = this.props.room.sessionId;
        return Object.values(roomState.players).filter(p => p.sessionId == currentPlayerSessionId)[0]
    }

}

export default connect(mapStateToProps, null) (Table)
