'use strict'

// Algorithm services
//const ByKeyName = require('../Algorithms/ByKeyName')

// Example data match also
// see what it returns and takes as an argument
function exampleDataMatch(args) {

    const { data, filePath } = args

    let refinedItem = {}
    let price = {}
    let procedureName = ''

    console.log('************************************************')
    console.log(data)
    console.log('************************************************')


    for (let [key, value] of Object.entries(data)) {
        console.log(`${key}: ${value}`)

        // match field here and post to db, move file somewhere else
        // TODO!!!
    }




    return args
}


// pass your function here that should return
// a complete matched data object with procedure name and the price(s)
// for each procedure, also include to each algorithm a name for it
// and the folder name the files processed by the algorithm should
// go to..return this data object
// TODO find a better way still to do what this file does
function matchItemData(args) {

    let dt = {}

    args.map((item, index) => {

        dt = {
            data: item, // give key
            index,
        }

    })

    return dt

}
// Return single item
function breakJsonItem(args) { //args == json data


    let jsonData = args.filter(dt => dt)

    let dt = {}

    jsonData.map((item, index) => {

        dt = {
            data: item, // give key
            index,
            totalItems: jsonData.leading
        }

    })



    return dt

}

module.exports = {
    breakJsonItem
}