// Since we had issues with reading large streams of data and loosing some to memory
// take advantage of electron event system(api) and see if this solves that

const path = require('path')
const fs = require('fs')
const fsExtra = require('fs-extra')
const glob = require('glob')
const moveFile = require('move-file')

const isDev = require('electron-is-dev')

const { app, BrowserWindow, ipcMain } = require('electron')

// services
const CsvFile = require('./Services/FilesAndFolders/CsvFiles')
const csvToJson = require('./Services/DataConversionServices/csvToJson')
const Start = require('./Services/Start/Start')
const RefinedDataBridge = require('./Services/Bridge/RefinedDataBridge')

//Algorithm service
const ByKeyName = require('./Services/Algorithms/ByKeyName')


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

        mainWindow.loadURL(isDev ?
            'http://localhost:3000/' : // yarn start at localhost
            `file://${path.join(__dirname, '../build/index.html')}` // run yarn build
        )

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
    })()
}

// DATA events
// Initial file stages
async function csvFilesAndFolders(){
    ipcMain.on('get-csv', async (event, args) => {
        const { type, data, currentFile } = args

        if( type === 'first-file-in-folder'){

            let csvFile = await CsvFile.getCsvFile()
            const dt = {
                type: 'new-csv-file',
                data: csvFile
            }
            event.sender.send('got-csv', dt)
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
        const { type, data, currentFile, items } = args



        //const item = Start.breakJsonItem(items)

        let itemz = items.filter(dt => dt)

        let dt = {}

        itemz.map((item, index) => {

            // send raw item to be refined
            // check for matching procedure key/value and price key/value

            // TODO create a bridge here instead
            // if refined is empty (no price/procedure)
            // item, pass the next algorithm maybe
            // and so on until we exhaust ways to
            // process the item, then move file to
            // NonProcessed csv(s) folder
            let refined = ByKeyName.matchValues(item)

            // we can move files here
            // that had no matching price and procedure values

            dt = {
                type: 'raw-json-data',
                refined,
                currentFile,
                data: item, // all item
                index, // item index
                totalItems: items.length
            }

            // post refined to dataBase now TODO

            RefinedDataBridge.handleRefinedItem(dt).then((refined) => {

                console.log(refined)
                console.log('=================refined=====================')
            })

            //event.sender.send('processed-json-items', dt)

        })
    })
}

initialize()
