const GoogleSpreadsheet = require('google-spreadsheet')
const { promisify } = require('util')
const _ = require('lodash')
/**
 * Should return the data in the rows
 * if the spreadsheet id is legit
 */
async function getSpreadSheetData(spreadSheetId) {
    let credentials = require('../client_secret')// credentials file

    //console.log('Creds === ', credentials)

    const doc = new GoogleSpreadsheet(spreadSheetId) //file id

    await promisify(doc.useServiceAccountAuth)(credentials)
    const info = await promisify(doc.getInfo)()
    const sheet = info.worksheets[0]
    /**
     * sheet object contains
     * .url
     * .id
     * .title
     * .rowCount
     * .colCount
     * ._links
     * .resize()
     * .setTitle()
     * .clear()
     * .getRows()
     * .getCells()
     * .addRow()
     * .bulkUpdateCells()
     * .del()
     * .setHeaders()
     * for the functions call by reference
     */

    const rows = await promisify(sheet.getRows)({
        offset: 1,
        //orderby: rid// order hospital by rid
        //offset: 5,
        //limit: 2,

    })


    //console.log(rows)
    //console.log('Rows.....', JSON.stringify(rows) ) // data
    //console.log(`Title: ${sheet.title}, Rows: ${sheet.rowCount}`)
    //rows.forEach(row => {
        //printStudent(row)
    //})

    return JSON.stringify(rows)
}

/**
 * converts rows data to json data
 */
async function spreadSheetDataToJson(spreadSheetId){

}

module.exports = {
    getSpreadSheetData
}