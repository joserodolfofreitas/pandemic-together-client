import React from 'react';
import Card from './Card';

class Table extends React.Component {

    onClick(window) {
        console.log(window);
    }

    render() {

        return (
            <div className="deck">
                <div className="card">
                    <div className="deck-title">deck</div>
                </div>
            </div>
        );
    }
}

export default Table;