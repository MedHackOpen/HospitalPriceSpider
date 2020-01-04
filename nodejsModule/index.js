'use strict'
/**
 * Servers as the express server
 */
const path = require('path')
const fs = require('fs')
let events = require('events')
const url = require('url')
const express = require('express')
const axios = require('axios')
const uuid = require('uuid/v4')
const _ = require('lodash')
const cors = require('cors')
const app = express()


let eventEmitter = new events.EventEmitter()

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
app.use(express.json())
app.use(cors())

// import local services
const csvToJsonService = require('./services/csvToJson');
const csvProcessor = require('./services/CsvProcessor');
const xlsxToJson = require('./services/spreadsheetToJson')
const googleSheets = require('./services/spreadsheetGoogleApi')
const institutionsService = require('./services/institutionsService')
const fileFolderService = require('./services/fileFolderService')
const proceduresService = require('./services/proceduresService')

// character data match service
const InitDataMatch = require('./services/charMatch/InitDataMatch')


//---------------------------------------------------------------------------------------------------------
/**
 * helper function for converting
 * csv to json give path
 */
async function getFileData(filePath, removedHeaderRows) {
    

    const data = await csvToJsonService.getJsonFromCsv(filePath, removedHeaderRows)


    return data
}

/**
 *@TODO tests the api returns json data with fields unmatched
 */
async function testingConvert() {
    const csvFilePath = path.join(__dirname, '../rawCSVs', 'hospital_CPMC.csv')
    const data = await csvToJsonService.getJsonFromCsv(csvFilePath)

    return data
}

//----------------------------------------------------------------------------------------------------------

//------------------api endpoints below
/**
 * Serves as the homepage
 */
app.get('/', (req, res) => {
    /*const CsvProcessor = require('./services/csvProcessor');
    const $processor = new CsvProcessor();
    //var $fullpath = $csvPath + '\\' + $filename+".csv";
    var $fullpath = 'C:\\xampp\\htdocs\\HospitalPriceSpider\\rawCSVs\\BethesdaHospital_ChargeMaster_AU.csv';
    var $dd = $processor.getFileHeader($fullpath);
    console.log($dd);
    if($dd!==undefined){
        try{
            var $h = $processor.cleanUpHeader($dd.header);
            console.log($h);
            //LOG THE COLUMN MAP
            var $hmap = $processor.colMapping($h);
            //console.log($hmap);
            if(($hmap.itemName.length>0) && ($hmap.price.length>0)){

                var $c = parseInt($dd.hline);
                while($c<$dd.content.length){
                    var $row = $dd.content[$c];
                    var $i = $hmap.price[0];
                    //change into object
                    var $robject = $row.split(',');
                    var $trow = {
                        //'rId':$a.rId,
                        'price':$robject[$hmap.price[0]],
                        'itemname':$robject[$hmap.itemName[0]],
                    };
                    $records++;
                    console.log($trow);
                    //console.log($row[$hmap.price[0]]);
                    $c++;
                }
            }
        }
        catch ($e) {
            $h = null;
            //console.log($e);
        }
    }
    else {
        console.log("File not found");
    }*/
    res.send('Welcome to MedHack Hospital Price Spider.....');
})


// Loops through files (csv) in folders (named)
// identifying procedure name and price(s) values
// and posting that to the procedures table
// also sort files into folders with each type of
// algorithm used to identify each field for further
// cleaning the output
// if you want to contribute from here check __dirname,/services/charMatch folder


app.get('/api/match-field-data', async (req, res, next) => {

    try {

        let data = await InitDataMatch.initCharacterDataMatch()

        const { csvJson, filePath } = data

        if (data) res.send(data)

        if (!data) res.send('+++++++Folder might be empty of csv files++++++')

        /*console.log('++++++++++MOVING AGAIN  what what+++++++++')
        console.log('++++++++++MOVING AGAIN  what what+++++++++')
        console.log(filePath)
        console.log('++++++++++MOVING AGAIN  what what+++++++++')
        console.log('++++++++++MOVING AGAIN  what what+++++++++')*/
        //next()


    } catch (e) {


        res.send(e)
    }
})


/**
 * Get all available CSVs data files in our local
 * folder and return
 */
app.get('/api/csv-files', async (req, res) => {
    const csvFolder = path.join(__dirname, '../rawCSVs')

    let filesList = []

    try {
        fs.readdir(csvFolder, (err, files) => {
            if (err) res.send(err)
            else
                filesList = files.filter(function (e) {
                    return path.extname(e).toLowerCase() === '.csv'
                });

            res.send(filesList)
        })
    } catch (e) {
        res.send(e)
    }

})

/**
 * Get all available CSVs data files in our local
 * folder and return/
 * @TODO duplicate from above remove one
 */
app.get('/api/local-csv-files', async (req, res) => {
    const csvFolder = path.join(__dirname, '../rawCSVs')

    let filesList = []

    try {
        await fs.readdir(csvFolder,  (err, files) => {
            if (err) res.send(err)
            else
                filesList = files.filter((e) => {
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

    // Remove the .csv from fileName before requesting for the institution (database)
    // remove .csv from filename (string)
    let pattern = /.csv/gi

    let savedRepoTableName = fileName
    savedRepoTableName = savedRepoTableName.replace(pattern, '') // remove .csv

    // get institution data per req per file
    const institution = await institutionsService.getHospitalData(savedRepoTableName)
    // if the file has not match in the institution's table, determine the header row using different logic

    if(institution==null){
        let $cp = new csvProcessor();
        var $e = $cp.getFileHeader(csvFilePath);
        var $headerRow = $e.hline;
    }
    else{
        var $headerRow = institution.removedHeaderRowsForCSV;
    }

    try {

        const data = await getFileData(csvFilePath, $headerRow)
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

    let filesList = []

    try {
        fs.readdir(xlsxFolder, (err, files) => {
            if (err) {

                res.send(e)
            } else

                filesList = files.filter((e) => {
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
    const filePath = path.join(__dirname, '../rawXlsxs', fileName)

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

//-----------------------------START OF TESTING ENDPOINTS-------------------------------------------------------------
/**
 * this endpoint is used for testing
 * Current testing on moving imported files with all records into their folders
 * and those with errors to another fol;der
 *
 * Create and exportable module resposible for moving the files, then suppplky it with folder
 * name and file name respectively
 *
 * After that, files with errors can be forwarded to the researchers team, and
 */
app.get('/api/test', async (req, res) => {
    //const institutions = await institutionsService.getInstitutions()
    //const institutionFileNames = await institutionsService.institutionFileNames()
    try {
        // api endpoints need to communicate within the app
        // req data from '/api/data/google-spread-sheets/:id'
        let homeUrl = url.format({
            protocol: req.protocol,
            host: req.get('host'),
        });
        // api endPoint to get the file list
        const endPoint = '/api/local-csv-files'
        const dataUrl = `${homeUrl}${endPoint}`
        //console.log('data link:'+dataUrl)
        // Get files ready to process from our rawCSVs folder from the api above
        const files = await fileFolderService.filesReadyToProcess(dataUrl)

        const csvFileName = await files.map( async (item, index) => {
            const file = {
                fileNumber: ++index, //add 1 to start counting from 1
                name: item
            }
            //console.log('csvFileName|||||====|||||====', file )
            //console.log('TotalFilesInFolder====|||||====', files.length )
            const csvFileData = await fileFolderService.processCsvFile(homeUrl, item)
            console.log('csvFileName||||===||||===',file.name+"||"+file.fileNumber)
            return file
        });
        //res.send(files)
        res.send(csvFileName)
    } catch (e) {

        console.log('Error getting files')
    }


    // get each institution in the table
    //_.forEach(institutions, async (institution) => {
    //console.log('TEST!!!!', institution)
    //console.log('================BREAK========================')
    //console.log('===============ALL=ITEMS====================', institutions.length)

    //const institutionFileName = await institutionsService.institutionFileName(institution.rId)
    //const institutionFileName = institution.savedRepoTableName
    //if (institutionFileName) {

    /**
     * @TODO implement logic to sort files ready for processing here
     * run once when needed..comment when not
     */
    //console.log('File Name ======= |||||| ========== ',institutionFileName)
    //res.send(institutionFileName)
    //}

    //res.send(institutions)


    // each csv file by its file name in relation to this institution
    //const csvFileName = institution.savedRepoTableName
    //const dataUrl = `${homeUrl}/api/csvdata/${csvFileName}.csv` // call this endpoint within this app


    //})

    //console.log('TEST!!!!', institutions)
    //res.send(institutions)
    //console.log('FILE NAMES!!!!', institutionFileNames)
})

/**
 * Given a file name, this endpoint searches our institutions table and
 * returns the institutions data related to that file
 */
app.get('/api/institution-data/:filename', async (req, res) => {

    const fileName = req.params.filename
    const institution = await institutionsService.getHospitalData(fileName)

    let data = {}
     if (!_.isEmpty(institution)) {

         data = {
             message: `Data for institution related to ${fileName}.csv`,
             institution
         }
         res.send(data)
     }

     if (_.isEmpty(institution)) {
         data = {
             message: `No institution related to ${fileName}`,
             institution
         }

         res.send(data)
     }
})


//-----------------------------START OF TESTING ENDPOINTS-------------------------------------------------------------

//------------------START----------Sort files endpoint(s)---------------------------START-----------------------------

/**
 * In relation to the file names in the institutions database table
 *  (institution.savedRepoTableName), we compare that with our local
 *  folders and move the files that are in database to a folder
 *  ready for processing.
 *  See defined dir paths below
 */
app.get('/api/sort-files', async (req, res) => {

    const institutions = await institutionsService.getInstitutionsReqData()

    // get each institution in the table
    _.map(institutions, async (institution) => {

        // institution file name as saved in the institution table
        const institutionFileName = institution.savedRepoTableName

        if (institutionFileName) {


            try {

                // logic to sort files ready for processing below

                const ext = '.csv' // moving .csv files
                const fileName = `${institutionFileName}${ext}`//'csvFileName.csv'



                const dirPath = '../rawCSVs/unSortedFiles/' // Location unsorted files

                const destPath = '../rawCSVs/'
                const from = `${dirPath}${fileName}`
                const to = `${destPath}${fileName}`
                await fileFolderService.stageFilesForProcessing(from, to)

                /**
                 * From the readme.md in the root of this repo (defined required fields),
                 * we move files without the
                 * required fields to other folders for those details to be accurate/available
                 * Required fields for all are itemName, hospitalId, currency and price.
                 * use country to get currency
                 */

                if (!institution.itemColumnName ) {

                    // Missing itemColumnName

                    const dirPath = '../rawCSVs/' // remove file from above folder, move to ./missingItemColumn
                    const destPath = '../rawCSVs/missingItemColumn/'
                    const from = `${dirPath}${fileName}`
                    const to = `${destPath}${fileName}`
                    await fileFolderService.stageFilesForProcessing(from, to)
                }

                if (!institution.country) {

                    // Missing Country

                    const dirPath = '../rawCSVs/' // remove file from above folder, move to ./missingCountry
                    const destPath = '../rawCSVs/missingCountry/'
                    const from = `${dirPath}${fileName}`
                    const to = `${destPath}${fileName}`
                    await fileFolderService.stageFilesForProcessing(from, to)
                }

                if (!institution.avgPriceColumnName ) {

                    // Missing avgPriceColumnName

                    const dirPath = '../rawCSVs/' // remove file from above folder, move to ./missingPriceColumn
                    const destPath = '../rawCSVs/missingPriceColumn/'
                    const from = `${dirPath}${fileName}`
                    const to = `${destPath}${fileName}`
                    await fileFolderService.stageFilesForProcessing(from, to)
                }

                if (institution.removedHeaderRowsForCSV >= 1) {

                    // Has removed header rows // to to a folder for later processing

                    const dirPath = '../rawCSVs/' // remove file from above folder, move to ./hasRemovedHeaderRows
                    const destPath = '../rawCSVs/hasRemovedHeaderRows/'
                    const from = `${dirPath}${fileName}`
                    const to = `${destPath}${fileName}`
                    await fileFolderService.stageFilesForProcessing(from, to)

                }

                res.send('Files..Sorted............')

            } catch (e) {
                console.log(e)
            }

        }


    })
    const data = await testingConvert()
    res.send(data)
})

//----------------END OF------------------Sort files endpoint(s)----------------------END OF--------------------------

//-----------------START---------------Database endpoints-----------------------START----------------------------------
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

function updateDatabase() {
    try {
        sequelize.sync()
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
 * This endpoints should retrieve data from google spreadsheet
 * and populate or update the institutions table with the relevant
 * values from each column
 */
app.get('/api/update/institutions-from-online-spreadsheet', async (req, res) => {

    //res.send('To load data in the institutions database add either','|local|','or','|online|' , 'in the url to load from local spreadsheet or online spreadsheet respectively')

    //process.exit()
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
    //process.exit()
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
 * This endpoints should retrieve data from locally saved
 * spreadsheets and populate or update the institutions table with the relevant
 * values from each column
 */

app.get('/api/update/institutions-from-local-spreadsheet', async (req, res) => {


    // api endpoints need to communicate within the app
    // req data from '/api/data/google-spread-sheets/:id'
    let homeUrl = url.format({
        protocol: req.protocol,
        host: req.get('host'),
    });

    const spreadSheetFileName = 'Hospital Database'
    const dataUrl = `${homeUrl}/api/data/local-xlsl-file/${spreadSheetFileName}.xlsx`


    try {

        await axios.get(dataUrl)
            .then( async (fileData) => {
                //console.log('fileData++++++++++++++++++++++++++++++++++++',await fileData.data)
                _.forEach(await fileData.data[0], row => {


                    //Validate required values before proceeding

                    if (row.rId && row.hospitalName) { // Though every row has rid
                        //console.log('dataStructure logged',row)
                        //console.log('fileData+++++++++++++++++++++++++++++++++END+++++++++++++++++++++++++++++++++')

                        // remove .csv from filename (string)
                        let pattern = /.csv/gi

                        let savedRepoTableName = row.savedRepoTableName
                        savedRepoTableName = savedRepoTableName.replace(pattern, '') // remove .csv

                        // remove spaces at the end and beginning of the filename
                        savedRepoTableName = savedRepoTableName.trim(savedRepoTableName)


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
                            savedRepoTableName,//string
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
                            // if record doesn't exist, create one
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

                            // if record exists update/patch data

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
                                        savedRepoTableName,//string
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

                res.send('...................Saved......Data.................')
            })

    } catch (e) {

        res.send(e)
    }


})

/**
 * Current endpoint for loading csv data to procedures table
 */
app.get('/api/update/load-data-from-local-csv', async (req, res) => {
    //console.log('++++++++++++++END+++file.name+++++END+++++')

    try {

        // api endpoints need to communicate within the app

        let homeUrl = url.format({
            protocol: req.protocol,
            host: req.get('host'),
        });

        // api endPoint to get the file list
        const endPoint = '/api/local-csv-files'
        const dataUrl = `${homeUrl}${endPoint}`


        // Get files ready to process from our rawCSVs folder from the api above

        const files = await fileFolderService.filesReadyToProcess(dataUrl)


        // make a single request per file to read data and write to procedures table

        await _.map(files, async (item, index) => {

            const file = {
                fileNumber: ++index, //add 1 to start counting from 1
                name: item
            }

            // send file.name, for processing
            //console.log(file)

            const csvFileData = await proceduresService.getCsvFileItems(file.name)

            return csvFileData


        })



        res.send(files)


    } catch (e) {

        console.log('Error getting files')
    }


})
//--------------------------End of database endpoints------------------------------------------------------------------


//--------------------------Search endpoints---------------------------------------------------------------------------
/*Endpoint  for searching average price within a radius using
* latitude longitude and range in miles*/
app.get('/averageprice/location', function (req, res) {
    var range = req.query['range'];
    var lon = req.query['lon'];
    var lat = req.query['lat'];

    if (!req.query.range) {
        res.send({error: "Kindly pass the range parameter in the url"});
        return;
    }
    if (!req.query.lon) {
        res.send({error: "Kindly pass the lon parameter in the url"});
        return;
    }
    if (!req.query.lat) {
        res.send({error: "Kindly pass the lat parameter in the url"});
        return;
    }

    sequelize.query('SELECT avg(avgPrice) AS average\n' +
        'FROM ( SELECT avgPrice FROM institutions ' +
        '      INNER JOIN procedures ON institutions.rId = procedures.rId' +
        '          WHERE \n' +
        '          longitude between (:lon-:range/cos(radians(:lat))*69) \n' +
        '          and (:lon+:range/cos(radians(:lat))*69) \n' +
        '          and latitude between (:lat-(:range/69)) \n' +
        '          and (:lat+(:range/69)) \n' +
        '          and  3956 * 2 * \n' +
        '          ASIN(SQRT( POWER(SIN((:lat - institutions.latitude)*pi()/180/2),2)\n' +
        '          +COS(:lat*pi()/180 )*COS(institutions.latitude*pi()/180)\n' +
        '          *POWER(SIN((:lon-institutions.longitude)*pi()/180/2),2))) \n' +
        '           < :range) as average_temp',
        {replacements: {range: range, lon: lon, lat: lat}, type: sequelize.QueryTypes.SELECT}
    ).then(average => {
        if (average[0].average) {
            res.send(average[0])
        } else {
            res.send({response: "No results found"})
        }
    })
});

/*Endpoint  for searching costliest procedure using phrase*/
app.get('/costliestProcedure/containingPhrase', function (req, res) {
    if (!req.query.phrase) {
        res.send({error: "Kindly pass the phrase parameter in the url"});
        return;
    }
    var phrase = req.query['phrase'];
    sequelize.query("SELECT itemName, MAX(price) as price FROM procedures WHERE itemName REGEXP :phrase ",
        {replacements: {phrase: phrase}, type: sequelize.QueryTypes.SELECT}
    ).then(procudure => {
        if (procudure[0].itemName) {
            res.send(procudure[0])
        } else {
            res.send({response: "No results found"})
        }
    });
});

/*Endpoint  for searching cheapest procedure using phrase*/
app.get('/cheapestProcedure/containingPhrase', function (req, res) {
    if (!req.query.phrase) {
        res.send({error: "Kindly pass the phrase parameter in the url"});
        return;
    }
    var phrase = req.query['phrase'];
    sequelize.query("SELECT itemName, MIN(price) as price FROM procedures WHERE itemName REGEXP :phrase ",
        {replacements: {phrase: phrase}, type: sequelize.QueryTypes.SELECT}
    ).then(procudure => {
        if (procudure[0].itemName) {
            res.send(procudure[0])
        } else {
            res.send({response: "No results found"})
        }
    });
});

app.get('/api/available-institutions', async (req, res) => {

    /**
     *Get just the data we are using to process cvs
     */
    const institutions = await institutionsService.getInstitutionsReqData()

    res.send(institutions)
})

/**
 * gets all procedures (100 limit for now) from procedures service
 * and returns
 */

app.get('/api/available-procedures', async (req, res ) => {

    try {

        const procedures = await proceduresService.getProcedureItems()

        res.send(procedures)

    } catch (e) {

        res.send(e)
    }

})

/**
 * to search here got to
 * apphomepage/api/search-procedure/med
 * to get all procedures with the term 'med'
 */

//app.get('/api/search-procedure/:name?sortBy=location', async (req, res ) => {
app.get('/api/search-procedure/:name', async (req, res ) => {

    try {


        const procedures = await proceduresService.getProcedureItems()

        if (req.params.name){

            let searchName = req.params.name

            // filter procedures
            let filtered = procedures.filter(p => p.itemName.toLowerCase().startsWith(searchName.toLowerCase()))

            if (filtered) {

                const data = {
                    message: `Search results for term (${searchName}), = ${filtered.length};  below..`,
                    results: filtered
                }

                await res.send(data)
            }

            if (!filtered) {

                await res.send(`** search results = ${filtered.length},for term (${searchName})  !!!**`)

            }
        }

        /*

        if (!searchName)
            filtered = {
                message: 'Please enter a search name in the url like BREATHING CIRCUIT',
                data: procedures
            }
            res.send(filtered)*/

        /**
         * eg http://localhost:3007/api/search-procedure/x-ray?sortBy=location for
         * x-ray procedure and location
         */
        /*let location = req.query

        if (location)
            res.send(location)
        //res.send(procedures)*/
    } catch (e) {

        res.send(e)
    }

})

//--------------------------End of search endpoints--------------------------------------------------------------------
const port = process.env.PORT || 3007;
//save the server object into a variable
var server = app.listen(port, () => {
    console.log('listening to port....# ', port)
});
//export the server object
module.exports = server;
