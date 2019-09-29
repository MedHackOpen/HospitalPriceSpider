/**
 * Servers as the express server
 */
const path = require('path')
const fs = require('fs')
const Joi = require('@hapi/joi')
const express = require('express')
const uuid = require('uuid/v4')
const _ = require('lodash')
const cors = require('cors')
const app = express()

//Database
const sequelize = require('./database/models').sequelize
const Institutions = require('./database/models').Institutions
const Services = require('./database/models').Services

//require('./prod')(app) //prod settings and middlewares

/**
 * allow cors for use with react app http://localhost:3000/ when
 * using other render like react or vue on dev
 * @TODO configure security on production (cors) also implement response status for consumers og there apis
 */
app.use(cors())

// import local services
const csvToJsonService = require('./services/csvToJson');
const xlsxToJson = require('./services/spreadsheetToJson')
const googleSheets = require('./services/spreadsheetGoogleApi')


//---------------------------------------------------------------------------------------------------------
/**
 * helper function for converting
 * csv to json give path
 */
async function getFileData(filePath) {

    const data = await csvToJsonService.getJsonFromCsv(filePath)

    return data
}

/**
 *@TODO tests the api returns json data with fields unmatched
 */
async function testingConvert() {
    const csvFilePath = path.join(__dirname, '../rawCSVs','hospital_CPMC.csv')
    const data = await csvToJsonService.getJsonFromCsv(csvFilePath)

    return data
}
//----------------------------------------------------------------------------------------------------------
app.use(express.json())

//------------------api endpoints below
/**
 * Serves as the homepage
 */
app.get('/', (req, res) => {
    res.send('Hello And welcome go to http://localhost:3007/api/csv-files , to view available csv files');
})


/**
 * Get all available CSVs data files in our local
 * folder and return
 */
app.get('/api/csv-files', async (req, res) => {
    const csvFolder = path.join(__dirname, '../rawCSVs')

    try {
        fs.readdir(csvFolder,  (err, files) => {
            if (err) res.send(err)
            else
            filesList = files.filter(function(e){
                return path.extname(e).toLowerCase() === '.csv'
            });

            res.send(filesList)
        })
    } catch (e) {
        res.send(e)
    }

})



/**
 * This endpoint given a filename+ext name
 * returns it's content on json
 */
app.get('/api/csvdata/:id', async (req, res) => {
    const fileName = req.params.id
    const csvFilePath = path.join(__dirname, '../rawCSVs', fileName)

    try {

        const data =  await getFileData(csvFilePath)
        res.send(data)
    } catch (e) {
        res.send(e)
    }
})

/**
 * This endpoint returns a list of available
 * spreadsheets in the given local folder
 */
app.get('/api/data/local-spread-sheets', async (req, res) => {

    // path to the local folder
    const xlsxFolder = path.join(__dirname, '../rawXlsxs')

    try {
        fs.readdir(xlsxFolder,  (err, files) => {
            if (err) {

                res.send(e)
            }

            else

                filesList = files.filter( (e) => {
                    return path.extname(e).toLowerCase() === '.xlsx'
                });

            res.send(filesList)
        })
    } catch (e) {
        res.send(e)
    }

})

/**
 * given a file name in the request object,
 * should convert xlsx to json
 * TODO::
 * for development got do http://localhost:3007/api/data/local-xlsl-file/{filename.xlsx}
 */
app.get('/api/data/local-xlsl-file/:id', async (req, res) => {
    const fileName = req.params.id
    const filePath = path.join(__dirname, '../rawXlsxs',fileName)

    try {

        const data = await xlsxToJson.convertXlsxToJson(filePath)

        res.send(data)

    } catch (err) {

        res.send(err)
    }



})

/**
 * We could list all available spreadsheets in this endpoint
 * save the sheets id in a database or
 * @TODO test example, should be implemented in real world
 */
app.get('/api/data/google-spread-sheets', async (req, res) => {
    const spreadSheets = [
        {id: 'sdfdstfdg23245hJJGCV', name: 'Name 1'},
        {id: 'sdfdstfdg23245hJJGCV', name: 'Name 2'},
        {id: 'sdfdstfdg23245hJJGCV', name: 'Name 3'},
        {id: 'sdfdstfdg23245hJJGCV', name: 'Name 4'},
        {id: 'sdfdstfdg23245hJJGCV', name: 'Name 5'},
    ]

    res.send(spreadSheets)
})

/**
 * This endpoint returns json data given a google spreadsheet id
 * Fetches it form your drive account, you must supply the id
 * in the request url
 * @TODO refine the output check googleSheets.getSpreadSheetData(spreadsheet to fetch)
 */
app.get('/api/data/google-spread-sheets/:id', async (req, res) => {
    const spreadSheetId = req.params.id
    try {

        const data = await googleSheets.getSpreadSheetData(spreadSheetId)

        res.send(data)

    } catch (e) {

        res.send(e)
    }

})

app.get('/api/test', async (req, res) => {
    const data =  await testingConvert()
    res.send(data)
})

//-------------------------Database endpoints--------------------------------------------------------------------------
/**
 * This section maybe broken into a separate file
 */
/**
 * Helper function for creating database tables from the models in this project
 * should be called on the endpoint that updates the database when new models are
 * added
 */

async function updateDatabase() {
    try {
        await sequelize.sync()
            .then((database) => {
                //console.log(database)
                return database
            })
    } catch (databaseError) {
        //console.log(databaseError)
        return databaseError
    }

}

/**
 * This endpoint updates or creates database tables in relation to
 * the defined model in our models folder
 * TODO refine output some values to enduser, nothing outbut sofar, only logs
 */
app.get('/api/update-script', async (req, res) => {

    let database = await updateDatabase()
    console.log(database)
    //database = JSON.stringify(database)
    res.send(database)
})

/**
 * This endpoints should retrieve data from google and populate or update
 * the services table with the relevant values from each column
 * @TODO remove dummy data
 * @TODO validate data before sending to db(ie ensure required fields are set)
 */
app.get('/api/update/google-spreadsheets-hospital-services', (req, res) => {

    const dummyData = [
        {itemName: 'Device #01', price: 1520},
        {itemName: 'Device #02', price: 20},
        {itemName: 'Device #03', price: 400},
        {itemName: 'Device #04', price: 80},
        {itemName: 'Device #05', price: 170},
    ]

    try {

        _.forEach(dummyData, (data) => {
            // insert items in database Services table
            let newData = {
                uuid: uuid(),
                itemName: data.itemName,
                price: data.price
            }

            let newDataInstance = Services.build(
                newData
            )

            newDataInstance.save()
                .then((savedData) => {

                })
        })

        res.send(dummyData)

    } catch (e) {
        res.send(e)
    }


})

/**
 * This endpoint inserts or updates the institution table given the hospital name as ID
 */
app.get('/api/update/institutions', async (req, res) => {
    const dummyInstitution = [
        {hospitalName: 'hospital Name 01', website: 'www.hospitalname.com'},
        {hospitalName: 'hospital Name 02', website: 'www.hospitalname2.com'},
        {hospitalName: 'hospital Name 03', website: 'www.hospitalname3.com'},
        {hospitalName: 'hospital Name 04', website: 'www.hospitalname4.com'},
        {hospitalName: 'hospital Name 05', website: 'www.hospitalname5.com'},
    ]

    try {
        _.forEach(dummyInstitution, (institution) => {
            // insert items in database Institutions table
            let newInstitution = {
                uuid: uuid(),
                hospitalName: institution.hospitalName,
                website: institution.website
            }

            let institutionInstance = Institutions.build(
                newInstitution
            )

            institutionInstance.save().then((insertedInstitution) => {
                //console.log('insertedInstitution...',insertedInstitution)
            })
        })

        res.send(dummyInstitution)  // we may send the inserted object(s) instead of the raw spreadsheet
    } catch (e) {
        res.send(e)
    }


})
//--------------------------End of database endpoints------------------------------------------------------------------


const port = process.env.PORT || 3007;
//save the server object into a variable
var server = app.listen(port, () => {
    console.log('listening to port....# ', port)
});
//export the server object
module.exports = server;