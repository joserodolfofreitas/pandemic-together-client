import React from 'react';
import Card from './Card';
import * as Constants from './common/constants';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        room : state.room,
        roomState : state.roomState,
        updatesOnRoomState : state.updatesOnRoomState,
    }
}

class CurrentPlayer extends React.Component {
    onClick_advanceTurn() {
        if (this.props.roomState.currentTurn != this.props.room.sessionId) {
            return;
        }
        const message = {type: Constants.GM_ADVANCE_TURN, player: this.props.room.sessionId};
        this.props.room.send(message);
    }
    render() {
        let player = this.props.player;
        let containerStyle = {gridArea: "player-current"};
        let classes = "player player-current";

        return (
            <div className={classes} style={containerStyle}>
                <div >
                    {player.hand.map(function(card, index){
                        return <Card key={card.cardId} card={card} handCard={true}/>
                    })}
                </div>
                <div style={{backgroundColor:"#0F0", margin:"auto"}}>
                    <span>your hand</span>

                    <span><button onClick={() => this.onClick_advanceTurn()}> End turn (pass)</button></span>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, null) (CurrentPlayer)