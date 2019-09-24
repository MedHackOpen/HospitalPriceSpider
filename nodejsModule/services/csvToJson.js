const fs = require('fs')
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
 * Return Json raw data give filePath
 */
async function getJsonFromCsv(filePath){
    try {

        const data = await csvToJsonV2().fromFile(filePath)

        //console.log('Raw data', data)

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

module.exports =  {
    getJsonFromCsv,
    getCsvFiles,
};