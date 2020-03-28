import React from 'react';

class Card extends React.Component {

    onClick(window) {
        console.log(window);
    }

    render() {

        return (
            <div className="card">
                <div className="card-name">Table</div>
            </div>
        );
    }
}

export default Card;