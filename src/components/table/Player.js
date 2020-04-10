import React from 'react';
import { connect } from 'react-redux';
import { skipTurn } from './../../redux/actions';

class Player extends React.Component {

    render() {
        const position = this.props.position;

        const styles = { gridArea: position };
        const classes = `player ${position}${this.props.isCurrentTurn ? " current-turn" : ""}`;

        return (
            <div className={classes} style={styles}>
                <div className="player-name">{this.props.player.name}</div>
                <div className="player-cards card-container" style={{"--card-count": this.props.cardCount}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default connect(null, { skipTurn })(Player)