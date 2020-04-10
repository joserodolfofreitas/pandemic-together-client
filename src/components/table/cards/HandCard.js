import React from 'react';
import { connect } from 'react-redux';
import Card from './../../shared/Card';

class HandCard extends React.Component {

    render() {
        return <Card card={this.props.card} index={this.props.index} isHandCard={true} isDestroyed={this.props.isDestroyed} isPlayable={this.props.isPlayable} isFaded={this.props.isFaded} isHidden={this.props.isHidden}>
        </Card>;
    }

}

export default connect(null, null)(HandCard);