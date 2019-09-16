/**
 * Servers as the express server
 */
const path = require('path')
const fs = require('fs')
const Joi = require('@hapi/joi')
const express = require('express')
const uuid = require('uuid/v4')
const cors = require('cors')
const app = express()


/**
 * allow cors for use with react app http://localhost:3000/ when
 * using other render like react or vue on dev
 * @TODO configure security on production (cors)
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
    const data =  await getFileData(csvFilePath)
    res.send(data)
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

    const data = await xlsxToJson.convertXlsxToJson(filePath)

    res.send(data)

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
    const data = await googleSheets.getSpreadSheetData(spreadSheetId)

    res.send(data)
})

app.get('/api/test', async (req, res) => {
    const data =  await testingConvert()
    res.send(data)
})


const port = process.env.PORT || 3007;
app.listen(port, () => {
    console.log('listening to port....# ', port)
})