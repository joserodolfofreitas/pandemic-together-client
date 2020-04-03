import React from 'react';
import * as Constants from './common/constants';
import { connect } from 'react-redux';
import { selectCard, deselectCard, resetSelectedCards } from './redux/actions';
import { DragSource } from 'react-dnd';

function mapStateToProps(state) {
    return {
        room: state.room,
        roomState: state.roomState,
        currentPlayerTurn: state.currentPlayerTurn,
        selectedCards: state.selectedCards,
        updatesOnRoomState: state.updatesOnRoomState,
    }
}

const dndSource = {
    beginDrag(props) {
        return { id: props.card.item }
    },
    canDrag(props) {
        return props.isHandCard;
    }
}

function dndCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
        };
    }

    onClick_selectCard() {

        if (this.props.roomState.currentTurn !== this.props.room.sessionId) {
            return;
        }

        // ugly logic that will disappear once we have dnd. Player must interact first with handCard (and only one hand card)
        if (this.props.selectedCards.length === 0) {
            if (this.props.isHandCard) {
                this.setState({ selected: true });
                this.props.selectCard(this.props.card);
            }
        } else {
            if (this.props.isHandCard) {
                if (this.state.selected) {
                    this.setState({ selected: false });
                    this.props.deselectCard(this.props.card);
                }
            } else {
                if (this.props.card.type === Constants.CARD_TYPE_VIRUS) {
                    const message = {
                        type: Constants.GM_PLAY_CARD,
                        player: this.props.room.sessionId,
                        cardPlayed: this.props.selectedCards[0],
                        onPlayer: this.props.card.cardHolder,
                        onCardIds: [this.props.card.cardId]
                    };

                    this.props.room.send(message);
                    this.props.resetSelectedCards();
                    console.log(message);
                }
            }
        }

    }

    render() {
        const card = this.props.card;

        const isHandCard = this.props.isHandCard;
        const isVirusCard = card.type === Constants.CARD_TYPE_VIRUS;

        const classNames = `card card-${card.elementId.toLowerCase()}${isHandCard === true ? " hand-card" : ""}${isVirusCard ? " virus-card" : ""}${this.state.selected === true ? " selected-card" : ""}${card.contained === true ? " virus-contained" : ""}`;
        const style = { float: "left", backgroundImage: `url("/images/card-${card.elementId.toLowerCase()}.png")` };

        const connectDragSource = this.props.connectDragSource;

        return connectDragSource(<div className={classNames} style={style} onClick={() => this.onClick_selectCard()}>
            {isVirusCard ? this.renderVirusTokens(card) : null}
        </div>);
    }

    renderVirusTokens(card) {
        let tokens = [];
        for (let i = 0; i < card.tokens; i++) {
            tokens.push(<div class="token" style={{ backgroundImage: "url(/images/logo.png)" }}></div>)
        }
        return <div class="card-tokens">
            {tokens}
        </div>
    }

}

export default connect(mapStateToProps, { selectCard, deselectCard, resetSelectedCards })(
    DragSource(Constants.DndItemTypes.CARD, dndSource, dndCollect)(Card)
);