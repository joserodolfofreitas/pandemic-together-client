import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        roomState : state.roomState,
        updatesOnRoomState : state.updatesOnRoomState,
    }
}

class Deck extends React.Component {
    render() {
        var content;

        if (this.props.roomState.deck.length > 0) {
            content =
                <div className="deck">
                    <div className="card" style={{backgroundImage: "url(/images/card-deck.png)"}}/>
                </div>
        } else {
            content = <div></div>
        }
        return (
            content
        );
    }
}

export default connect(mapStateToProps, null) (Deck)