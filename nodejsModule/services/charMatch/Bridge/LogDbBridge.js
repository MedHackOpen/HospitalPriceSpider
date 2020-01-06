'use strict'
const path = require('path')

// Receives the final procedure object after passing through the final stage
// of if data should go to the procedure table or not if not complete (missing
// required values) like rId, price and procedure name among others

// we can choose what to finally log, move the csv file to another folder
// and repeat the process again with another file

const LogDbService = require('../Database/LogDbService')
const SortFile = require('../SortFile')

let missed = 0 // count missed
let recorded = 0 // count recorded items matched by this name file name eg const name = 'ByKeyName' in Algorithms folder
async function sendNewLogsData(args) {

    const { created,  institutionDt, filePath, name: processedBy, procedureKey, priceKey, index, totalItems } = args
    const { price, rId, hospitalName, itemName } = created // count created items (recorded)


    missed = created === 'no-data' ? ++missed : missed

    recorded = price && itemName ? ++recorded : recorded

    let finished = Math.floor(recorded + missed) === totalItems ? 'FINISHED' : 'NOT-FINISHED'

    let fileName = path.parse(filePath).base

    let from = path.join(__dirname, '../../../../rawCSVs/FilesBeingSorted', fileName)

    console.log('****************PROCESSING!!!! DATA START*****************')
    console.log(`RECORDED : ${recorded}`)
    console.log(`MISSED : ${missed}`)
    console.log(`file path : ${filePath}`)
    console.log(index)
    console.log(totalItems)
    console.log(args)
    console.log('****************PROCESSING !!!! DATA END*************************')


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

        let to = ''

        if (recorded > 0 && institutionDt ) to = path.join(__dirname, '../../../../rawCSVs/ProcessedFiles',processedBy, fileName)
        if (!institutionDt && created === 'no-data') to = path.join(__dirname, '../../../../rawCSVs/ProcessedFiles/',processedBy, 'MissingInstitutionData', fileName)
        if (recorded === 0) to = path.join(__dirname, '../../../../rawCSVs/NonProcessedFiles', fileName)
        // TODO refine files without institution data

        console.log('********************* DONE FOR FILE !!!*********************')
        console.log(filename)
        console.log('********************* CALLING AGAIN FOR ANOTHER FILE !!!*********************')
        console.log('********************* DONE FOR FILE !!!*********************')
        console.log(filename)
        console.log(from)
        console.log(to)
        console.log(log)
        console.log('********************* CALLING AGAIN FOR ANOTHER FILE !!!*********************')
        console.log('||||||||||||DONE ALL TOTAL ITEMS ||||||||||||||')
        // move file here instead


        return await SortFile.moveFileTo(from, to)


        //return log
    }

    if (institutionDt && created === 'no-data'){

        let to = path.join(__dirname, '../../../../rawCSVs/NonProcessedFiles', fileName)

        return await SortFile.moveFileTo(from, to)
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