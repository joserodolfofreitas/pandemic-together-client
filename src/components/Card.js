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
        var classNames = `card card-${card.elementId.toLowerCase()} ${handCard === true ? "hand-card" : ""} ${card.type == Constants.CARD_TYPE_VIRUS ? "" : "virus-card"}`;

        return (
            <div className={classNames} style={{float:"left"}}></div>
        );
    }
}

export default Card;