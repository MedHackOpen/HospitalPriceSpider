const _ = require('lodash')
// Database
const Institutions = require('../database/models').Institutions


async function institutionFileName() {
    // Get file names from institutions Table
    const fileNames =  await Institutions.findAll({}).map(item => item.get('savedRepoTableName'))

    //console.log(fileNames)
    return fileNames

}


module.exports = {
    institutionFileName,
}