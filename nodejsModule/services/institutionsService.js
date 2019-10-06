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

/**
 * Gets institutions data and returns that, only the required
 * fields/values for processing files
 */
async function getInstitutionsReqData () {
    try {
        const institutions = await Institutions.findAll({

            attributes: [
                'uuid', 'rId', 'hospitalName', 'city', 'country', 'mainHospitalName','numberBeds',
                'streetAddress','numberLocation','itemColumnName', 'avgPriceColumnName',
                'priceSampleSizeColumnName','outPatientPriceColumnName', 'inpatientPriceColumnName', 'extraColumnName',
                'categoryColumnName','removedHeaderRowsForCSV','savedRepoTableName', 'notes', 'hasSpreadSheet'
            ],
            //attributes: [ 'uuid', 'rId', 'itemColumnName', 'avgPriceColumnName', 'savedRepoTableName', 'hasSpreadSheet' ],

            where: {
                hasSpreadSheet: 1,
                //-*s01211avedRepoTableName: !_.isNil(), // any below has a value means this must have a value too
                //itemColumnName: !_.isEmpty(),
                //avgPriceColumnName: !_.isEmpty(),  // Not empty
            },

            raw: true
        })


        //console.log(institutions)


        return institutions

    } catch (e) {

        return e
    }
}

/**
 * @param savedRepoTableName
 */
async function getHospitalData(savedRepoTableName) {
    try {
        const institution = await Institutions.findOne({

            where: { savedRepoTableName: savedRepoTableName },

            attributes: [
                'uuid', 'rId', 'hospitalName', 'city', 'country', 'mainHospitalName','numberBeds',
                'streetAddress','numberLocation','itemColumnName', 'avgPriceColumnName', 'medianPricingColumnName',
                'priceSampleSizeColumnName','outPatientPriceColumnName', 'inpatientPriceColumnName', 'extraColumnName',
                'categoryColumnName','removedHeaderRowsForCSV','savedRepoTableName', 'notes'
            ],

            raw: true
        })

        return institution

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


async function institutionsRID() {

    try {
        const rId =  await Institutions.findAll({}).map(item => item.get('rId'))

        return rId
    } catch (e) {

        return e
    }
}

//------END OF---------Getting Data from the database (institution) and processing it---------------------

getInstitutionsReqData()

module.exports = {
    getInstitutions,
    getInstitutionsReqData,
    getHospitalData,
    getInstitution,
    institutionFileNames,
    institutionFileName,
    institutionsRID
}