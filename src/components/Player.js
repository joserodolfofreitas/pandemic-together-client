import React from 'react';
import Card from './Card';

class Player extends React.Component {

    onClick(window) {
        console.log(window);
    }

    render() {
        let player = this.props.player;
        let position = this.props.position;
        let containerStyle = {gridArea: position};
        let classes = "player-area " + position;

        return (
            <div className={classes} style={containerStyle}>
                <div style={{gridArea:"virus-infection", backgroundColor:"#F00", margin:"auto"}}>
                    <div className="card" style={{float:"left"}}>V</div>
                    <div className="card" style={{float:"left"}}>V</div>
                    <div className="card" style={{float:"left"}}>V</div>
                </div>

                <div style={{gridArea:"player-char", backgroundColor:"#0F0", margin:"auto"}}>
                    <div className="card" style={{float:"left"}}>Advantage</div>
                    <div className="card" style={{float:"left"}}>C1</div>
                    <div className="card" style={{float:"left"}}>Disadvantage</div>
                </div>
                <div style={{gridArea:"player-name", backgroundColor:"#0F0", margin:"auto"}}>
                    {position}
                </div>
            </div>
        );
    }
}

export default Player;