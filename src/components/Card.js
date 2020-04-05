import React from 'react';
import * as Constants from './common/constants';
import { connect } from 'react-redux';
import { applyResourceOnVirus } from './redux/actions';
import { DragSource, DropTarget } from 'react-dnd';

function mapStateToProps(state) {
    return {
        room: state.room,
        roomState: state.roomState,
        currentPlayerTurn: state.currentPlayerTurn,
        selectedCards: state.selectedCards,
        updatesOnRoomState: state.updatesOnRoomState,
    }
}

const dndDragSource = {
    beginDrag(props) {
        return { id: props.card.cardId, card: props.card }
    },
    canDrag(props) {
        return props.isHandCard && props.isPlayable;
    }
}

const dndDropTarget = {
    drop(props, monitor, component) {
       props.applyResourceOnVirus(monitor.getItem().card, props.card)
    },
    canDrop(props, monitor) {
        return props.card.type === Constants.CARD_TYPE_VIRUS;
    }
}

function dndDropCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isDragOver: monitor.isOver()
    }
}


function dndDragCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
    }
}

class Card extends React.Component {
    

    render() {
        const card = this.props.card;

        const isHandCard = this.props.isHandCard;
        const isVirusCard = card.type === Constants.CARD_TYPE_VIRUS;

        const style = { float: "left", backgroundImage: `url("/images/card-${card.elementId.toLowerCase()}.png")` };

        const connectDragSource = this.props.connectDragSource;
        const connectDropTarget = this.props.connectDropTarget;

        return connectDropTarget(connectDragSource(<div className={this.getCardClasses(card)} style={style}>
            {isVirusCard ? this.renderVirusTokens(card) : null}
        </div>));
    }

    getCardClasses(card){
        const isHandCard = this.props.isHandCard;
        const isVirusCard = card.type === Constants.CARD_TYPE_VIRUS;
        const isPlayable = isHandCard && this.props.isPlayable;

        let classNames = [`card card-${card.elementId.toLowerCase()}`];

        if(isHandCard){
            classNames.push('hand-card');
            if(isPlayable){classNames.push('playable');}
        }
        if(isVirusCard){
            classNames.push('virus-card');
            if(card.contained){classNames.push('contained');}
        }

        return classNames.join(' ');
    }

    renderVirusTokens(card) {
        let tokens = [];
        for (let i = 0; i < card.tokens; i++) {
            tokens.push(<div className="token" style={{ backgroundImage: "url(/images/logo.png)" }}></div>)
        }
        return <div class="card-tokens">
            {tokens}
        </div>
    }

}

export default connect(mapStateToProps, { applyResourceOnVirus })(
    DragSource(Constants.DndItemTypes.CARD, dndDragSource, dndDragCollect)(
        DropTarget(Constants.DndItemTypes.CARD, dndDropTarget, dndDropCollect)(Card)
    )
);