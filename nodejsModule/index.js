/**
 * Servers as the express server
 */
const path = require('path')
const fs = require('fs')
const url = require('url')
const Joi = require('@hapi/joi')
const express = require('express')
const axios = require('axios')
const uuid = require('uuid/v4')
const _ = require('lodash')
const cors = require('cors')
const app = express()

//Database
const sequelize = require('./database/models').sequelize
const Institutions = require('./database/models').Institutions
const Procedures = require('./database/models').Procedures

//require('./prod')(app) //prod settings and middlewares

/**
 * allow cors for use with react app http://localhost:3000/ when
 * using other render like react or vue on dev
 * @TODO add status response codes
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

        let data = await googleSheets.getSpreadSheetData(spreadSheetId)

        data = JSON.parse(data)

        //console.log('Data', data)

        res.send(data)

    } catch (e) {

        res.send(e)
    }

})

/**
 * this endpoint is used for testing
 * Current testing on matching data in the csv files
 * in relation to the records in the institutions database table
 */
app.get('/api/test', async (req, res) => {

    // get data from database, see what to make of the csv folder and it's file from that data
    Institutions.findAll({

        where : {
            'savedRepoTableName': 'YKHC_MasterChargesheet'
        },

        attributes: ['rId', 'hospitalName', 'itemColumnName', 'avgPriceColumnName',
            'priceSampleSizeColumnName', 'extraColumnName', 'categoryColumnName',
            'medianPricingColumnName', 'outPatientPriceColumnName', 'inPatientPriceColumnName','removedHeaderRowsForCSV',
            'savedRepoTableName'],
        raw: true
    }) .then(institutions => {

        // api endpoints need to communicate within the app
        // req data from '/api/data/google-spread-sheets/:id'
        let homeUrl = url.format({
            protocol: req.protocol,
            host: req.get('host'),
        });
        const csvFileName = 'YKHC_MasterChargesheet' // change this to match your spreadsheet
        const dataUrl = `${homeUrl}/api/csvdata/${csvFileName}.csv`
        axios.get(dataUrl)
            .then( async (data) => {
                const responseData = await data.data
               _.forEach(responseData, (dt) => {

                   _.forEach(institutions, (institution) => {

                        /*const  newData = [
                            { uuid: uuid() },
                            { rId: institution.rId },
                            //{ itemName}
                            { hospitalId: institution.rId },
                            { price: dt[institution.avgPriceColumnName] },
                            {  },
                            {  },
                            {  },
                            {  },
                            {  },
                            {  },
                            {  },
                            {  },
                            {  },
                            {  },
                            {  },
                            {  },
                            {  },
                            {  },
                            {  },
                            {  },
                            {  },
                        ]*/

                        const newData = {
                            uuid: uuid() ,
                            rId: institution.rId ,
                            itemName: dt[institution.itemColumnName],
                            hospitalId: institution.rId ,
                            price: dt[institution.avgPriceColumnName],
                            hospitalName: dt[institution.extraColumnName],
                            avgPrice: dt[institution.avgPriceColumnName], //@TODO maybe
                            medianPrice: dt[institution.medianPricingColumnName],
                            // sampleSize: ,
                            outpatientAvgPrice: dt[institution.outPatientPriceColumnName],
                            inpatientAvgPrice:  dt[institution.inpatientPriceColumnName],
                            revenue_code: dt[institution.categoryColumnName],
                        }

                       //console.log('institution.avgPriceColumnName ==== ',institution.avgPriceColumnName)
                       const fieldName = institution.avgPriceColumnName
                       //console.log('Dynamic Data........', `${dt}${institution.avgPriceColumnName}`)
                       console.log('fieldName...++...++..+++...+++......+++.....++++..++..++...',fieldName)
                       //console.log('Institution =======================',institution)
                       console.log('Institution.rId =======================',institution.rId)
                       console.log('Institution.hospitalName =======================',institution.hospitalName)
                       console.log('Institution.itemColumnName =======================',institution.itemColumnName)
                       console.log('Institution.avgPriceColumnName =======================',institution.avgPriceColumnName)
                       console.log('Institution.priceSampleSizeColumnName =======================',institution.priceSampleSizeColumnName)
                       console.log('Institution.extraColumnName =======================',institution.extraColumnName)
                       console.log('Institution.categoryColumnName =======================',institution.categoryColumnName)
                       console.log('Institution.medianPricingColumnName =======================',institution.medianPricingColumnName)
                       console.log('Institution.outPatientPriceColumnName =======================',institution.outPatientPriceColumnName)
                       console.log('Institution.inPatientPriceColumnName =======================',institution.inPatientPriceColumnName)
                       console.log('Institution.removedHeaderRowsForCSV =======================',institution.removedHeaderRowsForCSV)
                       console.log('institution.savedRepoTableName=======',institution.savedRepoTableName)

                       console.log('dtdtttttttttt.............',dt)
                       console.log('dt.FACILITY.............',dt.FACILITY)
                       console.log('dt.CMS_PROV_ID.............',dt.CMS_PROV_ID)
                       console.log('dt.HOSPITAL_NAME.............',dt.HOSPITAL_NAME)
                       console.log('dt.SERVICE_SETTING.............',dt.SERVICE_SETTING)
                       console.log('dt.CDM.............',dt.CDM)
                       console.log('dt.DESCRIPION...........',dt.DESCRIPION)
                       console.log('dt.REVENUE_CODE............',dt.REVENUE_CODE)
                       console.log('dt.CHARGE............',dt.CHARGE)
                       console.log('dt.CHARGE Dynamic............',dt[institution.avgPriceColumnName])
                       console.log('dt.DESCRIPTION Dynamic............',dt[institution.itemColumnName])
                       console.log('dt.REVENUE_CODE Dynamic............',dt[institution.categoryColumnName])
                        console.log('newDATA*******************|||||********************', newData)
                        console.log('csvItem************************************')

                    })

                })

            })

        res.send(institutions)

    })
    //const data =  await testingConvert()
    //res.send(data)
})

//-------------------------Database endpoints--------------------------------------------------------------------------
/**
 * This section maybe broken into a separate file
 */


/**
 * this endpoint is an improvement of the current /api/test on line 214
 * Should load the database items (institutions table/model) and get their
 * csvFile by named saved as 'savedRepoTableName' , then loop through each
 * file by name and match the fields required, then create or update the
 * services/procedures table with the right values
 */
app.get('/api/load-data-from-csv', async (req, res) => {

    // Get file names from institutions Table
    const fileNames = await Institutions.findAll({}).map(item => item.get('savedRepoTableName'))
    const institutions = await Institutions.findAll({}).map(item => item.get({ plain: true }))

   await _.forEach(institutions,async (institution) => {

        /**
         *  Check the required fields before proceeding
         *  if there's a csv file related to this institution &&
         *  avgPriceColumnName value is not null
         */
        if (institution.rId /*rId just sanity check*/ && institution.savedRepoTableName && institution.avgPriceColumnName) {

            /*console.log('ALL Institution uuid ==============================', institution.uuid)
            console.log('ALL Institution rid ==============================', institution.rId)
            console.log('ALL Institution hospitalName ==============================', institution.hospitalName)
            console.log('ALL Institution city ==============================', institution.city)
            console.log('ALL Institution region ==============================', institution.region)
            console.log('ALL Institution country ==============================', institution.country)
            console.log('ALL Institution mainHospitalName ==============================', institution.mainHospitalName)
            console.log('ALL Institution numberBeds ==============================', institution.numberBeds)
            console.log('ALL Institution streetAddress ==============================', institution.streetAddress)
            console.log('ALL Institution numberLocation ==============================', institution.numberLocation)
            console.log('ALL Institution ownedBy ==============================', institution.ownedBy)
            console.log('ALL Institution managedBy ==============================', institution.managedBy)
            console.log('ALL Institution keyShareholdersAndPeople ==============================', institution.keyShareholdersAndPeople)
            console.log('ALL Institution grossRevenueFiscal ==============================', institution.grossRevenueFiscal)
            console.log('ALL Institution annualReportDocs ==============================', institution.annualReportDocs)
            console.log('ALL Institution website ==============================', institution.website)
            console.log('ALL Institution currentPricingUrl ==============================', institution.currentPricingUrl)
            console.log('ALL Institution currentPricingLandingURL ==============================', institution.currentPricingLandingURL)
            console.log('ALL Institution itemColumnName==============================', institution.itemColumnName)
            console.log('ALL Institution avgPriceColumnName ==============================', institution.avgPriceColumnName)
            console.log('ALL Institution priceSampleSizeColumnName ==============================', institution.priceSampleSizeColumnName)
            console.log('ALL Institution extraColumnName ==============================', institution.extraColumnName)
            console.log('ALL Institution categoryColumnName ==============================', institution.categoryColumnName)
            console.log('ALL Institution medianPricingColumnName ==============================', institution.medianPricingColumnName)
            console.log('ALL Institution outPatientPriceColumnName ==============================', institution.outPatientPriceColumnName)
            console.log('ALL Institution inpatientPriceColumnName ==============================', institution.inpatientPriceColumnName)
            console.log('ALL Institution removedHeaderRowsForCSV ==============================', institution.removedHeaderRowsForCSV)
            console.log('ALL Institution longitude ==============================', institution.longitude)
            console.log('ALL Institution latitude ==============================', institution.latitude)
            console.log('ALL Institution savedRepoTableName/fileName ==============================', institution.savedRepoTableName)
            console.log('ALL Institution communityHospital ==============================', institution.communityHospital)
            console.log('ALL Institution type ==============================', institution.type)
            console.log('ALL Institution founded ==============================', institution.founded)
            console.log('ALL Institution siteUp ==============================', institution.siteUp)
            console.log('ALL Institution contributor ==============================', institution.contributor)
            console.log('ALL Institution hasSpreadSheet ==============================', institution.hasSpreadSheet)
            console.log('ALL Institution notes ==============================', institution.notes)
            console.log('ALL Institution nonProfit ==============================', institution.nonProfit)
            console.log('ALL Institution createdAt ==============================', institution.createdAt)*/

            // api endpoints need to communicate within the app
            // req data from '/api/data/google-spread-sheets/:id'
            let homeUrl = url.format({
                protocol: req.protocol,
                host: req.get('host'),
            });

            // each csv file by its file name in relation to this institution
            const csvFileName = institution.savedRepoTableName
            const dataUrl = `${homeUrl}/api/csvdata/${csvFileName}.csv` // call this endpoint within this app

            //let csvData = await axios.get(dataUrl)
            //let { data } = csvData
            //if (data) {
            //}

            await axios.get(dataUrl)
                .then(async (data) => {

                    const responseData = await data.data
                    _.forEach(responseData, async (dt) => {

                        //console.log(institution)

                        /**
                         *  validate required fields before proceeding
                         *  ie itemName, hospitalId, price and currency
                         *  @TODO not sure what to make of currency currently
                         *  below validation in that order
                         */
                        if ( dt[institution.itemColumnName] && institution.rId && dt[institution.avgPriceColumnName]) {

                            /**
                             * new procedure item to insert into procedures table
                             */

                            const newData = {
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
                                //currency: ,
                            }

                            //console.log('institution.avgPriceColumnName ==== ',institution.avgPriceColumnName)
                            const fieldName = institution.avgPriceColumnName
                            //console.log('Dynamic Data........', `${dt}${institution.avgPriceColumnName}`)
                            /*console.log('fieldName...++...++..+++...+++......+++.....++++..++..++...',fieldName)
                            //console.log('Institution =======================',institution)
                            console.log('Institution.rId =======================',institution.rId)
                            console.log('Institution.hospitalName =======================',institution.hospitalName)
                            console.log('Institution.itemColumnName =======================',institution.itemColumnName)
                            console.log('Institution.avgPriceColumnName =======================',institution.avgPriceColumnName)
                            console.log('Institution.priceSampleSizeColumnName =======================',institution.priceSampleSizeColumnName)
                            console.log('Institution.extraColumnName =======================',institution.extraColumnName)
                            console.log('Institution.categoryColumnName =======================',institution.categoryColumnName)
                            console.log('Institution.medianPricingColumnName =======================',institution.medianPricingColumnName)
                            console.log('Institution.outPatientPriceColumnName =======================',institution.outPatientPriceColumnName)
                            console.log('Institution.inPatientPriceColumnName =======================',institution.inPatientPriceColumnName)
                            console.log('Institution.removedHeaderRowsForCSV =======================',institution.removedHeaderRowsForCSV)
                            console.log('institution.savedRepoTableName=======',institution.savedRepoTableName)

                            console.log('dt.dtdtdtdtdtdtdtdtdtdtdtdtdtd............',dt)
                            console.log('dt.FACILITY.............',dt.FACILITY)
                            console.log('dt.CMS_PROV_ID.............',dt.CMS_PROV_ID)
                            console.log('dt.HOSPITAL_NAME.............',dt.HOSPITAL_NAME)
                            console.log('dt.SERVICE_SETTING.............',dt.SERVICE_SETTING)
                            console.log('dt.CDM.............',dt.CDM)
                            console.log('dt.DESCRIPION...........',dt.DESCRIPION)
                            console.log('dt.REVENUE_CODE............',dt.REVENUE_CODE)
                            console.log('dt.CHARGE............',dt.CHARGE)*/
                            //console.log('dt.CHARGE Dynamic............',dt[institution.avgPriceColumnName])// TODO.. start here tomorrow
                            //console.log('newDATA******************************************************', newData)


                            /**
                             * find if the Procedures record exists with the hospital id, if not create a new record
                             * if the record exists then update with the latest data from
                             */

                            try {

                                await Procedures.findOne({

                                    where: { rId: institution.rId, itemName: dt[institution.itemColumnName] },
                                    returning: true,

                                }).then(async (record) => {
                                    console.log('RECORED||||||||||||||||||||||||||||||||||', record)
                                    // if record is not in the table, create one

                                    if (!record) {
                                        // insert items in database Procedures table

                                        try {

                                            let newDataInstance = await Procedures.build(
                                                newData
                                            )

                                            await newDataInstance.save()
                                                .then(async (savedData) => {
                                                    //console.log('Updated.............', savedData)
                                                    await res.send('Data.Saved.........')
                                                })
                                        } catch (e) {
                                            console.log('Error creating procedure',  e)
                                        }


                                    }

                                    // if record is truthy...update/patch its data
                                    if (record) {

                                        try {

                                            await Procedures.update(
                                                {
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
                                                },
                                                {
                                                    where: {rId: institution.rId, itemName: dt[institution.itemColumnName]}
                                                })
                                                .then((data) => {
                                                    //console.log('Updated.............', data)
                                                })

                                        } catch (e) {
                                            console.log('Error updating procedure', e)
                                        }

                                    }

                                    //console.log(record.dataValues)
                                })
                            } catch (e) {
                                console.log('Error finding', e)
                            }

                        }


                    })
                    //console.log('Data........................', responseData)
                })

            //console.log('DataUrl........................', dataUrl)
        }

    })

    //process.exit('ALL Institutions ====++++++ logged')


    //const data =  await testingConvert()
    //res.send(data)
})
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
    //console.log(database)
    //database = JSON.stringify(database)
    res.send(database)
})

/**
 * This endpoints should retrieve data from google and populate or update
 * the institutions table with the relevant values from each column
 * @TODO load data from both local spreadsheets and google spreadsheets
 */
app.get('/api/update/google-spreadsheets-hospital-services', async (req, res) => {

    // api endpoints need to communicate within the app
    // req data from '/api/data/google-spread-sheets/:id'
    let homeUrl = url.format({
        protocol: req.protocol,
        host: req.get('host'),
    });

    const spreadSheetId = '17v-jZUsnU5Hl6l4GpOtd-cQ8maOMY8OMC5TYzmuUZPQ' // change this to match your spreadsheet
    const dataUrl = `${homeUrl}/api/data/google-spread-sheets/${spreadSheetId}`

    // get data from google via our internal endpoint..call another endpoint in this app
    axios.get(dataUrl)
        .then( (response) => {
            //console.log('Response...DATA............',response.data)
            _.forEach(response.data, row => {

                // data from googlesheets/response.data from the const dataUrl above
                //console.log(row) // for more data structure

                console.log('Google spreadsheet DATA......')
                console.log('Rows..id : ', row.id)
                console.log('Rows.._links : ', row._links)
                console.log('Rows..rid : ', row.rid)
                console.log('Rows..hosptipla name : ', row.hospitalname)
                console.log('Rows..city : ', row.city)
                console.log('Rows..region : ', row.region)
                console.log('Rows..country : ', row.country)
                console.log('Rows..mainhospitalname : ', row.mainhospitalname)
                console.log('Rows..numberbeds : ', row.numberbeds)
                console.log('Rows..streetaddress : ', row.streetaddress)
                console.log('Rows..numberlocations : ', row.numberlocations)
                console.log('Rows..ownedby : ', row.ownedby)
                console.log('Rows..managedby : ', row.managedby)
                console.log('Rows..keyshareholdersandpeople : ', row.keyshareholdersandpeople)
                console.log('Rows..grossrevenuefiscal : ', row.grossrevenuefiscal)
                console.log('Rows..annualreportdocs : ', row.annualreportdocs)
                console.log('Rows..website : ', row.website)
                console.log('Rows..currentpricingurl : ', row.currentpricingurl)
                console.log('Rows..currentpricinglandingurl : ', row.currentpricinglandingurl)
                console.log('Rows..itemcolumnname : ', row.itemcolumnname)
                console.log('Rows..avgpricecolumnname : ', row.avgpricecolumnname)
                console.log('Rows..pricesamplesizecolumnname : ', row.pricesamplesizecolumnname)
                console.log('Rows..extracolumnname : ', row.extracolumnname)
                console.log('Rows..extracolumnname_2 : ', row.extracolumnname_2)
                console.log('Rows..categorycolumnname : ', row.categorycolumnname)
                console.log('Rows..medianpricingcolumnname : ', row.medianpricingcolumnname)
                console.log('Rows..outpatientpricecolumnname : ', row.outpatientpricecolumnname)
                console.log('Rows..inpatientpricecolumnname : ', row.inpatientpricecolumnname)
                console.log('Rows..removedheaderrowsforcsv : ', row.removedheaderrowsforcsv)
                console.log('Rows..longitude : ', row.longitude)
                console.log('Rows..latitude : ', row.latitude)
                console.log('Rows...savedrepotablename : ', row.savedrepotablename)
                console.log('Rows..communityhospital : ', row.communityhospital)
                console.log('Rows..type : ', row.type)
                console.log('Rows..founded : ', row.founded)
                console.log('Rows..contributor : ', row.contributor)
                console.log('Rows..siteup : ', row.siteup)
                console.log('Rows..SS : ', row.hasspreadsheet)
                console.log('Rows..Notes : ', row.notes)
                console.log('++++++++++++++++++++++++++++++++++BREAK+++++++++++++++++++++++++++++++++')
                console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')


                /**
                 * Validate required values before proceeding
                 */

                if (row.rid) { // Though every row has rid

                    // newInstitution item/Hospital
                    let newInstitution = {
                        uuid: uuid(), //string
                        rId: row.rid, //double
                        hospitalName: row.hospitalname,//string
                        city: row.city,//string
                        region: row.region,//string
                        country: row.country,//string
                        mainHospitalName: row.mainhospitalname,//STRING
                        numberBeds: row.numberbeds,//INTEGER,
                        streetAddress: row.streetaddress,//string
                        numberLocation: row.numberlocations,//int
                        ownedBy: row.ownedby,//string
                        managedBy: row.managedby,//string
                        keyShareholdersAndPeople: row.keyshareholdersandpeople,//json
                        grossRevenueFiscal: row.grossrevenuefiscal,//string
                        annualReportDocs: row.annualreportdocs,//json
                        website: row.website,//string
                        currentPricingUrl: row.currentpricingurl,//string
                        currentPricingLandingURL: row.currentpricinglandingurl,//STRING,
                        itemColumnName: row.itemcolumnname,//string
                        avgPriceColumnName: row.avgpricecolumnname,//string
                        priceSampleSizeColumnName: row.pricesamplesizecolumnname,//string
                        extraColumnName: row.extracolumnname,//STRING,
                        categoryColumnName: row.categorycolumnname,//STRING,
                        medianPricingColumnName: row.medianpricingcolumnname,//string
                        outPatientPriceColumnName: row.outpatientpricecolumnname,//string
                        inpatientPriceColumnName: row.inpatientpricecolumnname,//string
                        removedHeaderRowsForCSV: row.removedheaderrowsforcsv,//int
                        longitude: row.longitude,//double
                        latitude: row.latitude,//double
                        savedRepoTableName: row.savedrepotablename,//string
                        communityHospital: row.communityhospital,// bol
                        type: row.type,  //string
                        founded: row.founded,//data
                        siteUp: row.siteup,//bol
                        contributor: row.contributor,
                        hasSpreadSheet: row.hasspreadsheet,//bol
                        notes: row.notes,
                        nonProfit: row.nonprofit,//bol
                    }

                    // Hospital table now
                    Institutions.findOne({
                        where: { rId: row.rid }
                    }).then(record => {
                        console.log('record===============', record)
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
                                    mainHospitalName: row.mainhospitalname,//STRING
                                    numberBeds: row.numberbeds,//INTEGER,
                                    streetAddress: row.streetaddress,//string
                                    numberLocation: row.numberlocations,//int
                                    ownedBy: row.ownedby,//string
                                    managedBy: row.managedby,//string
                                    keyShareholdersAndPeople: row.keyshareholdersandpeople,//json
                                    grossRevenueFiscal: row.grossrevenuefiscal,//string
                                    annualReportDocs: row.annualreportdocs,//json
                                    website: row.website,//string
                                    currentPricingUrl: row.currentpricingurl,//string
                                    currentPricingLandingURL: row.currentpricinglandingurl,//STRING,
                                    itemColumnName: row.itemcolumnname,//string
                                    avgPriceColumnName: row.avgpricecolumnname,//string
                                    priceSampleSizeColumnName: row.pricesamplesizecolumnname,//string
                                    extraColumnName: row.extracolumnname,//STRING,
                                    categoryColumnName: row.categorycolumnname,//STRING,
                                    medianPricingColumnName: row.medianpricingcolumnname,//string
                                    outPatientPriceColumnName: row.outpatientpricecolumnname,//string
                                    inpatientPriceColumnName: row.inpatientpricecolumnname,//string
                                    removedHeaderRowsForCSV: row.removedheaderrowsforcsv,//int
                                    longitude: row.longitude,//double
                                    latitude: row.latitude,//double
                                    savedRepoTableName: row.savedrepotablename,//string
                                    communityHospital: row.communityhospital,// bol
                                    type: row.type,  //string
                                    founded: row.founded,//data
                                    siteUp: row.siteup,//bol
                                    contributor: row.contributor,
                                    hasSpreadSheet: row.hasspreadsheet,//bol
                                    notes: row.notes,
                                    nonProfit: row.nonprofit,//bol
                                },
                                {
                                    where: {rId: row.rid}
                                })
                                .then((data) => {
                                    console.log('Updated.............', data)
                                })
                        }

                    })
                }
            })

            res.send('Data------insync')
        })

})

/**
 * This endpoint inserts or updates the institution table given the hospital name as ID
 */
app.get('/api/update/institutions', (req, res) => {
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
                uuid: uuid(), //string
                rId: 'Test!!', //double
                hospitalName: 'Test!!',//string
                city: 'Test!!',//string
                region: 'Test!!',//string
                country: 'Test!!',//string
                streetAddress: 'Test!!',//string
                numberLocation: 'Test!!',//int
                ownedBy: 'Test!!',//string
                managedBy: 'Test!!',//string
                keyShareholdersAndPeople: 'Test!!',//json
                grossRevenueFiscal: 'Test!!',//double
                annualReportDocs: 'Test!!',//json
                website: 'Test!!',//string
                currentPricingUrl: 'Test!!',//string
                itemColumnName: 'Test!!',//string
                avgPriceColumnName: 'Test!!',//string
                priceSampleSizeColumnName: 'Test!!',//string
                medianPricingColumnName: 'Test!!',//string
                outPatientPriceColumnName: 'Test!!',//string
                inpatientPriceColumnName: 'Test!!',//string
                removedHeaderRowsForCSV: 'Test!!',//int
                longitude: 'Test!!',//double
                latitude: 'Test!!',//double
                founded: 'Test!!',//data
                type: 'Test!!',  //string
                nonProfit: 'Test!!',//bol
                communityHospital: 'Test!!', // bol
                savedRepoTableName: 'Test!!' // string
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
app.listen(port, () => {
    console.log('listening to port....# ', port)
})