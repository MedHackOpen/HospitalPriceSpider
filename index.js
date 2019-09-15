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

// allow cors for use with react app http://localhost:3000/ when using other render like react or vue on dev
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
    const csvFilePath = path.join(__dirname, 'rawCSVs','hospital_CPMC.csv')
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
    const csvFolder = path.join(__dirname, 'rawCSVs')

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
    const csvFilePath = path.join(__dirname, 'rawCSVs', fileName)
    const data =  await getFileData(csvFilePath)
    res.send(data)
})

/**
 * This endpoint returns a list of available
 * spreadsheets in the given local folder
 */
app.get('/api/data/local-spread-sheets', async (req, res) => {

    // path to the local folder
    const xlsxFolder = path.join(__dirname, 'rawXlsxs')
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
    const folderPath = `services/${fileName}`
    const filePath = path.join(__dirname,folderPath)
    console.log('the path REQUESing ',filePath)
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


/*
const prices = [
    { id: 1, name: 'consultation fee'},
    { id: 2, name: ' fee'},
    { id: 3, name: 'antibiotics'},
    { id: 4, name: 'ultrasound'},
    { id: 5, name: 'vaccine'},
]

app.get('/api/prices', (req, res) => {
    res.send(prices)
})

app.get('/api/prices/:id', (req, res) => {
  const price = prices.find( p => p.id === parseInt(req.params.id))
    if (!price) res.status(404).send('The prices for the given amount is not in record') // return no found 404
    res.send(price)
})

app.post('/api/prices', (req, res) => {

    const result = validatePrice(req.body)

    if (result.error) {
        res.status(400).send(result.error.details[0].message) // Bad request
    }
    const price = {
        uuid: uuid(),
        id: prices.length+1,
        name: req.body.name
    }

    prices.push(price);
    res.send(price)
})

app.put('/api/prices/:id', (req, res) => {
    const price = prices.find( p => p.id === parseInt(req.params.id))
    if (!price) res.status(404).send('The prices for the given amount is not in record') // return no found 404

    const result = validatePrice(req.body)

    if (result.error) {
        res.status(400).send(result.error.details[0].message) // Bad request
    }

    price.name = req.body.name
    res.send(price)

})

app.delete('/api/prices/:id', (req, res) => {

})

function validatePrice(price) {

    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(price, schema)
}
*/
const port = process.env.PORT || 3007;
app.listen(port, () => {
    console.log('listening to port....# ', port)
})