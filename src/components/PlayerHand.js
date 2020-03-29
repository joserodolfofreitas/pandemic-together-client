import React from 'react';
import Card from './Card';

class PlayerHand extends React.Component {

    onClick(window) {
        console.log(window);
    }

    render() {
        let player = this.props.player;
        let containerStyle = {gridArea: "player-hand"};
        let classes = "player-area";

        return (
            <div className={classes} style={containerStyle}>
                <div >
                    <div className="card hand-card" style={{float:"left"}}>Advantage</div>
                    <div className="card hand-card" style={{float:"left"}}>C1</div>
                    <div className="card hand-card" style={{float:"left"}}>Disadvantage</div>
                </div>
                <div style={{backgroundColor:"#0F0", margin:"auto"}}>
                    your hand
                </div>
            </div>
        );
    }
}

export default PlayerHand;