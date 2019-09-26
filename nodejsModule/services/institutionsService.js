const _ = require('lodash')
// Database
const Institutions = require('../database/models').Institutions

//------START OF---------Getting Data from the database (institution) and processing it---------------------
async function getInstitutions(){
    try {

        let institutions = {}

        institutions = await Institutions.findAll({}).map(item => item.get({ plain: true }))

        if (!_.isEmpty(institutions)) {

            return institutions
        }

        if (_.isEmpty(institutions)){

            institutions = {
                data: 'No data...'
            }

            return institutions
        }

    } catch (e) {

        return e
    }
}

async function getInstitution(rId) {
    try {
        const institutions = await getInstitutions()
        const institution = await institutions.find(i => i.rId === rId);

        if (institution) {
            return institution
        }


    } catch (e) {
        return e
    }

}


async function institutionFileNames() {
    try {
        // Get file names from institutions Table
        const fileNames =  await Institutions.findAll({}).map(item => item.get('savedRepoTableName'))
        if (fileNames) {
            return fileNames
        }

    } catch (e) {

        return e
    }


}

async function institutionFileName(rId) {

    try {
        const institutions = await getInstitutions()
        const institution = await institutions.find(i => i.rId === rId)

        if (institution) {
            return institution.savedRepoTableName
        }

    } catch (e) {
        return e
    }
}

async function institutionsRID() {

    try {
        const rId =  await Institutions.findAll({}).map(item => item.get('rId'))

        return rId
    } catch (e) {

        return e
    }
}

//------END OF---------Getting Data from the database (institution) and processing it---------------------


module.exports = {
    getInstitutions,
    getInstitution,
    institutionFileNames,
    institutionFileName,
    institutionsRID
}