import React from 'react'
import _ from 'lodash'

const Algorithms = ({names, name: theProcessor}) => {

    console.log(names)
    if (!_.isEmpty(names)){
        return (
            <div className="container text-center">
                <h6>Current Processors by name...</h6>
                <ul className="list-group">
                    {names.map((name) =>
                        <li key={name.id} className={name.name === theProcessor ? "list-group-item active" : "list-group-item" }>
                            {name.name}
                            <i
                                className={
                                    name.name === theProcessor ? "ml-2 fa fa-spinner fa-spin" : "" // set class dynamically
                                }>
                            </i>
                        </li>
                    )}
                </ul>
            </div>
        );
    } else return null
};

export default Algorithms;