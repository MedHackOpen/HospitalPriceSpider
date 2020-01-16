'use strict'
const path = require('path')

// Receives the final procedure object after passing through the final stage
// of if data should go to the procedure table or not if not complete (missing
// required values) like rId, price and procedure name among others

// we can choose what to finally log, move the csv file to another folder
// and repeat the process again with another file

const LogDbService = require('../Database/LogDbService')

//const SortFile = require('../SortFile')
//const item = Start.breakJsonItem(items)
let count = 0
async function sendNewLogsData(args) {

    let items = {}
    let logItem = {}

    args.map((item, index) => {

        const {
            created,
            institutionDt,
            fileName,
            procedureKey,
            priceKey,
            name,
            totalItems,
            missed,
            recorded,
            countItems,
            items: itmz
        } = item

        // created state === 'no-data means the record never got to the
        // procedures table because of missing rId and hospitalName
        const { state, price, rId: hrID, hospitalName: hstName, itemName } = created

        count = ++count
        items = itmz
        let rId = created.rId ? hrID : null
        let hospitalName = created.hospitalName ? hstName : null

        logItem =  {
            recorded,
            missed,
            //finished,
            filename: fileName,
            processedBy: name,
            procedureKey,
            priceKey,
            hospitalName, // NOTE: if not defined no institution data found but algorithm matched the data
            rId, // if not defined no institution data found but algorithm matched the data
            totalItems,
            countItems,
            comment: 'No comment for now!!'
        }


    })

    //let finished = count === items.length ? 'FINISHED' : 'NOT-FINISHED'

    console.log(logItem)
    console.log(count)
    console.log('++++++countItems++++++')

    // TODO priceKey and procedureKey are empty if the last item was not matched
    // rectify that

    const log = await LogDbService.createNewLogEntry(logItem)

    return { log, message: '---------LOG RETURNED-----------------'}

    /*if ( finished === 'FINISHED' ) {

        console.log(logItem)
        console.log(count)
        console.log(finished)
        console.log('++++++countItems++++++')

        const log = await LogDbService.createNewLogEntry(logItem)

        return { log, message: '---------LOG RETURNED-----------------'}

        // reset count if set
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