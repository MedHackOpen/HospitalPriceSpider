'use strict'
const path = require('path')

// Receives the final procedure object after passing through the final stage
// of if data should go to the procedure table or not if not complete (missing
// required values) like rId, price and procedure name among others

// we can choose what to finally log, move the csv file to another folder
// and repeat the process again with another file

const LogDbService = require('../Database/LogDbService')

let missed = 0 // count missed
let recorded = 0 // count recorded items matched by this name file name eg const name = 'ByKeyName' in Algorithms folder
async function sendNewLogsData(args) {

    const { created,  institutionDt, filePath, name: processedBy, procedureKey, priceKey, index, totalItems } = args
    const { price, rId, hospitalName, itemName } = created // count created items (recorded)


    missed = created === 'no-data' ? ++missed : missed

    recorded = price && itemName ? ++recorded : recorded

    let finished = Math.floor(recorded + missed) === totalItems ? 'FINISHED' : 'NOT-FINISHED'


    if (finished === 'FINISHED') {

        let fileExt = /.csv/i
        let filename = path.parse(filePath).base
        filename = filename.replace(fileExt, '') // remove .ext from name


        let logItem = {
            recorded,
            missed,
            //finished,
            filename,
            processedBy,
            procedureKey,
            priceKey,
            hospitalName, // NOTE: if not defined no institution data found but algorithm matched the data
            rId, // if not defined no institution data found but algorithm matched the data
            totalItems,
            comment: 'No comment for now!!'
        }


        const log = await LogDbService.createNewLogEntry(logItem)
        console.log('********************* DONE FOR FILE !!!*********************')
        console.log(filename)
        console.log('********************* CALLING AGAIN FOR ANOTHER FILE !!!*********************')
        console.log('********************* DONE FOR FILE !!!*********************')
        console.log(filename)
        console.log(log)
        console.log('********************* CALLING AGAIN FOR ANOTHER FILE !!!*********************')
        console.log('||||||||||||DONE ALL TOTAL ITEMS ||||||||||||||')
        /*from = path.join(__dirname, '../../../rawCSVs/FilesBeingSorted', fileName)
        if (itemsMatched > 0 && thisHospitalName !== null && hospitalrId !== null) to = path.join(__dirname, '../../../rawCSVs/ProcessedFiles/', algorithmFile, '/', fileName)
        if (thisHospitalName === null || hospitalrId === null) to = path.join(__dirname, '../../../rawCSVs/ProcessedFiles/', algorithmFile, '/MissingInstitutionData/', fileName)
        if (itemsMatched === 0) to = path.join(__dirname, '../../../rawCSVs/NonProcessedFiles/', fileName)

        await SortFile.moveFileTo(from, to)*/
        // move file now

        return log
    }


}

async function logRecordByFileName(flNm){

    let fileExt = /.csv/i
    let fileName = flNm.replace(fileExt, '') // remove .ext from name

    const logs = LogDbService.getLogs()

    return await logs.filter(log => log.filename === fileName)

}

module.exports = {
    sendNewLogsData,
    logRecordByFileName
}