// contains functions to sort files into respective folders when run through
// the pattern algorithms

const fs = require('fs')
const moveFile = require('move-file')
const _ = require('lodash')

// check if a file (csv) exists before calling moveFileTo(from, to)
function checkIfFileExists(from){

    let args = {} // the object to return
    try {


        if (fs.existsSync(from)) {

            args = {
                type: 'file-available',
                path: from,
            }

            return args

        }

    } catch (e) {

        return e
    }

}

async function moveFileTo(from, to) {

    let data = {

    } // the object to return
    try {

        const isFile = checkIfFileExists(from)

        if (isFile.type === 'file-available'){

            const file = await moveFile(from, to)
            data = {
                type: 'file-moved',
                from,
                to,
            }

            return data
        }

        if (!isFile.type) {
            data = {
                type: 'no-csv-file',
                from,
                to
            }
            return data // returns null
        }

    } catch (e) {

        return e
    }


}

module.exports = {
    moveFileTo
}