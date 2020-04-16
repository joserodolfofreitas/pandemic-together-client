import React from 'react';
import StartGame from './StartGame';
import Table from './Table';
import { connect } from 'react-redux';
import * as Constants from './common/constants';

function mapStateToProps(state) {
    return {
        roomState: state.roomState,
        updatesOnRoomState: state.updatesOnRoomState
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomState: this.props.roomState
        };
    }

    render() {
        const roomState = this.props.roomState;
        if (roomState === null || roomState.gameState === Constants.GAME_STATE_WAITING_PLAYERS) {
            return <StartGame />;
        }
        else if (roomState.gameState === Constants.GAME_STATE_STARTED || roomState.gameState === Constants.GAME_STATE_VICTORY_END ||  roomState.gameState === Constants.GAME_STATE_OVER) {
            return <Table />;
        }
        throw new Error("Unknown state")
    }
}

export default connect(mapStateToProps, {  })(Main)
