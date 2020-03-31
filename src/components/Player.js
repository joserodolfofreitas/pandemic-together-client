import React from 'react';
import Card from './Card';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        room : state.room,
        roomState : state.roomState,
        updatesOnRoomState : state.updatesOnRoomState,
    }
}

class Player extends React.Component {

    render() {
        let roomState = this.props.roomState;
        var players = [];

        let player = this.props.player;
        let position = this.props.position;
        let containerStyle = {gridArea: position};
        let classes = `player-area ${position}${this.props.roomState.currentTurn == player.sessionId ? " current-turn" : ""}`;

        var playerField = [player.advantages[0], player.disadvantages[0]];

        return (
            <div className={classes} style={containerStyle}>
                <div style={{gridArea:"virus-infection", backgroundColor:"#00F", margin:"auto"}}>
                    {player.virusField.map(function(card, index){
                        return <Card key={card.cardId} card={card}/>
                    })}

                </div>

                <div style={{gridArea:"player-char", backgroundColor:"#F00", margin:"auto"}}>
                    {playerField.map(function(card, index){
                        return <Card key={card.cardId} card={card}/>
                    })}
                </div>
                <div style={{gridArea:"player-name", backgroundColor:"#0F0", margin:"auto"}}>
                    {player.name}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, null) (Player)