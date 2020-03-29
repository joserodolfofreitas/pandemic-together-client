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
        let card = this.props.card;
        let handCard = this.props.handCard;
        var classNames = "card";
        if (handCard != undefined && handCard === true) {
            classNames+= " hand-card";
        }
        if (card.type == Constants.CARD_TYPE_VIRUS) {
            classNames+= " virus-card";
        }
        return (
                <div className={classNames} style={{float:"left"}}>
                    {card.elementId}
                </div>
        );
    }
}

export default Card;