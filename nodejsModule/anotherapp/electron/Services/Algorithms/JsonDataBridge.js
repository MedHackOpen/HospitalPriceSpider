// Bridges data between electron and pattern recognition files

const _ = require('lodash')
//Algorithm service
const ByHuman = require('./ByHuman')
const ByKeyName = require('./ByKeyName')

async function getInstitutionByFileName(institutions, fileName){

    /*institutions.map(institution => {
        console.log(institution.savedRepoTableName)
    })*/

    let institution = await institutions.filter(institution => institution.savedRepoTableName === fileName)

    let dt = {}
    institution.map(item => {
        dt = {
            procedureKey: item.itemColumnName,
            priceKey: item.avgPriceColumnName
        }
    })

    return dt

}

async function MatchedItems(args) {
    const { currentFile, institutions, item, name } = args

    let dt = {}

    let fileExt = /.csv/i
    let fileName = currentFile.replace(fileExt, '') // remove .ext from name
    let institutionKeys = {}
    institutionKeys = await getInstitutionByFileName(institutions, fileName)

    // if set , process prices and procedure with that data,
    // else pass it through the other algorithms
    const { procedureKey, priceKey } = institutionKeys

    let matched = {} // set null and compare/set

    // if data is set in the institution data use that
    // and pass on

    if ( name === 'ByHuman') {
        dt = {
            type: 'by-institutions-data',
            procedureKey,
            priceKey,
            item
        }

        matched = ByHuman.matchValues(dt)
    }

    if ( name === 'ByKeyName') {
        dt = {
            type: 'by-key-name',
            procedureKey,
            priceKey,
            item
        }

        matched = ByKeyName.matchValues(dt)
    }


    // NOTE :: call your custom ones below
    //if ( name === 'YOUR AWESOME MODULE'){
    //   matched = YOUR AWESOME MODULE.matchValues(dt)
    //}


    return matched

}

module.exports = {
    MatchedItems
}