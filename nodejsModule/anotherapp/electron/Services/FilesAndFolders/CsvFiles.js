// returns file (s) give a folder path
const path = require('path')
const fs = require('fs')
const util = require('util')
const fsExtra = require('fs-extra')

const folderToSort = path.join(__dirname, '../../../../../rawCSVs/filesToSort')
// check available csv files and return
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

//Initialize file processing by file name
async function prepareFileForProcessing(fileName) {

    try {

        let from = path.join(__dirname, '../../../../../rawCSVs/filesToSort', fileName)
        let to = path.join(__dirname, '../../../../../rawCSVs/FilesBeingSorted', fileName)

        const moved = await fsExtra.move(from, to)

        const dt = {
            event: 'success',
            from,
            to
        }

        return dt

    } catch (e) {

        return e
    }


}
module.exports = {
    getCsvFile,
    prepareFileForProcessing,
}