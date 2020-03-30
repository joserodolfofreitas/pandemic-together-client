import React from 'react';
import * as Constants from './common/constants';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
        };
    }

    onClick(window) {
        console.log(window);
    }

    render() {
        const card = this.props.card;
        const handCard = this.props.handCard;
        const classNames = `card card-${card.elementId.toLowerCase()}${handCard === true ? " hand-card" : ""}${card.type == Constants.CARD_TYPE_VIRUS ? "" : " virus-card"}`;
        const style={float:"left", backgroundImage: `url("/images/card-${card.elementId.toLowerCase()}.png")`};
        return (
            <div className={classNames} style={style}></div>
        );
    }
}

export default Card;