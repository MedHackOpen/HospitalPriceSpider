'use strict'
const path = require('path')

// Receives the final procedure object after passing through the final stage
// of if data should go to the procedure table or not if not complete (missing
// required values) like rId, price and procedure name among others

// we can choose what to finally log, move the csv file to another folder
// and repeat the process again with another file

const LogDbService = require('../Database/LogDbService')

//const SortFile = require('../SortFile')
async function sendNewLogsData(args) {

    // reset count if set

    const {
        created,
        institutionDt,
        fileName,
        name: processedBy,
        procedureKey,
        priceKey,
        index,
        totalItems,
        missed,
        recorded,
        countItems,
        items // all items object in json object
    } = args

    const { price, rId: hrID, hospitalName: hstName, itemName } = created // count created items (recorded)

    let rId = created.rId ? hrID : null
    let hospitalName = created.hospitalName ? hstName : null


    //let finished = Math.floor(recorded + missed) === totalItems ? 'FINISHED' : 'NOT-FINISHED'
    //let finished = Math.floor(index + 1 ) === totalItems ? 'FINISHED' : 'NOT-FINISHED'
    let finished = countItems === totalItems ? 'FINISHED' : 'NOT-FINISHED'

    //let from = path.join(__dirname, '../../../../rawCSVs/FilesBeingSorted', fileName)

    if (finished === 'FINISHED') {

        //let fileExt = /.csv/i
        //let filename = path.parse(filePath).base
        //filename = filename.replace(fileExt, '') // remove .ext from name


        let logItem = {
            recorded,
            missed,
            //finished,
            filename: fileName,
            processedBy,
            procedureKey,
            priceKey,
            hospitalName, // NOTE: if not defined no institution data found but algorithm matched the data
            rId, // if not defined no institution data found but algorithm matched the data
            totalItems,
            countItems,
            comment: 'No comment for now!!'
        }

        const log = await LogDbService.createNewLogEntry(logItem)

        return { log, message: '---------LOG RETURNED-----------------'}

        //let to = ''

        /*if (recorded > 0 && institutionDt ) to = path.join(__dirname, '../../../../rawCSVs/ProcessedFiles',processedBy, fileName)
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


        //return await SortFile.moveFileTo(from, to)


        //return log*/
    }

    /*if (institutionDt && created === 'no-data'){

        let to = path.join(__dirname, '../../../../rawCSVs/NonProcessedFiles', fileName)

        //return await SortFile.moveFileTo(from, to)
    }*/


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