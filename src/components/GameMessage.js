import React from 'react';

class GameMessage extends React.Component {
    render() {
        const messageView = this.props.messageView;
        return <div className={messageView.classes}>
                    <div>
                        <img alt={messageView.text} src={messageView.imgSrc} />
                        <span>{messageView.text}</span>
                    </div>
                </div>
    }
}

export default GameMessage