'use strict'
// Creates and queries procedure related data/item(s)

const uuid = require('uuid/v4')

// Database/Models
const sequelize = require('../../../database/models').sequelize
const Procedures = require('../../../database/models').Procedures

sequelize.sync()
    .then((database) => {
        //console.log(database)
    })


async function createNewProcedureEntry(args){

    try {

        const { institution, institutionDt, procedureName, procedureKey, priceValue, priceKey, index, totalItems } = args

        let created = {
            created: 'no-data',
            institutionDt,
            index,
            totalItems,
        }

        if(procedureName[0] && priceValue[0] && institution){

            let newProcedure = Procedures.build({
                uuid: uuid() ,
                rId: institutionDt.rId ,
                itemName: procedureName[0],
                hospitalId: institutionDt.rId ,
                price: priceValue[0],
                hospitalName: institutionDt.hospitalName,
                avgPrice: priceValue[0], //@TODO maybe
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

            created = await newProcedure.save()

            created = created.dataValues

            created = {
                created,
                institutionDt,
                index,
                totalItems
            }

            return created
        } else return created // just without the newly added procedure


    } catch (e) {

        return e
    }
}

module.exports = {
    createNewProcedureEntry
}