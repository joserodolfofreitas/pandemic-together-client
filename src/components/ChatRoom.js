import React from 'react';
import Card from './Card';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        player : state.player,
        room : state.room,
        roomState : state.roomState,
        updatesOnRoomState : state.updatesOnRoomState,
    }
}


class ChatRoom extends React.Component {

    render() {
        let roomState = this.props.roomState;
        var players = [];
        var index = 0;
        for (let id in roomState.players) {
            const player: Player = roomState.players[id];
            console.log(player.name);
            players[index++] = player;
        }
        return (
            <div className="chat-room">
                <h1>Players in the room</h1>
                {players.map(function(player, index){
                    return <div key={index} style={{textAlign: "center"}}><span>{player.name}</span></div>
                })}

            </div>
        );
    }
}

export default connect(mapStateToProps, null) (ChatRoom)