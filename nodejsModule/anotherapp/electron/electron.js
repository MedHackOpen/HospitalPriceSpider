// Since we had issues with reading large streams of data and loosing some to memory
// take advantage of electron event system(api) and see if this solves that

const path = require('path')
const fs = require('fs')
const fsExtra = require('fs-extra')
const _ = require('lodash')
const glob = require('glob')
const moveFile = require('move-file')

const isDev = require('electron-is-dev')

const { app, BrowserWindow, ipcMain } = require('electron')

// services
const CsvFile = require('./Services/FilesAndFolders/CsvFiles')
const csvToJson = require('./Services/DataConversionServices/csvToJson')
const Start = require('./Services/Start/Start')
const RefinedDataBridge = require('./Services/Bridge/RefinedDataBridge')
const InstitutionDbService = require('./Services/Database/InstitutionDbService')

// ALgo names
const Names = require('./Services/Algorithms/Names')


// return matched items if, or the item unmatched
const JsonDataBridge = require('./Services/Algorithms/JsonDataBridge')


let mainWindow = null

function initialize () {
    makeSingleInstance()

    loadListeners()

    function createWindow () {
        const windowOptions = {
            width: 1080,
            minWidth: 680,
            height: 840,
            title: app.getName(),
            webPreferences: {
                nodeIntegration: true
            }
        }

        if (process.platform === 'linux') {
            windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png')
        }

        mainWindow = new BrowserWindow(windowOptions)

        /*mainWindow.loadURL(isDev ?
            'http://localhost:3000/' : // yarn start at localhost
            `file://${path.join(__dirname, '../build/index.html')}` // run yarn build
        )*/
        mainWindow.loadURL('http://localhost:3000/')

        // Custom dev
        if ( isDev ) {
            const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

            installExtension(REACT_DEVELOPER_TOOLS).then((name) => {
                ////console.log(`Added extension: ${name}` );

            }).catch((err) => {
                ////console.log("An error ocurred", err);
                return err
            })
        }

        mainWindow.on('closed', () => {
            mainWindow = null
        })
    }

    app.on('ready', () => {
        createWindow()
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    app.on('activate', () => {
        if (mainWindow === null) {
            createWindow()
        }
    })
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance () {
    //if (process.mas) return

    app.requestSingleInstanceLock()

    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    })
}

// Listen to events from ipcRenderer
function loadListeners () {
    (async () => {
        await csvFilesAndFolders()
        await processJsonItems()
        await moveFilesWithInstructions()
    })()
}

async function getInstitutionByFileName( fileName){

    /*institutions.map(institution => {
        console.log(institution.savedRepoTableName)
    })*/

    let institutions = await InstitutionDbService.getInstitutions() // set institutions

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

// DATA events
// Initial file stages
async function csvFilesAndFolders(){
    ipcMain.on('get-csv', async (event, args) => {
        const { type, data, currentFile } = args //

        if ( type === 'just-the-names') {

            const names = Names.getNames()// Algorithm names
            const dt = {
                type: 'just-the-names',
                names
            }

            event.sender.send('got-csv', dt)
        }

        if( type === 'first-file-in-folder'){


            let csvFile = await CsvFile.getCsvFile()

            if(csvFile) {

                let fileExt = /.csv/i
                let fileName = csvFile.replace(fileExt, '')
                let institutionKeys = {}
                institutionKeys = await getInstitutionByFileName(fileName)

                const names = Names.getNames()// Algorithm names
                const dt = {
                    type: 'new-csv-file',
                    data: csvFile,
                    institutionKeys,
                    names
                }

                event.sender.send('got-csv', dt)
            }
        }

        if( type === 'move-file-for-processing'){ // data === fileName


            const moved = await CsvFile.prepareFileForProcessing(data)

            if( moved ){

               const dt = {
                    type: 'moved-file-for-processing',
                    data: {
                        message: 'file-moved',
                        moved
                    }
                }

                event.sender.send('got-csv', dt)
            }
        }

        // not to be confused with above
        // returns a moved file from and to
        // convert to json here and return
        if( type === 'moved-file-for-processing'){
            const { message, moved } = data
            const {from, to } = moved

            const csvJson = await csvToJson.getJsonFromCsv(to)

            const dt = {
                type: 'json-data-from-csv',
                data: {
                    message: 'Converterd CSV file to json',
                    csvFileName: currentFile,
                    totalItems: csvJson.length
                },

                items: csvJson
            }

            event.sender.send('got-csv', dt)
        }

    })
}

// DATA events
// After csv is converted to json
// call json data on these listeners
async function processJsonItems(){
    ipcMain.on('process-json-items', async (event, args) => {
        const { type, data, currentFile, items, institutionKeys, names, name } = args
        let institutions = await InstitutionDbService.getInstitutions() // set institutions

        //const item = Start.breakJsonItem(items)
        let missed = 0 // count missed
        let recorded = 0 // count recorded items matched by this name file name eg const name = 'ByKeyName' in Algorithms folder
        let countItems = 0


        const { priceKey, procedureKey } = institutionKeys

        if ( type === 'process-json-data-from-csv' ) {

            // @ TODO bugged not working anymore when no file :: check!!
            if (_.isEmpty(items)) event.sender.send('processed-json-items', 'NO_FILE')


            if (!_.isEmpty(items)){


                // institutions from database below
                let itemz = items.filter(dt => dt)


                let dt = {}

                let matched = await Promise.all(
                    itemz.map( async (item, index) => {
                        // send raw item to be refined
                        // check for matching procedure key/value and price key/value

                        // TODO create a bridge here instead
                        // if refined is empty (no price/procedure)
                        // item, pass the next algorithm maybe
                        // and so on until we exhaust ways to
                        // process the item, then move file to
                        // NonProcessed csv(s) folder

                        let dataToRefine = {
                            currentFile,
                            institutions,
                            item,
                            name, // Name
                        }

                        let MatchedItem = await JsonDataBridge.MatchedItems(dataToRefine)

                        const { name: processorName , refined } = MatchedItem

                        const { procedure, price } = JSON.parse(refined)

                        countItems = ++countItems // count items

                        missed = procedure.length === 0 && price.length === 0  ? ++missed : missed

                        recorded = procedure.length >= 1 && price.length >= 1 ? ++recorded : recorded

                        // we can move files here
                        // that had no matching price and procedure values

                        /*console.log(`missed : ${missed}`)
                        console.log(`recorded : ${recorded}`)
                        console.log(`countItems : ${countItems}`)
                        console.log(`procedure : ${procedure}`)
                        console.log(`price : ${price}`)
                        console.log(JSON.parse(refined))
                        console.log(`index : ${index}`)*/

                        // if totalItems === count the finished is FINISHED

                        dt = {
                            type: 'refined-json-data',
                            refined,
                            currentFile,
                            //data: item, // all item
                            missed, // get the highest later
                            recorded, // get the highest later
                            //index, // item index
                            totalItems: items.length,
                            //name,
                            countItems, // get the highest later
                            //items
                        }

                        // post refined to dataBase now TODO

                        // this returns the log item of the file
                        // after passing through where it's data lets
                        // it.....
                        //const logItem = await RefinedDataBridge.handleRefinedItem(dt)
                        //console.log(JSON.stringify(dt))
                        //console.log('|||||||||||||||dt|||||||||||||||||')

                        //console.log(institutionDt)

                        return dt
                    })
                )

                //matched = matched.filter(m => m)
                let totalMissed = 0
                let totalRecorded = 0
                let totalCounted = 0
                let totalItems = 0
                matched.map(item => {
                    // get some items from matched for some logic checks before proceeding to database
                    const { refined, missed: ttMissed, recorded: ttRecorded, totalItems: ttItems, countItems: ttCounted } = item
                    totalMissed = ttMissed
                    totalRecorded = ttRecorded
                    totalCounted = ttCounted
                    totalItems = ttItems
                })


                // if recorded is greater than 30000 will take a while, log to console
                // if non is recorded send to main to select another algorithm
                //let bdLog = index >= 30000 ? '...Loading data to db, might take sometime................' : null
                //console.log('|||||||||||||| TO THE DATA!! |||||||||||||||')
                //console.log(bdLog)


                // make sure all items passed through
                if ( totalCounted === totalItems) {

                    // if non was recorded, return to renderer and get another algorithm by NAME
                    // to use until no more

                    if ( totalRecorded === 0 ) { // if no names // move file to non processed

                        //console.log('********** NON MATCHED ****** CALLING NEXT ALGORITHM*********')
                        // TODO call another algo and trim stuff now
                        //console.log(institutionKeys)

                        if ( priceKey && procedureKey) {

                            // TODO move to a folder of un-matching keys
                            dt = {
                                type: 'no-matched-data-given-keys',
                                subType: 'un-matching-keys-set'
                            }


                            event.sender.send('processed-json-items', dt)
                        }

                        // Below call the next processor on this file until none
                        // is left on the list
                        if ( !priceKey || !procedureKey) {
                            // remove name from names
                            // send names to renderer and call another processor


                            //console.log(`NAME: ${name}`)
                            //console.log(names)

                            let namez = {}

                            //name = _.filter(names, (n, index) => index === 0)
                            namez = _.filter(names, (n, index) => n.name !== 'ByHuman') // remove by human
                            namez = _.filter(namez, (n, index) => n.name !== name) // remove by this name

                            //console.log('************** NAMEZ *******************')
                            //console.log(namez)
                            //console.log(namez.length)
                            //console.log('************** NAMEZ *******************')

                            // still some processors left
                            // call the next one
                            if (namez.length >= 1) {

                                dt = {
                                    type: 'no-matched-by-given-name', // call next by name
                                    names: namez,
                                    items,
                                    institutionKeys
                                }

                                //console.log(dt)
                                //console.log(`totalRecorded : ${totalRecorded}`)
                                //console.log(`totalMissed : ${totalMissed}`)
                                //console.log(`totalCounted : ${totalCounted}`)
                                //console.log(`totalItems : ${totalItems}`)
                                //console.log(dt)

                                event.sender.send('processed-json-items', dt)
                            }

                            // No more processor left, move file and call another file
                            if (namez.length < 1) {

                                    dt = {
                                        type: 'last-named-processor', // no values
                                    }

                                    //console.log(dt)
                                    //console.log('|||||||||||||||||LAST||||||||||||||||')

                                    event.sender.send('processed-json-items', dt)
                                }
                            }

                        // remove name from names and pass on to renderer to update states
                    }


                    if (totalRecorded >= 1) {

                        let data = {
                            refined: matched,
                            names,
                            name,
                            totalMissed,
                            totalRecorded,
                            totalCounted,
                            totalItems,
                            currentFile,
                            items
                        }


                        // post refined to dataBase now TODO

                        // this returns the log item of the file
                        // after passing through where it's data lets
                        // it.....

                        const logItem = await RefinedDataBridge.handleRefinedItem(data)

                        console.log(matched)
                        console.log('||||||||||| DONE +++ logItem |||||||')


                        if (logItem) {

                            const { log } = logItem
                            const { created } = log

                            await CsvFile.moveDoneFile(created)


                            dt = {
                                type: 'log-data-object',
                                created
                            }

                            event.sender.send('processed-json-items', dt)
                        }
                    }
                }



            }

        }


    })
}

// move file that don't get to the logs table
async function moveFilesWithInstructions() {
    ipcMain.on('move-current-file', async (event, args) => {
        const { type, instructions , currentFile } = args //

        if ( type === 'move-non-processed-file') {

            let from = path.join(__dirname, '../../../rawCSVs/FilesBeingSorted', currentFile)
            let to = path.join(__dirname, '../../../rawCSVs/NonProcessed/HumanError', currentFile)

            await CsvFile.moveCurrentFile(from, to)

            //to = instructions === ''
            //console.log(currentFile)

            //event.sender.send('got-csv', dt)
        }

        if ( type === 'move-non-processed-by-algos') {

            let from = path.join(__dirname, '../../../rawCSVs/FilesBeingSorted', currentFile)
            let to = path.join(__dirname, '../../../rawCSVs/NonProcessed', currentFile)

            await CsvFile.moveCurrentFile(from, to)

            //to = instructions === ''
            //console.log(currentFile)

            //event.sender.send('got-csv', dt)
        }


    })
}

initialize()
