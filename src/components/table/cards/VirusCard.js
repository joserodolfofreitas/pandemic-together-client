import React from 'react';
import { connect } from 'react-redux';
import Card from './../../shared/Card';

class VirusCard extends React.Component {
    render() {
        console.log("VirusCard render",this.props.card.cardId, this.props.card);
        return <Card card={this.props.card} index={this.props.index} isDestroyed={this.props.isDestroyed} dragOverCard={this.props.dragOverCard} draggingCard={this.props.draggingCard}>
            {this.renderVirusTokens()}
            {this.renderVirusIndicators()}
        </Card>;
    }

    renderVirusIndicators() {
        if (this.props.indicator === "contain") {
            return <div className="overlay overlay-indicator indicator-contain" style={{ backgroundImage: "url(/images/card-v-contain.png)" }}></div>
        } else if (this.props.indicator === "reduce-tokens") {
            return <div className="overlay overlay-indicator indicator-reduce-tokens" style={{ backgroundImage: "url(/images/card-v-reduct-tokens.png)" }}></div>
        }
        return null;
    }

    renderVirusTokens() {
        let tokens = [];
        for (let i = 0; i < this.props.card.tokens; i++) {
            tokens.push(<div key={`token-${i}`} className="token" style={{ backgroundImage: "url(/images/logo.png)" }}></div>)
        }
        return <div className="card-tokens">
            {tokens}
        </div>
    }
}

export default connect(null, null)(VirusCard);