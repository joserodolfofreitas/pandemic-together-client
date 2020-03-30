import React from 'react';
import Card from './Card';

class Table extends React.Component {

    onClick(window) {
        console.log(window);
    }

    render() {

        return (
            <div className="deck">
                <div className="card" style={{backgroundImage: "url(/images/card-deck.png)"}}>
                    
                </div>
            </div>
        ); //<div className="deck-title">deck</div>
    }
}

export default Table;