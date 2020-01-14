'use strict'
// Creates and queries procedure related data/item(s)

const uuid = require('uuid/v4')

// Database/Models
//const sequelize = require('../../../../database/models').sequelize
const Procedures = require('../../../../database/models').Procedures

/*sequelize.sync()
    .then((database) => {
        //console.log(database)
    })*/


async function createNewProcedureEntry(args){

    try {

        const { institution, institutionDt, fileName, name, procedureName, procedureKey, priceValue, priceKey, index, totalItems, missed, recorded, countItems, items } = args


        let item = {
            created: 'no-data',
            institutionDt,
            fileName,
            name,
            procedureKey,
            priceKey,
            index,
            totalItems,
            missed,
            recorded,
            countItems,
            items
        }

        if(procedureName && priceValue && institutionDt.rId && institutionDt.hospitalName){

            let newProcedure = Procedures.build({
                uuid: uuid() ,
                rId: institutionDt.rId ,
                itemName: procedureName,
                hospitalId: institutionDt.rId ,
                price: priceValue,
                hospitalName: institutionDt.hospitalName,
                avgPrice: priceValue, //@TODO maybe
                //medianPrice: institutionDt.medianPrice,
                // sampleSize: ,
                //outpatientAvgPrice: institutionDt.outpatientAvgPrice,
                //inpatientAvgPrice:  institutionDt.inpatientAvgPrice,
                //revenue_code: institutionDt.revenue_code,
                //latestPriceDate: ,
                //firstPriceDate: ,
                //changeSinceLastUpdate: ,
                //description: ,
                //relatedItemsFromOthers: ,
                //relatedItemsFromThisLocation: ,
                //itemsRequiredForThis:  ,
                //keywords: ,
                country: institutionDt.country ,
                //currency: institutionDt.currency TODO set by country
            })

            let created = await newProcedure.save()

            created = created.dataValues

            item = {
                created,
                institutionDt,
                fileName,
                name,
                procedureKey,
                priceKey,
                index,
                totalItems,
                missed,
                recorded,
                countItems,
                items
            }

            return item
        } else return item // just without the newly added procedure*/


    } catch (e) {

        return e
    }
}

module.exports = {
    createNewProcedureEntry
}