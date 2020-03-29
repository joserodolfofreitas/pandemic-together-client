import React from 'react';
import LoginBox from './LoginBox';
import ChatRoom from './ChatRoom';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
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
        console.log(roomState.currentTurn);
        for (let id in roomState.players) {
            const player: Player = roomState.players[id];
            console.log(id, player.name);
        }
        room.send({card:"R1", onPlayer:"C1"});
        room.send("NEXT_TURN");
        this.setState({currentTurn: this.state.currentTurn});
    }

    render() {
        let roomState = this.props.roomState;
        var content;
        if (roomState == null) {
            content = <LoginBox/>;
        } else {

            content =
                <div className="table">

                    <button className="table title" onClick={() => this.onClick()} >Table</button>
                    <ChatRoom />
                </div>;
        }

        return (content);
    }
}

export default connect(mapStateToProps, null) (Table)
