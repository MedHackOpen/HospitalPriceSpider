'use strict'
// Bridges data base services with Report.js in ../Processors/Report
const path = require('path')

const ProcedureDbService = require('../Database/ProcedureDbService')
const InstitutionDbService = require('../Database/InstitutionDbService')

// institutions from database below
const institutions = InstitutionDbService.getInstitutions()
//let institution = {}

// get institution data from database with reference to
// file name, we need rId, locations and such with
// every procedure item we create
async function getInstitutionByFileName(fileName){

    return await institutions.filter(institution => institution.savedRepoTableName === fileName)
}


// here we process data gotten from this.reportItem(args) below
// choose what to do with the files as well us log as much to
// the relevant tables for easier debugging later
function prepareDataForDatabase(args){
    const { args: obj, institution } = args
    const { data, refinedData: rf, filePath, name, index, totalItems } = obj

    let refinedData = JSON.parse(rf)

    const { procedure, price } = refinedData

    let procedureName = procedure.map(p => p.value)// procedure value
    let procedureKey = procedure.map(p => p.key) // procedure key
    let priceValue = price.map(p => p.value) // price value
    let priceKey = price.map(p => p.key) // prive key

    console.log('|||||||||||||||||||---REFINED ---ITEM!!!!!!!!!!!!|||||||||||||||||||')
    console.log(filePath)
    console.log(procedureName)
    console.log(procedureKey)
    console.log(priceValue)
    console.log(priceKey)
    console.log(institution)
    console.log('|||||||||||||||||||---REFINED ---ITEM!!!!!!!!!!!!|||||||||||||||||||')

    const dt = ProcedureDbService.createNewProcedureEntry(args)

}

// incoming raw Report item
async function reportItem(args){
    const { data, refinedData, filePath, name, index, totalItems } = args

    let fileExt = /.csv/i
    let fileName = path.parse(filePath).base
    fileName = fileName.replace(fileExt, '') // remove ext
    let institution = await getInstitutionByFileName(fileName)
    institution.filter(i => i)
    let dt = {
        args,
        institution
    }

    prepareDataForDatabase(dt)
}

module.exports = {
    reportItem
}