'use strict'

// Bridge services
const ReportDbBridge = require('../Bridge/ReportDbBridge')
// This file receives data after it has been passed through
// functions(modules) that determine which is the price, or
// procedure key and it's corresponding value
// see ../Algorithms/ByKeyName for an example of how to
// get, process and pass the processed data into this module

function rawReportData(args) {

    const {
        data, // raw data of json item
        refinedData, // procedure and it's price data
        filePath, // path of the processed file
        name, // name of the algorithm module/file
        index, // index of the item in array
        totalItems, // the total number of items after the csv is converted to json
    } = args


    const dt = ReportDbBridge.reportItem(args)

}


module.exports = {
    rawReportData
}