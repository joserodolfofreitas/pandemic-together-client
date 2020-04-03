import React from 'react';
import Card from './Card';
import { connect } from 'react-redux';
import * as Constants from './common/constants';
import { DropTarget } from 'react-dnd';

function mapStateToProps(state) {
    return {
        room: state.room,
        roomState: state.roomState,
        updatesOnRoomState: state.updatesOnRoomState,
    }
}

const dndTarget = {
    drop(props, monitor, component){
        console.log("drop")
    },
    canDrop(props, monitor){
        return true;
    }
}

function dndCollect(connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
      itemType: monitor.getItemType(),
    }
  }

class Player extends React.Component {

    render() {
        const player = this.props.player;
        const position = this.props.position;
        
        const playerField = [player.advantages[0], player.disadvantages[0]];
        const cardCount = player.virusField.length + 2; //2 playerField cards
        
        const styles = { gridArea: position, backgroundColor: this.props.isOver ? "#0f0": null };
        const classes = `player ${position}${this.props.roomState.currentTurn === player.sessionId ? " current-turn" : ""}`;

        const connectDropTarget = this.props.connectDropTarget;

        return connectDropTarget(
            <div className={classes} style={styles}>
                <div className="player-cards card-container" style={{ gridArea: "player-cards", "--card-count": cardCount }}>
                    <div className="player-char" style={{}}>
                        {playerField.map((card, index) => <Card key={card.cardId} card={card} />)}
                    </div>
                    <div className="virus-infection" style={{}}>
                        {player.virusField.map((card, index) => <Card key={card.cardId} card={card} />)}
                    </div>
                </div>
                <div className="player-name" style={{ gridArea: "player-name" }}>{player.name}</div>
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(
    DropTarget(Constants.DndItemTypes.CARD, dndTarget, dndCollect)(Player)
)