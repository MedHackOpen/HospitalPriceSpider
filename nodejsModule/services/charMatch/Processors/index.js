'use strict'
const _ = require('lodash')

// Example data match also
// see what it returns and takes as an argument
function exampleDataMatch(args) {

    const { data, filePath, folder } = args // this is what you always get form the args object pass

    const testData = data.map((dt, index) => {



        let refinedItem = {}
        let price = {}
        let procedureName = ''
        return Object.entries(dt).forEach(([key,value])=>{
            //console.log(`${key}:${value}`)
            if (key === 'Price') price = value

            if (key === 'Description') procedureName = value

            refinedItem = {
                price: price,
                procedureName: procedureName
            }

            /*console.log('!!!!!!!!!!!!!!!!!!!!!!DATA||||||||||||||||||||||')
            console.log('!!!!!!!!!!!!!!!!!!!!!!DATA||||||||||||||||||||||')
            console.log('!!!!!!!!!!!!!!!!!!!!!!DATA||||||||||||||||||||||')
            console.log('!!!!!!!!!!!!!!!!!!!!!!DATA||||||||||||||||||||||')
            console.log(refinedItem)
            console.log('************************************************')
            console.log('************************************************')
            console.log('************************************************')*/

            return refinedItem
        })

    })

    console.log('!!!!!!!!!!!!!!!!!!!!!!DATA||||||||||||||||||||||')
    console.log('!!!!!!!!!!!!!!!!!!!!!!DATA||||||||||||||||||||||')
    console.log('!!!!!!!!!!!!!!!!!!!!!!DATA||||||||||||||||||||||')
    console.log('!!!!!!!!!!!!!!!!!!!!!!DATA||||||||||||||||||||||')
    console.log(testData)
    console.log('************************************************')
    console.log('************************************************')
    console.log('************************************************')

    return args
}


// pass your function here that should return
// a complete matched data object with procedure name and the price(s)
// for each procedure, also include to each algorithm a name for it
// and the folder name the files processed by the algorithm should
// go to..return this data object
// TODO find a better way still to do what this file does
function matchItemData(args) {

    const { data, filePath, folder } = args

    //let dt = {}


    const testData = data.map((dt) => {
        // pass each object for processing
         return Object.entries(dt)
    })

    console.log('!!!!!!!!!!!!!!!!!!!!!!DATA||||||||||||||||||||||')
    console.log('!!!!!!!!!!!!!!!!!!!!!!DATA||||||||||||||||||||||')
    console.log('!!!!!!!!!!!!!!!!!!!!!!DATA||||||||||||||||||||||')
    console.log('!!!!!!!!!!!!!!!!!!!!!!DATA||||||||||||||||||||||')
    console.log(testData)
    console.log('************************************************')
    console.log('************************************************')
    console.log('************************************************')

    return data




}
// get data and send to listener
function initListenToConversion(args) {


    const {csvJson, filePath  } = args

    let jsonData = csvJson.filter(dt => dt)

    /*console.log('!!!!!!!!!!!!!!!!!!!!!!DATA||||||||||||||||||||||')
    console.log('!!!!!!!!!!!!!!!!!!!!!!DATA||||||||||||||||||||||')
    console.log('!!!!!!!!!!!!!!!!!!!!!!DATA||||||||||||||||||||||')
    console.log('!!!!!!!!!!!!!!!!!!!!!!DATA||||||||||||||||||||||')
    console.log(jsonData)
    console.log('************************************************')
    console.log('************************************************')
    console.log('************************************************')*/

    let data = {
        data: jsonData,
        filePath: filePath,
        folder: 'FOLDER_NAME' // foldername to move file to
    }

    const dt = matchItemData(data)


    return dt
}

module.exports = {
    initListenToConversion
}