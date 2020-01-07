import React from 'react'
import _ from 'lodash'

const Log = ({log}) => {
    const {missed, recorded, totalItems, processedBy, filename } = log

    if(_.isEmpty(log)) return null

    /*let dt = {
        type: 'first-file-in-folder',
        data: {}
    }

    // send get another file from here
    // do better in one central place
    ipcRenderer.send('get-csv', dt)*/
    return (
        <div className="m-3 p-3 shadow-lg bg-info rounded">
           <h3>------ LOG DATA ------ </h3>
            <hr/>
            <li className=" m-2 p-2">
                <ul>FileName : {filename}</ul>
                <ul>Processed by : {processedBy}</ul>
                <ul>Total Items in file : {totalItems}</ul>
                <ul>Recorded Items : {recorded}</ul>
                <ul>Missed Items: {missed}</ul>
            </li>
        </div>
    );
};

export default Log;