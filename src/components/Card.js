import React from 'react';
import * as Constants from './common/constants';
import { connect } from 'react-redux';
import { applyResourceOnVirus, setDraggingCard, setDragOverCard } from './redux/actions';
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
        const card = this.props.card;

        const style = { "--card-index": this.props.index, backgroundImage: `url("/images/card-${card.elementId.toLowerCase()}.png")` };

        const connectDragSource = this.props.connectDragSource;
        const connectDropTarget = this.props.connectDropTarget;

        return connectDropTarget(connectDragSource(<div className={this.getCardClasses(card)} style={style}>
            {this.renderVirusTokens(card)}
            {this.renderVirusIndicators(card)}
        </div>));
    }

    getCardClasses(card) {
        const isVirusCard = card.type === Constants.CARD_TYPE_VIRUS;
        const isPlayable = this.props.isHandCard && this.props.isPlayable;

        let classNames = [`card card-${card.elementId.toLowerCase()}`];

        if (this.props.isHandCard) {
            classNames.push('hand-card');
            if (isPlayable) { classNames.push('playable'); }
        }
        if (isVirusCard) {
            classNames.push('virus-card');
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

    renderVirusIndicators(card) {
        if (card.type !== Constants.CARD_TYPE_VIRUS || !this.props.indicator) {
            return null;
        }
        if (this.props.indicator === "contain") {
            return <div className="overlay overlay-indicator indicator-contain" style={{ backgroundImage: "url(/images/card-v-contain.png)" }}></div>
        } else if (this.props.indicator === "reduce-tokens") {
            return <div className="overlay overlay-indicator indicator-reduce-tokens" style={{ backgroundImage: "url(/images/card-v-reduct-tokens.png)" }}></div>
        }
        return null;
    }

    renderVirusTokens(card) {
        if (card.type !== Constants.CARD_TYPE_VIRUS) {
            return null;
        }

        let tokens = [];
        for (let i = 0; i < card.tokens; i++) {
            tokens.push(<div className="token" style={{ backgroundImage: "url(/images/logo.png)" }}></div>)
        }
        return <div className="card-tokens">
            {tokens}
        </div>
    }

}

export default connect(mapStateToProps, { applyResourceOnVirus, setDraggingCard, setDragOverCard })(
    DragSource(Constants.DndItemTypes.CARD, dndDragSource, dndDragCollect)(
        DropTarget(Constants.DndItemTypes.CARD, dndDropTarget, dndDropCollect)(Card)
    )
);