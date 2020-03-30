import React from 'react';
import LoginBox from './LoginBox';
import ChatRoom from './ChatRoom';
import Deck from './Deck';
import Player from './Player';
import PlayerHand from './PlayerHand';
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
        console.log("Table constructor", this,props.room, this.props.roomState);
        this.state = {
            currentTurn:0,
            room: this.props.room,
            roomState: this.props.roomState,
        };
    }

    onClick_StartGame() {
        let room = this.props.room;
        let roomState = this.props.roomState;
        /*for (let id in roomState.players) {
            const player: Player = roomState.players[id];
            console.log(id, player.name);
        }*/
        //room.send({type: card:"R1", onPlayer:"C1"});
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
        const playerItems = this.getPlayerItems();
        const currentPlayer = playerItems.filter(p => p.isCurrent)[0].player;
        return <div className="table">
            <div className="header">
                Pandemic Together
            </div>
            {playerItems.map(function(item, index){
                return <Player key={index} player={item.player} position={item.position}/>
            })}
            <PlayerHand player={currentPlayer}/>
            <Deck />
            <ChatRoom />
            <div className="footer">
                a collaborative effort by lots of people (will add names soon)
            </div>
        </div>
    }

    getPlayerItems(){
        const roomState = this.props.roomState;
        const currentPlayerSessionId = this.props.room.sessionId;
        let positions = ["player-c", "player-b", "player-a"];
        let players = [];
        for (let id in roomState.players) {
            const player = roomState.players[id];
            if (player.sessionId == currentPlayerSessionId) {
                players.push({position: "player-current", player, isCurrent: true})
            }else{
                players.push({position: positions.pop(), player, isCurrent: false})
            }
        }
        return players;
    }

}

export default connect(mapStateToProps, null) (Table)
