import React from 'react';
import Card from './Card';

class Table extends React.Component {

    onClick(window) {
        console.log(window);
    }

    render() {

        return (
            <div className="card deck">
                <div className="deck-title">deck</div>
            </div>
        );
    }
}

export default Table;