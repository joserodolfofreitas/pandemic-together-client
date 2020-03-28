import React from 'react';
import LoginBox from './LoginBox';
import { connect } from 'react-redux';
import { setRoom } from './ReduxStore/actions'

function mapStateToProps(state) {
    return {
        player : state.player,
        room : state.room,
    }
}

class Table extends React.Component {

    onClick() {
        let room = this.props.room;
        console.log(room);
        room.send({card:"R1", onPlayer:"C1"});
    }

    render() {
        let room = this.props.room;
        var content;
        if (room == null) {
            content = <LoginBox/>;
        }
        else {
            content =
                <div className="table">
                    <button className="table title" onClick={() => this.onClick()} >Table</button>
                </div>;
        }

        return (content);
    }
}

export default connect(mapStateToProps, {setRoom}) (Table)
