'use strict'
// immediate receiver of data after it has been returned by
// a pattern recognition file/function like matchKey

// DB services
const ProcedureDbService = require('../Database/ProcedureDbService')
const InstitutionDbService = require('../Database/InstitutionDbService')

const LogDbBridge = require('./LogDbBridge')

// institutions from database below
let institutions = InstitutionDbService.getInstitutions()

// get institution data from database with reference to
// file name, we need rId, locations and such with
// every procedure item we create
async function getInstitutionByFileName(fileName){

    return await institutions.filter(institution => institution.savedRepoTableName === fileName)

}

// here we process data gotten from this.reportItem(args) below
// choose what to do with the files as well us log as much to
// the relevant tables for easier debugging later
async function prepareDataForDatabase(args){

    const { data, institution } = args
    const { type, refined, currentFile: fileName, index, totalItems } = data

    let refinedData = JSON.parse(refined.refined)

    const { procedure, price } = refinedData
    // TODO do better below
    let procedureName = procedure.map(p => p.value)// procedure value
    let procedureKey = procedure.map(p => p.key) // procedure key
    let priceValue = price.map(p => p.value) // price value
    let priceKey = price.map(p => p.key) // prive key
    procedureName = procedureName[0] // 1st item if many
    procedureKey = procedureKey[0]
    priceValue = priceValue[0]
    priceKey = priceKey[0]


    //console.log(procedureName)
    //console.log(procedureKey)
    //console.log(priceValue)
    //console.log(priceKey)
    console.log(institution)
    console.log('|||||||||||||| ARGS!! |||||||||||||||')

    return args

    /*const { args: obj, institution } = args
    const { data, refinedData: rf, filePath, name, index, totalItems } = obj

    let refinedData = JSON.parse(rf)


    // institution data as related to this procedure's data
    let institutionDt = {}
    institution.map((item) => {
        institutionDt = {
            uuid: item.uuid,
            rId: item.rId,
            hospitalName: item.hospitalName,
            city: item.city,
            country: item.country,
            mainHospitalName: item.mainHospitalName,
            numberBeds: item.numberBeds,
            streetAddress: item.streetAddress,
            numberLocation: item.numberLocation,
            itemColumnName: item.itemColumnName,
            avgPriceColumnName: item.avgPriceColumnName,
            priceSampleSizeColumnName: item.priceSampleSizeColumnName,
            outPatientPriceColumnName: item.outPatientPriceColumnName,
            inpatientPriceColumnName: item.inpatientPriceColumnName,
            extraColumnName: item.extraColumnName,
            categoryColumnName: item.categoryColumnName,
            removedHeaderRowsForCSV: item.removedHeaderRowsForCSV,
            savedRepoTableName: item.savedRepoTableName,
            notes: item.notes,
            hasSpreadSheet: item.hasSpreadSheet
        }
    })


    // Check if we got a priceValue, procedureName and the institution data related
    // to this file(csv filePath passed), if yes proceed to create a new procedure item,
    // if no institution data, move the file to a folder for later reviews,
    // if no priceValue and it's corresponding procedure name, wait for
    // the last index to move the file else where.
    // NOTE: due to removed headers and some other rows in the cvs file being empty or not
    // containing all the required data items, files that return 0 matched price and it's
    // procedure name are considered to be unprocessed by the name of the passed
    // algorithm file, else processed
    let processed = {}

    let dataToDb = {
        institution,
        institutionDt,
        filePath,
        name,
        procedureName,
        procedureKey,
        priceValue,
        priceKey,
        index,
        totalItems
    }
    // compare index and totalItems before repeating the file read data processes
    // make sure the last index (item) has passed through
    processed = await ProcedureDbService.createNewProcedureEntry(dataToDb)


    // processed object returns if procedures records were created or not
    // choose what to do with this info

    await LogDbBridge.sendNewLogsData(processed)

    return processed*/

}

// incoming raw Report item
async function handleRefinedItem(args){
    const { type, refinedD, currentFile, name, data, index, totalItems } = args

    let fileExt = /.csv/i
    let fileName = currentFile.replace(fileExt, '') // remove .ext from name
    let institution = await getInstitutionByFileName(fileName)

    //console.log(institutions)


    let dt = {
        data: args,
        institution // this file name info in the institutions table
    }

    const prepared = await prepareDataForDatabase(dt)

    return prepared
}

module.exports = {
    handleRefinedItem
}