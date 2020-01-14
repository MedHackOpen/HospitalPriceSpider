'use strict'
// Creates and queries Institutions related data/item(s)
const sequelize = require('../../../../database/models').sequelize
const Institutions = require('../../../../database/models').Institutions

sequelize.sync()
    .then((database) => {
        //console.log(database)
    })

async function getInstitutions(){
    try {

        return await Institutions.findAll({
            attributes: [
                'uuid', 'rId', 'hospitalName', 'city', 'country', 'mainHospitalName','numberBeds',
                'streetAddress','numberLocation','itemColumnName', 'avgPriceColumnName',
                'priceSampleSizeColumnName','outPatientPriceColumnName', 'inpatientPriceColumnName', 'extraColumnName',
                'categoryColumnName','removedHeaderRowsForCSV','savedRepoTableName', 'notes', 'hasSpreadSheet'
            ],
            raw: true
        })

    } catch (e) {

        console.log(e)

        return e
    }
}

module.exports = {
    getInstitutions
}