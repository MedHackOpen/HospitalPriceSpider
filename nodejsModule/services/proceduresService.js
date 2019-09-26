const uuid = require('uuid/v4')

// Database
const Procedures = require('../database/models').Procedures

async function createProcedureItem(institution, dt) {

    await Procedures.create({
        uuid: uuid() ,
        rId: institution.rId ,
        itemName: dt[institution.itemColumnName],
        hospitalId: institution.rId ,
        price: dt[institution.avgPriceColumnName],
        hospitalName: institution.hospitalName,
        avgPrice: dt[institution.avgPriceColumnName], //@TODO maybe
        medianPrice: dt[institution.medianPricingColumnName],
        // sampleSize: ,
        outpatientAvgPrice: dt[institution.outPatientPriceColumnName],
        inpatientAvgPrice:  dt[institution.inpatientPriceColumnName],
        revenue_code: dt[institution.categoryColumnName],
        //latestPriceDate: ,
        //firstPriceDate: ,
        //changeSinceLastUpdate: ,
        //description: ,
        //relatedItemsFromOthers: ,
        //relatedItemsFromThisLocation: ,
        //itemsRequiredForThis:  ,
        //keywords: ,
        country: institution.country ,
        //currency: ,
    }).then(async (item) => {
        console.log('Created Item ============================+++', item)
        const data = await item.dataValues
        return data
    })
}


module.exports = {
    createProcedureItem
}