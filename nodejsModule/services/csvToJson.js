'use strict'

const fs = require('fs')
const _ = require('lodash')
const csvToJsonV2=require("csvtojson/v2");


function getCsvFiles(csvFolder) {

    try {
        fs.readdir(csvFolder,  (err, files) => {
            if (files) {
                return files
            }
            if (err) {
                return err
            }
        })
    } catch (e) {
        return e
    }

}

/**
 *
 * @param filePath
 * @param removedHeaderRows
 *
 * Return Json raw data give filePath
 */
async function getJsonFromCsv(filePath, removedHeaderRows ){
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

            //console.log(data)

            return data
        }

        else
            return data



    } catch (e) {

        /*error = {
            e,
            filePath
        }*/
        //console.log('Error Loading file', e)
        return e

    }
}

async function csvDataItems(filePath, removedHeaderRows) {
    try {

        const data = await getJsonFromCsv(filePath, removedHeaderRows)


        return data

    } catch (e) {

        return e
    }


}


module.exports =  {
    getJsonFromCsv,
    getCsvFiles,
    csvDataItems,
};