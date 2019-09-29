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
 * csvDataToDb for processing, returns error or nothing if success
 */
async function getCsvFileItems(fileName) {

    //const fileName = 'hospital_CPMC.csv'
    const csvFilePath = path.join(__dirname, '../../rawCSVs', fileName)

    try {
        const csvItems = await csvToJson.csvDataItems(csvFilePath)

        //console.log(csvItems)


        if (csvItems){
            // @TODO maybe pass more args here

            /**
             * Break items array into smaller arrays
             * with 30000 items each
             */
            const brokenItems = _.chunk(csvItems, 30000)
            //console.log('========================================================')
            //console.log(' *********30000 Items******* ',brokenItems)
            //console.log(' ||*****|||| END OF BROKEN CHUNKS ||||||||****||| ')


            //return await csvDataToDb(csvItems, fileName)
            csvDataToDb(brokenItems, fileName)
                .then(() => {

                    //console.log(brokenItems)

                    return brokenItems
                })
        }

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
 * using data from each file in rawCSVs folder
 * then take it's  id and use that to get the required
 * matching fields from our institutions table, then use
 * that to create procedure items
 */

async function csvDataToDb(brokenItems, fileName) {
    //const fileNam = 'hospital_CPMC.csv'


    try {

        let institution = {}
        //console.log(fileName)
        institution = await institutionsService.getHospitalData(fileName)

        console.log(institution)
        if(institution.itemColumnName && institution.savedRepoTableName && institution.avgPriceColumnName){

            /**
             *  validate required fields before proceeding
             *  ie itemName, hospitalId, price and currency
             *  @TODO not sure what to make of currency currently
             *  below validation in that order
             */
            //console.log(institution)
            //console.log(institution)
            //console.log(dt)

            /**
             * loop over each broken items (arrays in the brokenItems array)
             */
            _.forEach(brokenItems, async (csvDataItems) => {

                await _.map(csvDataItems, async (dt, index) => {

                    if ( dt[institution.itemColumnName] && institution.rId && dt[institution.avgPriceColumnName] ) {

                        console.log('++++++++++++++++csvDataItems+++++++++++++++++++++++')
                        console.log('Broken arrays++++++++++++++++++',dt[institution.itemColumnName])
                        console.log('--------------------------------------------------------------')

                        /**
                         * new procedure item to insert into procedures table
                         */

                        // Run blocking per item now

                        console.log('creating ###ITEM###', ++index)
                        const newProcedure = {
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
                            currency: 'USD',
                        }

                        // send newProcedureItem event

                        //return emitter.emit('newProcedureItem', { item: newProcedure })
                        let newProcedureInstance = Procedures.build(newProcedure)
                        console.log('newProcedureInstance..*******..created|||*******',)
                        if (newProcedureInstance) {

                            newProcedureInstance.save()

                                .then( (savedItem) => {

                                    console.log('.........**********......Saved....**********.............',)

                                    return savedItem
                                })
                        }
                    }
                })

            })

        }


    } catch (e) {
        return e
    }

}


/**
 * @param newProcedure
 * This function given an procedure object  creates/populates
 * the procedures/services table with all that information
 */
async function createProcedureItem(newProcedure) {

    await Procedures.create({
        rId: newProcedure.rId ,
        itemName: newProcedure.itemName,
        hospitalId: newProcedure.hospitalId,
        price: newProcedure.price,
        hospitalName: newProcedure.hospitalName,
        avgPrice: newProcedure.avgPrice,
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
        currency: newProcedure.country,
    }).then(async (item) => {
        console.log('Created Item ============================+++', item)
        return item
    })
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


module.exports = {
    createProcedureItem,
    getCsvFileItems,
    csvDataToDb,
}