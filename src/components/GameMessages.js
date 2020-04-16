import React from 'react';
import { connect } from 'react-redux';
import { setGameMessage } from './redux/actions'

function mapStateToProps(state) {
    return {
        gameMessage: state.gameMessage,
        roomState: state.roomState,
        room: state.room,
    }
}


class GameMessages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updates:0
        }
    }

    gameMessage;
    reset = false;
    timeoutHolder;

    resetFadeAnimation() {
        if (this.reset) {
            setTimeout(() => {
                this.gameMessage = {type:"clean"};
                this.reset = false;
                this.setState({updates: this.state.updates + 1})
            }, 5000);
        }
    }

    componentDidMount() {
        this.resetFadeAnimation();
    }

    componentDidUpdate() {
        this.resetFadeAnimation();
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutHolder);
    }

    render() {
        var message = "";
        const players = this.props.roomState.players;
        var classes = "game-messages ";
        var imgSrc = "/images/card-D4.png";

        if (this.gameMessage && this.gameMessage.type == "clean") {
            this.gameMessage = null;
            return <div class={classes} />
        }

        this.gameMessage = this.props.gameMessage;
        this.reset = true;

        if (this.gameMessage && this.gameMessage.type) {
            switch (this.gameMessage.type) {
                case "currentTurn":
                    const player = players[this.gameMessage.value];
                    if (player.sessionId == this.props.room.sessionId) {
                        message = "Your turn.";
                    } else {
                        message = player.name + "'s turn.";
                    }
                    classes +="fadeinout";
                    break;
                case "roundState":
                    message = this.gameMessage.value;
                    classes +="fadeinout";
                    break;
                case "gameState":
                    message = this.gameMessage.value;
                    classes +="fadein";
                    break;
                default:
                    break;
            }
        }
        return (message != "") ? <div className={classes}>
                    <div>
                        <img src={imgSrc} />
                        <span>{message}</span>
                    </div>
                </div> : (null);
    }
}

export default connect(mapStateToProps, {setGameMessage})(GameMessages)