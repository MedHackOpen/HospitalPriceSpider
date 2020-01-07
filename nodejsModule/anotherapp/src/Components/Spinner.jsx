import React from 'react'
import _ from 'lodash'

const Spinner = ({currentFile, totalItems }) => {


    if (!_.isEmpty(currentFile) && totalItems !== 0){
        console.log(currentFile)
        return (
            <div className="m-3 p-3 text-center">
                <h5>Processing data..............</h5>
                <small> <strong>For file</strong> : <strong>{currentFile}</strong></small>
                <hr/>
                <small> <strong>Total Items</strong> : <strong>{totalItems}</strong></small>
                <div className="fa-5x">
                    <i className="fa fa-gear fa-spin">

                    </i>
                </div>
            </div>
        );
    } else return null

};

export default Spinner;