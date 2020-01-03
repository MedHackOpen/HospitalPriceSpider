'use strict'
// initiates the character / data match processes
const fs = require('fs')
const path = require('path')
const util = require('util')

// services
const SortFile = require('./SortFile')
const csvToJson = require('./DataConversionServices/csvToJson')
const jsonRowDataProcessor = require('./Processors/index')

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

    if (fileName) {

        const from = path.join(__dirname, '../../../rawCSVs/filesToSort', fileName)
        const to = path.join(__dirname, '../../../rawCSVs/SortedFiles/testing', fileName)

        /*(async () => {



        })();*/

        // move one file before calling read data on it
        // then repeat

        const movedFile = await SortFile.moveFileTo(from, to)


        const { type } = movedFile

        if ( type === 'file-moved')

            // convert data from new file
            // and when done move it to another folder
            // move grab another file and repeat

            //call move again and maybe convert data here

            data =  {
                message: 'moved-file',
                from: from,
                to: to
            }

            //await initCharacterDataMatch() // repeat again

            //return data

        data =  {
            message: 'moved-file',
            from: from,
            to: to
        }

        // get data from the just moved file
        const csvData = await csvToJson.getJsonFromCsv(to)

        // send csv data to another listener as well as file name/path
        // for moving when algo is done processing
        data = {
            csvJson: csvData,
            filePath: to
        }

        const processor = jsonRowDataProcessor.initListenToConversion(data)



        /*console.log('!!!!!!!!!!!!!!!!!!!!!!DATA||||||||||||||||||||||')
        console.log('!!!!!!!!!!!!!!!!!!!!!!DATA||||||||||||||||||||||')
        console.log('!!!!!!!!!!!!!!!!!!!!!!DATA||||||||||||||||||||||')
        console.log('!!!!!!!!!!!!!!!!!!!!!!DATA||||||||||||||||||||||')
        console.log(processor)
        console.log('!!!!!!!!!!!!!!!!!!!!!!DATA||||||||||||||||||||||')
        console.log('!!!!!!!!!!!!!!!!!!!!!!DATA||||||||||||||||||||||')
        console.log('!!!!!!!!!!!!!!!!!!!!!!DATA||||||||||||||||||||||')*/
        // after processor// move file to algo folder

        await initCharacterDataMatch() // repeat again

        //return data
        return processor


    }




}

module.exports = {
    initCharacterDataMatch
}