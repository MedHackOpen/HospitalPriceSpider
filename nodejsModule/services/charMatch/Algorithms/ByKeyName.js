'use strict'

// eg DRG Description || Description for procedure name
// and Avg Chg || Charge || Price || CHARGE AMOUNT for the price value.

// Remember to always set the name of the algorithm or
// this file because files processed by this file(algorithm)
// will be moved to a folder named after this file

const name = 'ByKeyName'
let price = null
let procedureName = null
let item = {
    price,
    procedureName
}

//ifPrice
function ifPrice(key, value) {
    console.log(`${key}: ${value}`)
}

//ifProcedure
function ifProcedure(key, value) {
    console.log(`${key}: ${value}`)
}


//result item
function ifItem(args) {

    const { data, filePath } = args

    /*console.log('************************************************')
    console.log(data)
    console.log('************************************************')*/


    for (let [key, value] of Object.entries(data)) {
        console.log('************************************************')
        procedureName = ifProcedure(key, value)
        price = ifPrice(key, value)
        console.log('************************************************')
        //console.log(`${key}: ${value}`)


        // match field here and post to db, move file somewhere else
        // TODO!!!
    }

    let refined = {}

    refined = {
        procedure: 'procedureName',
        price: 'Testing price'
    }

    return refined

}

module.exports = {
    ifItem
}