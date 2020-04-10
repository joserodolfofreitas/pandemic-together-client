import React from 'react';
import { connect } from 'react-redux';

class Player extends React.Component {
    render() {
        const position = this.props.position;

        const styles = { gridArea: position };
        let classes = `player ${position}`;
        if(this.props.isActivePlayer){
            classes += " current-turn";
        }
        console.log("render player", this.props.player.name)
        return (
            <div className={classes} style={styles}>
                <div className="player-name">{this.props.player.name}</div>
                <div className="player-cards card-container" style={{ "--card-count": this.props.cardCount }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    null
)(Player)