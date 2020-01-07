import React from 'react'
import ReactJson from 'react-json-view'

const RefinedItem = ({refinedItem}) => {
    return (
        <div className="col-sm">
            Refined item
            <ReactJson src={refinedItem} />
        </div>
    );
};

export default RefinedItem;