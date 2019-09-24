// Database
const Institutions = require('../database/models').Institutions

//------START OF---------Getting Data from the database (institution) and processing it---------------------
async function getInstitutions(){
    try {

        const institutions = await Institutions.findAll({}).map(item => item.get({ plain: true }))

        return institutions
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

        //console.log(fileNames)
        return fileNames
    } catch (e) {

        return e
    }


}

//------END OF---------Getting Data from the database (institution) and processing it---------------------


module.exports = {
    getInstitutions,
    getInstitution,
    institutionFileNames
}