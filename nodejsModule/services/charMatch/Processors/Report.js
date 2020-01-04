'use strict'
// This file receives data after it has been passed through
// functions(modules) that determine which is the price, or
// procedure key and it's corresponding value
// see ../Algorithms/ByKeyName for an example of how to
// get, process and pass the processed data into this module

function rawReportData(args) {

    const {
        data,
        refinedData,
        filePath,
        name,
    } = args

    console.log('|||||||||||||||||||---REFINED ---ITEM!!!!!!!!!!!|||||||||||||||||||')
    //console.log(`${procedure} : ${price}`)
    console.log(args)
    console.log('|||||||||||||||||||---REFINED ---ITEM!!!!!!!!!!!!|||||||||||||||||||')

}


module.exports = {
    rawReportData
}