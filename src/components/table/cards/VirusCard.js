import React from 'react';
import { connect } from 'react-redux';
import Card from './../../shared/Card';

class VirusCard extends React.Component {
    render() {
        return <Card card={this.props.card} index={this.props.index} isDestroyed={this.props.isDestroyed} isFaded={this.props.isFaded} dragOverCard={this.props.dragOverCard} draggingCard={this.props.draggingCard}>
            {this.renderTokens()}
            {this.renderIndicators()}
            {this.renderVirusPhaseAction()}
        </Card>;
    }

    renderIndicators() {
        if (this.props.indicator === "contain") {
            return <div className="overlay overlay-indicator indicator-contain" style={{ backgroundImage: "url(/images/card-v-contain.png)" }}></div>
        } else if (this.props.indicator === "reduce-tokens") {
            return <div className="overlay overlay-indicator indicator-reduce-tokens" style={{ backgroundImage: "url(/images/card-v-reduct-tokens.png)" }}></div>
        }
        return null;
    }

    renderTokens() {
        let tokens = [];
        for (let i = 0; i < this.props.card.tokens; i++) {
            tokens.push(<div key={`token-${i}`} className="token" style={{ backgroundImage: "url(/images/logo.png)" }}></div>)
        }
        return <div className="card-tokens">
            {tokens}
        </div>
    }

    renderVirusPhaseAction() {
        if (this.props.virusPhaseAction) {
        return <div className="virus-phase-action">{this.props.virusPhaseAction}</div>
        }
        return null;
    }
    //
}

export default connect(null, null)(VirusCard);