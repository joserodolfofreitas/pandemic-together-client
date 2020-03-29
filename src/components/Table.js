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

    onClick() {
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
        let roomState = this.props.roomState;
        var content;
        if (roomState == null) {
            content = <LoginBox/>;
        } else if (roomState.gameState == Constants.GAME_STATE_WAITING_PLAYERS) {
            content =
                <div className="table">
                    <button className="start-button" onClick={() => this.onClick()} >Start Game</button>
                    <ChatRoom />
                </div>;
        }

        else if (roomState.gameState == Constants.GAME_STATE_STARTED) {

            let clientPlayerSessionId = this.props.room.sessionId;
            var index = 0;
            var players = [];
            var currentPlayer;
            for (let id in roomState.players) {
                const player: Player = roomState.players[id];
                players[index++] = player;
                if (player.sessionId == clientPlayerSessionId) {
                    currentPlayer = player;
                }
            }
            var playerPositions = ["player-c", "player-b", "player-a"];

            content =
                <div className="table">
                    <div className="header">
                        Pandemic Together
                    </div>

                    {players.map(function(player, index){
                        var position;
                        if (player.sessionId == currentPlayer.sessionId) {
                            position = "player";
                        } else {
                            position = playerPositions.pop();
                        }

                        return <Player key={index} player={player} position={position}/>
                    })}

                    <PlayerHand player={currentPlayer}/>
                    <Deck />
                    <ChatRoom />
                    <div className="footer">
                        a collaborative effort by lots of people (will add names soon)
                    </div>
                </div>
        }

        return (
            content);

    }
}

export default connect(mapStateToProps, null) (Table)
