import React from 'react';
import StartGame from './StartGame';
import Table from './Table';
import { connect } from 'react-redux';
import * as Constants from './../common/constants';

class Main extends React.Component {
    render() {

        if (!this.props.gameState || this.props.gameState === Constants.GAME_STATE_WAITING_PLAYERS) {
            return <StartGame />;
        }
        else if (this.props.gameState === Constants.GAME_STATE_STARTED) {
            return <Table />;
        }
        else if (this.props.gameState === Constants.GAME_STATE_VICTORY_END || this.props.gameState == Constants.GAME_STATE_OVER) {
            return <Table />; //TODO VICTORY / GAME OVER SCREEN
        }
        throw new Error("Unknown state")
    }
}

export default connect(
    (state) => {
        return {
            gameState: state.roomState ? state.roomState.gameState : null // null = not connected
        }
    }, 
    null
)(Main)
