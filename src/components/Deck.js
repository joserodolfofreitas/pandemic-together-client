import React from 'react';
import Card from './Card';

class Table extends React.Component {

    onClick(window) {
        console.log(window);
    }

    render() {

        return (
            <div className="table">
                <div className="table title">Table</div>
            </div>
        );
    }
}

export default Table;