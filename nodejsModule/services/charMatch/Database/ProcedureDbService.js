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

function createNewProcedureEntry(args){

    try {

        /*console.log(args)
        console.log('//////////////////////////////args////////////////////////////')*/

        /*Procedures.create({
            uuid: uuid() ,
            rId: newProcedure.rId ,
            itemName: newProcedure.itemName,
            hospitalId: newProcedure.hospitalId ,
            price: newProcedure.price,
            hospitalName: newProcedure.hospitalName,
            avgPrice: newProcedure.avgPrice, //@TODO maybe
            medianPrice: newProcedure.medianPrice,
            // sampleSize: ,
            outpatientAvgPrice: newProcedure.outpatientAvgPrice,
            inpatientAvgPrice:  newProcedure.inpatientAvgPrice,
            revenue_code: newProcedure.revenue_code,
            //latestPriceDate: ,
            //firstPriceDate: ,
            //changeSinceLastUpdate: ,
            //description: ,
            //relatedItemsFromOthers: ,
            //relatedItemsFromThisLocation: ,
            //itemsRequiredForThis:  ,
            //keywords: ,
            country: newProcedure.country ,
            currency: newProcedure.currency
        })*/
    } catch (e) {

        return e
    }
}

module.exports = {
    createNewProcedureEntry
}