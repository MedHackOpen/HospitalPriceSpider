import React from 'react'
import ReactJson from 'react-json-view'

const JsonItem = ({jsonItem}) => {
    return (
        <div className="col-sm">
            Json item here too
            <ReactJson src={jsonItem} />
        </div>
    );
};

export default JsonItem;