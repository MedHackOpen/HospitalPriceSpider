import React from 'react'
import ReactJson from 'react-json-view'
import _ from 'lodash'

const ProgressMessage = ({message}) => {

    if (!_.isEmpty(message)){
        return (
            <div>
                <h6>---Progress message/item-----</h6>
                <ReactJson src={message} />
            </div>
        );
    } else  return (
        <div>
            No message to show........
        </div>
    )

};

export default ProgressMessage;