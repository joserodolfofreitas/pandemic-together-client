import React from 'react';
import * as Constants from './../../common/constants';
import { connect } from 'react-redux';


function mapStateToProps(state) {
    return {
        player: state.player,
        room: state.room,
        roomState: state.roomState,
        updatesOnRoomState: state.updatesOnRoomState,
    }
}


class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollapsed: false
        }
    }

    onClick_toggleCollapsed() {
        this.setState({ isCollapsed: !this.state.isCollapsed });
    }

    render() {
        const roomState = this.props.roomState;
        let players = [];
        let index = 0;
        for (let id in roomState.players) {
            const player = roomState.players[id];
            players[index++] = player;
        }
        const round = (roomState.gameState === Constants.GAME_STATE_STARTED) ? "round " + roomState.round : "";

        return (
            <div className={`chat-room${this.state.isCollapsed ? " collapsed" : ""}`}>
                <div className="chat-header">
                    <span className="icon" style={{ backgroundImage: "url(/images/icon-chat.png)" }} onClick={() => this.onClick_toggleCollapsed()}></span>
                    <h2>Players in the room</h2>
                </div>
                <div className="chat-content">
                    {players.map(function (player, index) {
                        var playerCurrentTurn = roomState.currentTurn === player.sessionId;
                        return <div key={index} style={{ textAlign: "center" }}>{playerCurrentTurn ? <span style={{ float: "left", color: "#050" }}>=></span> : ""}<span>{player.name}</span></div>
                    })}
                    <div><hr /></div>
                    <div style={{ fontSize: "0.6em", color: "#333", textAlign: "center" }}>{roomState.gameState}</div>
                    <div style={{ fontSize: "0.7em", color: "#333", textAlign: "center" }}>{round}</div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(ChatRoom)