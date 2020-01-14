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
    const { type, refined, currentFile: fileName, index, totalItems, missed, recorded, name, countItems, items } = data


    let refinedData = {}
    refinedData = JSON.parse(refined)

    const { procedure, price } = refinedData
    // TODO do better below
    let procedureName = null
    let procedureKey = null
    let priceValue = null
    let priceKey = null
    if(procedure.length !== 0) {
        procedureName= procedure.map(p => p.value)// procedure value
        procedureKey = procedure.map(p => p.key) // procedure key
        procedureName = procedureName[0] // 1st item if many
        procedureKey = procedureKey[0]
    }

    if(price.length !== 0) {
        priceValue = price.map(p => p.value) // price value
        priceKey = price.map(p => p.key) // prive key
        priceValue = priceValue[0]
        priceKey = priceKey[0]
    }

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

    // if no institution data, move the file to a folder for later reviews, OR pass those value(s) for processing
    // if no priceValue and it's corresponding procedure name, wait for
    // the last index to move the file else where.
    // NOTE: due to removed headers and some other rows in the cvs file being empty or not
    let processed = {}

    let dataToDb = {
        institution,
        institutionDt,
        fileName,
        name,
        procedureName,
        procedureKey,
        priceValue,
        priceKey,
        index,
        totalItems,
        missed,
        recorded,
        countItems,
        items
    }
    // compare index and totalItems before repeating the file read data processes
    // make sure the last index (item) has passed through

    //returns processes processed from database/ or none
    processed = await ProcedureDbService.createNewProcedureEntry(dataToDb)

    // processed object returns if procedures records were created or not
    // choose what to do with this info

    // return logged now
    return await LogDbBridge.sendNewLogsData(processed)

}

// incoming raw Report item
async function handleRefinedItem(args){

    const { type, refinedD, currentFile, name, data, index, totalItems, recorded, missed } = args

    console.log(args)
    console.log('***********************ZA DATABASE**************************')

    let fileExt = /.csv/i
    let fileName = currentFile.replace(fileExt, '') // remove .ext from name
    let institution = await getInstitutionByFileName(fileName)

    //console.log(institutions)


    let dt = {
        data: args,
        institution // this file name info in the institutions table
    }

    // return log for current file
    return await prepareDataForDatabase(dt)
}

module.exports = {
    handleRefinedItem
}