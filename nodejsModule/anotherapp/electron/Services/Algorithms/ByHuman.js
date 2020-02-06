'use strict'

// Uses institutions data d in the institutions table
// to determine what item is procedure and its corresponding
// price in a give json item from a given csv file

//ifPrice

// convert price to a double if not
function ifPrice(key, value, procedureKey, priceKey) {
    let price = priceKey.trim() ===  key.trim() ? value : null // else no price to match

    return price
}

//ifProcedure
function ifProcedure(key, value, procedureKey, priceKey) {

    let procedure = key.trim() === procedureKey.trim() // key === procedureKey
        ? value
        : null

    return procedure
}

function ifItem(args) {

    const {
        type,
        procedureKey,
        priceKey,
        item: data
    } = args

    let item = {}
    let price = []
    let procedure = []
    let itemData = {}

    for (let [key, value] of Object.entries(data)) {

        // item contains a key and a value
        // check if key === procedureKey for procedure value
        // check if key === priceKey for price value
        itemData = {
            key,
            value
        }

        if (ifProcedure(key, value, procedureKey, priceKey)) procedure.push(itemData)
        if (ifPrice(key, value, procedureKey, priceKey)) price.push(itemData)

    }


    // match field here and return the values with key for confirmation



    item = {
        procedure,
        price,
    }



    return JSON.stringify(item)

}

//result item
function matchValues(args) {

    const {
        type,
        procedureKey,
        priceKey,
        item
    } = args

    if( type === 'by-institutions-data' ) {

        let refined = ifItem(args)
        // return five objects for now
        let dt = {
            refined, // data processed by this algo
            // name of this file or module that's re
        }

        // pass your data to post to database and sort the file (cvs) that owns this data
        //return Report.rawReportData(dt)

        return dt
    }



}

module.exports = {
    matchValues
}