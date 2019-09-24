const moveFile = require('move-file');
/**
 * compares files in database and files in our csv folder
 * moves those that are in the database (savedRepoTableName) into a folder
 * ready for processing
 */
async function stageFilesForProcessing(from, to, fileName) {

    try {

        await moveFile('../../rawCSVs/source/googlespreadsheetdoc.txt', '../../rawCSVs/testingFolder/googlespreadsheetdoc.txt')
        console.log('file has been moved')

    } catch (e) {

        return e
    }

}

stageFilesForProcessing()