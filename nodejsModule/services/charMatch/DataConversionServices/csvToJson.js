// converts csv files dat to json data object and returns
// depends on https://www.npmjs.com/package/csvtojson for added flexibility
'use strict'
const _ = require('lodash')
const csvToJsonV2=require("csvtojson/v2");


/**
 *
 * @param filePath
 * @param removedHeaderRows
 *
 * Return Json raw data give filePath
 */
async function getJsonFromCsv(filePath, removedHeaderRows = 0 ){
    try {
        let data = await csvToJsonV2().fromFile(filePath)

        // if header is greater than default , remove the headers and return
        if (removedHeaderRows >= 1) {


            // Remove header rows from data object
            data = _.filter(data, (item, index) => {

                if ( index >= removedHeaderRows ){

                    return data
                }


            })

            return data
        }

        else
            return data



    } catch (e) {

        return e

    }
}



module.exports =  {
    getJsonFromCsv,
};