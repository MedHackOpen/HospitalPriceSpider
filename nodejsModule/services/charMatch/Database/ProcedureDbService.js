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

        const { institution, institutionDt, filePath, name, procedureName, procedureKey, priceValue, priceKey, index, totalItems } = args

        let item = {
            created: 'no-data',
            institutionDt,
            filePath,
            name,
            procedureKey: procedureKey[0],
            priceKey: priceKey[0],
            index,
            totalItems,
        }

        if(procedureName[0] && priceValue[0] && institutionDt.rId && institutionDt.hospitalName){

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

            let created = await newProcedure.save()

            created = created.dataValues

            item = {
                created,
                institutionDt,
                filePath,
                name,
                procedureKey: procedureKey[0],
                priceKey: priceKey[0],
                index,
                totalItems
            }

            return item
        } else return item // just without the newly added procedure


    } catch (e) {

        return e
    }
}

module.exports = {
    createNewProcedureEntry
}