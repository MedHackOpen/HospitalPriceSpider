'use strict'

const path = require('path')
const fs = require('fs')
const EventEmitter = require('events')
const uuid = require('uuid/v4')
const _ = require('lodash')


// Event object
const emitter = new EventEmitter()

// Database/Models
const Procedures = require('../database/models').Procedures

// Services
const institutionsService = require('./institutionsService')
const csvToJson = require('./csvToJson')
const fileFolderService = require('./fileFolderService')
const priceProcItem = require('./charMatch/priceProcItem')

async function test() {

    const fileName = 'hospital_CPMC.csv'
    const csvFilePath = path.join(__dirname, '../../rawCSVs', fileName)
    //console.log('*****csvFilePath****',csvFilePath)
    const data = await csvToJson.getJsonFromCsv(csvFilePath)

    /*const fileName = req.params.id
    const csvFilePath = path.join(__dirname, '../rawCSVs', fileName)

    try {

        const data =  await getFileData(csvFilePath)
        res.send(data)
    } catch (e) {
        res.send(e)
    }*/

    //console.log(data)


}
//test()

/**
 * returns an institution obj with the required data
 * to process the csv files
 */
async function getInstitutionData() {

    try {
        const institutionsData = await institutionsService.getInstitutionsReqData()

        //console.log(institutionsData)
        if (institutionsData) {

            return institutionsData
        }



    } catch (e) {
        return e
    }


}

async function getFileData(savedRepoTableName) {
}

/**
 * @param fileName
 * Given a file name eg 'hospital_CPMC.csv', this function
 * loads that files data and iterates over it and returns
 * each item
 */
async function getDataItemPerCsvFile(fileName) {

    //const fileName = 'hospital_CPMC.csv'
    const csvFilePath = path.join(__dirname, '../../rawCSVs', fileName)
    //console.log('*****csvFilePath****',csvFilePath)
    try {
        const data = await csvToJson.getJsonFromCsv(csvFilePath)

        if (data) {

            return data

        }

    } catch (e) {

        return e
    }

}


/**
 * @param fileName
 * Given a file name eg 'hospital_CPMC.csv', in each request
 * this function loads the given file data and passes it onto
 * csvDataToDb for processing
 */
async function getCsvFileItems(fileName) {


    // Remove the .csv from fileName before requesting for the institution (database)
    // remove .csv from filename (string)
    let pattern = /.csv/gi

    let savedRepoTableName = fileName
    savedRepoTableName = savedRepoTableName.replace(pattern, '') // remove .csv

    // get institution data per req per file
    const institution = await institutionsService.getHospitalData(savedRepoTableName)


    // define path for the csv file
    const csvFilePath = path.join(__dirname, '../../rawCSVs', fileName)

    //console.log('***fileName *** ==', fileName)

    try {

        // pass here removed headers is any

        const csvItems = await csvToJson.csvDataItems(csvFilePath, institution.removedHeaderRowsForCSV)

        let data = {}


        _.map(csvItems, async (item) => { // send per item for db processing

            data = {
                item,
                fileName,
            }



            const database = await csvDataToDb(data, institution)

            return database
        })


        /*

        if (csvItems){
            // @TODO maybe pass more args here

            // Break items array into smaller arrays with 30000 items each

            const brokenItems = _.chunk(csvItems, 30000)


            //return await csvDataToDb(csvItems, fileName)
            await csvDataToDb(brokenItems, fileName)
                .then(() => {


                    return brokenItems
                })
        }*/

    } catch (e) {

        return e
    }

}

/**
 * Listen to new item being created
 */

emitter.on('newProcedureItem', async (eventObject) => {


    const item = await Procedures.create({
        uuid: eventObject.item.uuid ,
        rId: eventObject.item.rId ,
        itemName: eventObject.item.itemName,
        hospitalId: eventObject.item.hospitalId ,
        price: eventObject.item.price,
        hospitalName: eventObject.item.hospitalName,
        avgPrice: eventObject.item.avgPrice, //@TODO maybe
        medianPrice: eventObject.item.medianPrice,
        // sampleSize: ,
        outpatientAvgPrice: eventObject.item.outpatientAvgPrice,
        inpatientAvgPrice:  eventObject.item.inpatientAvgPrice,
        revenue_code: eventObject.item.revenue_code,
        //latestPriceDate: ,
        //firstPriceDate: ,
        //changeSinceLastUpdate: ,
        //description: ,
        //relatedItemsFromOthers: ,
        //relatedItemsFromThisLocation: ,
        //itemsRequiredForThis:  ,
        //keywords: ,
        country: eventObject.item.country ,
        currency: eventObject.item.currency,
    })

    console.log('.........**********......Saved....**********...........UUID..', item.uuid)


    //console.log('new Procedure item created', eventObject.item)
})

/**
 * @param newProcedure
 * This function given an procedure object  creates/populates
 * the procedures/services table with all that information
 */
async function createProcedureItem(newProcedure) {

    console.log('newProcedure...Buiild', newProcedure.itemName)
    console.log('**************newProcedure************END******************************')

    //const savedProcedure = procedureInstance.save()

    //return savedProcedure
    const item = await Procedures.create({
        uuid: newProcedure.uuid ,
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
    })

    console.log('.........**********......Saved....**********...........UUID..',)

    console.log('savedProcedure...',await item.dataValues.itemName)
    console.log('ITEM++++++++++++++ITEM+++++++++++++++++++DATABASE++++++++++++++++++++ITEM+++++++++++++')

    return await item
}


/**
 * using data from each file in rawCSVs folder
 * then take it's  id and use that to get the required
 * matching fields from our institutions table, then use
 * that to create procedure items
 */

async function csvDataToDb(data, institution) {

    const { item : dt } = data


    if (dt) {


        try {

            if ( institution.itemColumnName && institution.savedRepoTableName && institution.avgPriceColumnName ) {

                // validate required fields before proceeding ie itemName, hospitalId, price and currency
                // @TODO not sure what to make of currency currently
                // below validation in that order
                //console.log(institution)
                //console.log(data.item)
                let newProcedure = {
                    uuid: uuid() ,
                    rId: institution.rId ,
                    hospitalId: institution.rId,
                    hospitalName: institution.hospitalName,
                    // sampleSize: ,
                    //latestPriceDate: ,
                    //firstPriceDate: ,
                    //changeSinceLastUpdate: ,
                    //description: ,
                    //relatedItemsFromOthers: ,
                    //relatedItemsFromThisLocation: ,
                    //itemsRequiredForThis:  ,
                    //keywords: ,
                    country: institution.country ,
                    currency: 'USD',
                }


                if ( dt[institution.itemColumnName] && institution.rId && dt[institution.avgPriceColumnName]  ){

                    let price = {
                        value:  dt[institution.avgPriceColumnName],
                        otherValues: {},
                    }

                    // create a procedure item to put to database
                    newProcedure = {
                        itemName: dt[institution.itemColumnName],
                        price,
                        avgPrice: dt[institution.avgPriceColumnName], //@TODO maybe
                        medianPrice: dt[institution.medianPricingColumnName],
                        outpatientAvgPrice: dt[institution.outPatientPriceColumnName],
                        inpatientAvgPrice:  dt[institution.inpatientPriceColumnName],
                        revenue_code: dt[institution.categoryColumnName],
                    }

                    await createProcedureItem(newProcedure)
                }

                // If we miss the data with the values from database, generate our own values with values from csv files
                // if no price or procedure name, search for one in every csv item
                if (institution.rId && !dt[institution.itemColumnName] || !dt[institution.avgPriceColumnName] ) {

                    /*const item = _.map(dt, (item, index) => {
                        // From here probably some assumptions
                        // phrases with the word hospital doesn't rep a procedure name
                        // any number starting with $ or is equal to or greater than 5 will be treated a price number
                        // all numbers that pass the above will be included in the price item array @TODO, do better HERE!!

                        // Pattern for procedure phrase/name
                        let procedurePattern = /[A-Z]/gi

                        // Pattern for price and other price like fields
                        let pricePattern = /.csv/gi

                        let price = 10

                        let procedure = item.match(procedurePattern)

                        //console.log('*****TEST DATA ****', item)
                        //console.log('*****VALUE****',procedure)
                        //console.log(newProcedure,'||||||||||||||||||||||||')
                        data = {
                            procedure,
                            price,
                        }

                        return data
                    })

                    console.log('*****VALUE****',item)*/
                    const data = await priceProcItem.csvGenericItem(dt)

                    //console.log('|||||||VALUE||||||||||',data)


                }
            }

            if (institution.savedRepoTableName && !institution.itemColumnName && !institution.avgPriceColumnName ) {

                console.log('Some fields need human data', institution.savedRepoTableName )
            }


            //return newProcedure

        } catch (e) {

            return e
        }

    }

}


/**
 * returns available csv files in
 * the csvFolder
 */
async function csvFileNames() {

    const csvFolder = path.join(__dirname, '../../rawCSVs')

    try {
        await fs.readdir(csvFolder, async (err, files) => {
            //console.log(files)
            if (files) {

                //return files

                //const filesList = await files.filter((e) => {
                //return path.extname(e).toLowerCase() === '.csv'
                //});

                //console.log(files)
                return await files

            }

            if (err) {
                return err
            }

        })
    } catch (e) {
        return e
    }
}

//console.log('WTF!!!!!!!!!!!!!!!')
//csvDataToDb()

async function testData(data) {

    _.forEach(await data, row => {
        //console.log('dataStructure logged',row)

        /**
         * Validate required values before proceeding
         */

        if (row.rId && row.hospitalName) { // Though every row has rid
            //console.log('fileData+++++++++++++++++++++++++++++++++END+++++++++++++++++++++++++++++++++')

            // newInstitution item/Hospital
            let newInstitution = {
                uuid: uuid(), //string
                rId: row.rId, //double
                hospitalName: row.hospitalName,//string
                city: row.city,//string
                region: row.region,//string
                country: row.country,//string
                mainHospitalName: row.mainHospitalName,//STRING
                numberBeds: row.numberBeds,//INTEGER,
                streetAddress: row.streetAddress,//string
                numberLocation: row.numberLocations,//int
                ownedBy: row.ownedBy,//string
                managedBy: row.managedBy,//string
                keyShareholdersAndPeople: row.keyShareholdersAndPeople,//json
                grossRevenueFiscal: row.grossRevenueFiscal,//string
                annualReportDocs: row.annualReportDocs,//json
                website: row.website,//string
                currentPricingUrl: row.currentPricingUrl,//string
                currentPricingLandingURL: row.currentPricingLandingURL,//STRING,
                itemColumnName: row.itemColumnName,//string
                avgPriceColumnName: row.avgPriceColumnName,//string
                priceSampleSizeColumnName: row.priceSampleSizeColumnName,//string
                extraColumnName: row.extraColumnName,//STRING,
                categoryColumnName: row.categoryColumnName,//STRING,
                medianPricingColumnName: row.medianPricingColumnName,//string
                outPatientPriceColumnName: row.outPatientPriceColumnName,//string
                inpatientPriceColumnName: row.inPatientPriceColumnName,//string
                removedHeaderRowsForCSV: row.removedHeaderRowsForCSV,//int
                longitude: row.longitude,//double
                latitude: row.latitude,//double
                savedRepoTableName: row.savedRepoTableName,//string
                communityHospital: row.communityHospital,// bol
                type: row.type,  //string
                founded: row.founded,//data
                siteUp: row.siteUp,//bol
                contributor: row.contributor,
                hasSpreadSheet: row.hasSpreadSheet,//bol
                notes: row.notes,
                nonProfit: row.nonProfit,//bol
            }

            //console.log('fileData+++++++++++++++++++++++++++++++++END+++++++++++++++++++++++++++++++++')

            // Hospital table now
            Institutions.findOne({
                where: { rId: row.rId }
            }).then(record => {
                //console.log('record===============', record)
                /**
                 * if record doesn't exist, create one
                 */
                if (!record){
                    // insert item in database Institutions table

                    let institutionInstance = Institutions.build(
                        newInstitution
                    )

                    institutionInstance.save().then((insertedInstitution) => {
                        //console.log('insertedInstitution...',insertedInstitution)
                        //console.log('fileData+++++++++++++++++++++++++++++++++END+++++++++++++++++++++++++++++++++')
                    })
                }

                /**
                 * if record exists update/patch data
                 */
                if (record){
                    Institutions.update(
                        {
                            //rId: row.rid, //double
                            //hospitalName: row.hospitalname,//string
                            city: row.city,//string
                            region: row.region,//string
                            country: row.country,//string
                            mainHospitalName: row.mainHospitalName,//STRING
                            numberBeds: row.numberBeds,//INTEGER,
                            streetAddress: row.streetAddress,//string
                            numberLocation: row.numberLocations,//int
                            ownedBy: row.ownedBy,//string
                            managedBy: row.managedBy,//string
                            keyShareholdersAndPeople: row.keyShareholdersAndPeople,//json
                            grossRevenueFiscal: row.grossRevenueFiscal,//string
                            annualReportDocs: row.annualReportDocs,//json
                            website: row.website,//string
                            currentPricingUrl: row.currentPricingUrl,//string
                            currentPricingLandingURL: row.currentPricingLandingURL,//STRING,
                            itemColumnName: row.itemColumnName,//string
                            avgPriceColumnName: row.avgPriceColumnName,//string
                            priceSampleSizeColumnName: row.priceSampleSizeColumnName,//string
                            extraColumnName: row.extraColumnName,//STRING,
                            categoryColumnName: row.categoryColumnName,//STRING,
                            medianPricingColumnName: row.medianPricingColumnName,//string
                            outPatientPriceColumnName: row.outPatientPriceColumnName,//string
                            inpatientPriceColumnName: row.inPatientPriceColumnName,//string
                            removedHeaderRowsForCSV: row.removedHeaderRowsForCSV,//int
                            longitude: row.longitude,//double
                            latitude: row.latitude,//double
                            savedRepoTableName: row.savedRepoTableName,//string
                            communityHospital: row.communityHospital,// bol
                            type: row.type,  //string
                            founded: row.founded,//data
                            siteUp: row.siteUp,//bol
                            contributor: row.contributor,
                            hasSpreadSheet: row.hasSpreadSheet,//bol
                            notes: row.notes,
                            nonProfit: row.nonProfit,//bol
                        },
                        {
                            where: {rId: row.rId}
                        })
                        .then((data) => {
                            console.log('Updated.............', data)
                        })
                }

            })

        }
        //console.log('fileData+++++++++++++++++++++++++++++FINISHED+++++++++++++++++++++++++++++++++')

    })
}

//----------------------------------------END OF PUT REQUEST + HELPER FUNCTIONS---------------------------------

//----------------------------------START OF GET + HELPER METHODS ---------------------------------------------

/**
 * For testing returns only 100 items
 */
async function getProcedureItems() {

    try {

        //let items = {}

        const items = await Procedures.findAll({
            attributes: [
                'uuid', 'rId', 'itemName', 'hospitalId', 'price', 'hospitalName', 'type', 'description',
                'description', 'keywords', 'country', 'currency'
            ],

            raw: true,
            limit: 100
        })

        /*if (!_.isEmpty(items)) {

            items = _.chunk(items, 3000)

            console.log(items)



        }*/

        return items


    } catch (e) {

        return e
    }

}
//----------------------------------END OF GET + HELPER METHODS -----------------------------------------------

module.exports = {
    createProcedureItem,
    getCsvFileItems,
    csvDataToDb,
    getProcedureItems,
}