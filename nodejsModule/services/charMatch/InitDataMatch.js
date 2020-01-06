'use strict'
// initiates the character / data match processes
const fs = require('fs')
const path = require('path')
const util = require('util')

// services
const SortFile = require('./SortFile')
const csvToJson = require('./DataConversionServices/csvToJson')
const jsonRowDataProcessor = require('./Processors/index')
const LogDbBridge = require('./Bridge/LogDbBridge')

const folderToSort = path.join(__dirname, '../../../rawCSVs/filesToSort')

// get csv file to process from 'unsortedFolder'
async function getCsvFile() {

    const readdir = util.promisify(fs.readdir)

    try {

        let files = await readdir(folderToSort)

        if (!files) return 'Bad directory maybe'

        let csvFile = files.filter(file => file.includes('.csv'))

        if (!csvFile) return 'No csv file in this directory!!'


         // this is the file name
        return csvFile[0] // get the first file in the array and return




    } catch (e) {


        return e
    }
}

// Initiate character match processes
async function initCharacterDataMatch() {

    let fileName = await getCsvFile() // file name

    let data = {
        message: 'no csv file in folder',
        from: path.join(__dirname, '../../../rawCSVs/filesToSort')
    }

    if(!fileName){
        return data
    }

    if (fileName) {

        let from = path.join(__dirname, '../../../rawCSVs/filesToSort', fileName)
        let to = path.join(__dirname, '../../../rawCSVs/FilesBeingSorted', fileName)


        // move one file before calling read data on it
        // then repeat

        await SortFile.moveFileTo(from, to)

        // convert data from new file
        // and when done move it to another folder
        // move grab another file and repeat

        //call move again and maybe convert data here

        // get data from the just moved file
        const csvData = await csvToJson.getJsonFromCsv(to)

        if(csvData) {

            // send csv data to another listener as well as file name/path
            // for moving when algo is done processing

            /*(() => {

            })()*/
            data = {
                csvJson: csvData,
                filePath: to
            }

            jsonRowDataProcessor.initListenToConversion(data)
            console.log(csvData)
            console.log('============================================================')
            console.log('=============== WAITING OF DATABASE RESPONSE ============')
            console.log('============================================================')

            // check against final log in Logs table
            // compare recorded + missed === csvData.length to call another csv file
            setInterval(async () => {

                // pass file with ex
                let log = await LogDbBridge.logRecordByFileName(fileName)

                if(!log) return

                console.log(log)
                console.log(new Date())

                if(log) {

                    /*let fileExt = /.csv/i
                    fileName = path.parse(to).base
                    fileName = fileName.replace(fileExt, '') // remove .ext from name*/

                    let totalItemsInLog = 0
                    let totalItemz = 0
                    let filename = ''
                    let itemsMatched = 0
                    let itemsNotMatched = 0
                    let algorithmFile = ''
                    let thisHospitalName = null
                    let hospitalrId = null


                    log.map((logDt) => {
                        const { recorded, missed, filename: fileNm, processedBy, hospitalName, rId, totalItems } = logDt
                        totalItemsInLog = Math.floor(recorded + missed)
                        filename = `${fileNm}.csv`
                        itemsMatched = recorded
                        itemsNotMatched = missed
                        algorithmFile = processedBy
                        thisHospitalName = hospitalName
                        hospitalrId = rId
                        totalItemz = totalItems

                    })


                    /*console.log('============================================================')
                    console.log('=============== WAITING OF DATABASE RESPONSE ============')
                    console.log(log)
                    console.log(totalItemsInLog)
                    console.log(totalItemz)
                    console.log(filename)
                    console.log(fileName)
                    console.log('fileName from folder above')
                    console.log(itemsMatched)
                    console.log(itemsNotMatched)
                    console.log(algorithmFile)
                    console.log(thisHospitalName)
                    console.log(hospitalrId)
                    console.log('=============== LOG DATA ============')
                    console.log('============================================================')*/

                    if (csvData.length === totalItemz){

                        //await initCharacterDataMatch()
                    }
                }
            }, 1500)

            //await initCharacterDataMatch() // repeat again

            data = {
                totalItems: csvData.length,
                forFile: fileName
            }

            //return csvData
            return data
        }


    }




}

module.exports = {
    initCharacterDataMatch
}