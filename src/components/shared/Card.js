import React from 'react';
import * as Constants from './../../common/constants';
import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';
import { applyResourceOnVirus, setDraggingCard, setDragOverCard } from './../../redux/actions';

const dndDragSource = {
    beginDrag(props) {
        props.setDraggingCard(props.card);
        return { id: props.card.cardId, card: props.card }
    },
    canDrag(props) {
        return props.isHandCard && props.isPlayable;
    },
    endDrag(props) {
        props.setDraggingCard(null);
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
        isDragOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    }
}


function dndDragCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
    }
}

class Card extends React.Component {
    componentDidUpdate(){
        if (this.props.canDrop) {
            if (this.props.isDragOver) {
                if (!this.props.dragOverCard || this.props.dragOverCard.cardId !== this.props.card.cardId) {
                    this.props.setDragOverCard(this.props.card);
                }
            } else {
                if (this.props.dragOverCard && this.props.dragOverCard.cardId === this.props.card.cardId) {
                    this.props.setDragOverCard(null);
                }
            }
        }
    }

    render() {
        const connectDragSource = this.props.connectDragSource;
        const connectDropTarget = this.props.connectDropTarget;
        return connectDropTarget(connectDragSource(<div className={this.getCardClasses()} style={{ "--card-index": this.props.index, backgroundImage: `url("/images/card-${this.props.card.elementId.toLowerCase()}.png")` }}>
            {this.props.children}
        </div>));
    }

    getCardClasses() {
        const card = this.props.card;
        const isVirusCard = card.type === Constants.CARD_TYPE_VIRUS;
        const isPlayable = this.props.isHandCard && this.props.isPlayable;

        let classNames = [`card card-${card.elementId.toLowerCase()}`];

        if (this.props.isHandCard) {
            classNames.push('hand-card');
            if (isPlayable) { classNames.push('playable'); }
        }
        if (isVirusCard) {
            classNames.push('virus-card');
            //console.log("render virus",card.cardId, card.contained)
            if (card.contained) { classNames.push('contained'); }
        }
        if (this.props.isFaded) {
            classNames.push('faded');
        }
        if (this.props.isHidden) {
            classNames.push('hidden');
        }
        if (this.props.isDestroyed) {
            classNames.push('destroyed');
        }

        return classNames.join(' ');
    }
}

export default connect(
    // (state) => {
    //     return { updatesOnRoomState: state.updatesOnRoomState } // every state update, to assure card state changes are displayed
    // }, 
    null,
    { applyResourceOnVirus, setDraggingCard, setDragOverCard })
    (
    DragSource(Constants.DndItemTypes.CARD, dndDragSource, dndDragCollect)(
        DropTarget(Constants.DndItemTypes.CARD, dndDropTarget, dndDropCollect)(Card)
    )
);