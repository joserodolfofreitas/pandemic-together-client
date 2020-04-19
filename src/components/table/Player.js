import React from 'react';
import { connect } from 'react-redux';

class Player extends React.Component {
    render() {
        const position = this.props.position;

        const styles = { gridArea: position };
        let classes = `player ${position}`;
        if(this.props.isCurrentTurn){
            classes += " current-turn";
        }
        return (
            <div className={classes} style={styles}>
                <div className="player-name">{this.props.playerName}</div>
                <div className="player-cards card-container" style={{ "--card-count": this.props.cardCount }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default connect(
    (state, ownProps) => {
        return {
            playerName: state.players[ownProps.playerId].name
        }
    },
    null
)(Player)