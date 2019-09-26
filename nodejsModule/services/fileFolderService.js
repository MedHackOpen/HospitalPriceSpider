const axios = require('axios')
const moveFile = require('move-file');

/**
 * @param from
 * @param to
 * given full path names with filename plus extensions, from the folder to move in relation
 * to the folder where this function is called from, to the destination folder
 * from = where file is located
 * to = destination folder and filename to move to
 * example from = '../../rawCSVs/source/file_to_move.txt'
 *         to = '../../rawCSVs/destination/file_to_move.txt'
 *
 *         and make sure the file exists in the source (from) folder
 */
async function stageFilesForProcessing(from, to) {

    try {

        const files = await moveFile(from, to)

        if (files) {

            console.log('file has been moved', files)
            return files
        }
        //console.log('file has been moved')

    } catch (e) {
        //console.log(e)
        return e
    }

}

/**
 * @param endPointUrl
 *
 * Given an endpoint, should return an
 * object list of available files to process
 * in ./rawCSVs folder
 */
async function filesReadyToProcess(endPointUrl) {
    try {
        const request = await axios.get(endPointUrl)
        console.log('Requestinging files_____|||__|||||_____',request.data)
        return request.data

    } catch (e) {

        return e
    }
}

module.exports = {
    stageFilesForProcessing,
    filesReadyToProcess,
}