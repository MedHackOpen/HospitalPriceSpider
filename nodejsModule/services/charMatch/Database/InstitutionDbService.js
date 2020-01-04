'use strict'
// Creates and queries Institutions related data/item(s)
const Institutions = require('../../../database/models').Institutions

function getInstitutions(){
    try {

        return Institutions.findAll({
            attributes: [
                'uuid', 'rId', 'hospitalName', 'city', 'country', 'mainHospitalName','numberBeds',
                'streetAddress','numberLocation','itemColumnName', 'avgPriceColumnName',
                'priceSampleSizeColumnName','outPatientPriceColumnName', 'inpatientPriceColumnName', 'extraColumnName',
                'categoryColumnName','removedHeaderRowsForCSV','savedRepoTableName', 'notes', 'hasSpreadSheet'
            ],
            raw: true
        })

    } catch (e) {

        return e
    }
}

module.exports = {
    getInstitutions
}