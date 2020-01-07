import React, {Component} from 'react'
import _ from 'lodash'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'

import ProgressMessage from "./Components/ProgressMessage";
import JsonItem from "./Components/JsonItem";
import RefinedItem from "./Components/RefinedItem";
import Spinner from "./Components/Spinner";
import Log from "./Components/Log";

const { ipcRenderer } = window.require('electron')

class App extends Component {
    state = {
        csvFiles: {},
        currentProcess: 'None at the moment......',
        message: {},
        currentFile: {},
        totalItems: 0,
        csvData: {},
        procedureData: {},
        jsonItem: {},
        refinedItem: {},
        log: {}
    }

    sendArgsToMain = (args) => {
        const { csvFiles, currentFile, csvData, procedureData, log, message }  = this.state
        const { type, data, items } = args

        if (type === 'new-csv-file'){


            let dt = {
                type: 'move-file-for-processing',
                data
            }

            ipcRenderer.send('get-csv', dt)
        }

        if (type === 'moved-file-for-processing') {

            let dt = {
                type: 'moved-file-for-processing',
                currentFile,
                data,
            }

            ipcRenderer.send('get-csv', dt)
        }

        if (type === 'json-data-from-csv') {

            let dt = {
                type: 'json-data-from-csv', // send data to algorithm now
                currentFile,
                data,
                items
            }

            ipcRenderer.send('process-json-items', dt)
        }

    }

    //Loads data from back-end
    setData = () => {

        const { csvFiles, currentFile, csvData, procedureData, log }  = this.state
        // using the above states
        // and events to our rescue, we can now call each process in order

        // request data
        let dt = {
            type: 'just-listen',
            data: {}
        }
        //ipcRenderer.send('get-csv', dt)
        ipcRenderer.on('got-csv', (event, args) => {

            const { type, data, items } = args

            if (type === 'new-csv-file'){
                this.setState({
                    currentFile: data,
                    currentProcess: 'Got new file (in csv folder)......',
                })

                this.sendArgsToMain(args)

            }

            if ( type === 'moved-file-for-processing'){

                this.setState({
                    message: data,
                    currentProcess: 'File ready to process......',
                })
                this.sendArgsToMain(args)
            }

            if ( type === 'json-data-from-csv'){

                this.setState({
                    message: data,
                    totalItems: items.length,
                    currentProcess: 'Working on Json data......',
                })

                this.sendArgsToMain(args)
            }
        })

        ipcRenderer.on('processed-json-items', (event, args) => {
            const { type, data, index, totalItems } = args

            if( args === 'NO_FILE'){
                this.setState({
                    currentProcess: '       NO MORE FILES IN FOLDER !!!!!!!!!!!',
                })
            }

            if ( type === 'raw-json-data'){
                this.setState({
                    jsonItem: {
                        currentFile,
                        itemIndex: index
                    }
                })

                // Call algorithm from here

                //this.sendArgsToMain(args)

            }

            if ( type === 'log-data-object'){
                 const { created } = args

                console.log('|||||||||| LOG DATA  ||||||||||||||||')
                console.log(created)
                console.log('|||||||||| LOG DATA  ||||||||||||||||')


                this.setState({
                    log: created,
                    currentProcess: 'Ready to load a new file......',
                })

                setTimeout(() => {
                    this.setState({
                        csvFiles: {},
                        currentProcess: 'None at the moment......',
                        message: {},
                        currentFile: {},
                        totalItems: 0,
                        csvData: {},
                        procedureData: {},
                        jsonItem: {},
                        refinedItem: {},
                        log: {}
                    })

                    let dt = {
                        type: 'first-file-in-folder',
                        data: {}
                    }

                    ipcRenderer.send('get-csv', dt)
                },1400)

            }
        })

    }

    componentDidMount() {
        this.setData()
        const { csvFiles, currentFile, csvData, procedureData, log }  = this.state
    }

    // Reset data
    componentWillUnmount() {
        this.setState({
            csvFiles: {},
            currentFile: {},
            totalItems: 0,
            csvData: {},
            procedureData: {},
            log: {},
            jsonItem: {},
            refinedItem: {},
            message: {},
        })
    }

    renderCurrentProcess = () => {
        const { currentProcess }  = this.state

        return (
            <div className="m-2 p-3 bg-info">
                <div className="m-2 p-2">currentProcess : {currentProcess}</div>
            </div>
        )


    }


    renderCurrentFile = () => {
        const { currentFile }  = this.state

        if(!_.isEmpty(currentFile)){
            return (
                <div className="m-2">
                    <div className="m-2 p-2">currentFile : {currentFile}</div>
                </div>
            )
        } else return null


    }

    renderCsvFiles = () => {
        const { csvFiles }  = this.state

        if(!_.isEmpty(csvFiles)){
            return (
                <div className="m-2">
                    <div className="m-2 p-2">csvFiles : {csvFiles}</div>
                </div>
            )
        } else return null


    }

    renderCsvData = () => {
        const { csvData }  = this.state

        if(!_.isEmpty(csvData)){
            return (
                <div className="m-2">
                    <div className="m-2 p-2">csvData : {csvData}</div>
                </div>
            )
        } else return null


    }

    renderProcedureData = () => {
        const { procedureData }  = this.state

        if(!_.isEmpty(procedureData)){
            return (
                <div className="m-2">
                    <div className="m-2 p-2">procedureData : {/*procedureData*/}</div>
                </div>
            )
        } else return null


    }

    renderLog = () => {
        const { log }  = this.state

        if(!_.isEmpty(log)){
            return (
                <div className="m-2">
                    <div className="m-2 p-2">log : {/*log*/}</div>
                </div>
            )
        } else return null


    }

    handleInit = () => {

        this.setState({
            csvFiles: {},
            currentProcess: 'None at the moment......',
            message: {},
            currentFile: {},
            totalItems: 0,
            csvData: {},
            procedureData: {},
            jsonItem: {},
            refinedItem: {},
            log: {}
        })

        let dt = {
            type: 'first-file-in-folder',
            data: {}
        }

        ipcRenderer.send('get-csv', dt)

    }

    render() {

        const {
            csvFiles,
            currentFile,
            totalItems,
            csvData,
            procedureData,
            log,
            message,
            jsonItem,
            refinedItem,
        }  = this.state

        return (
            <div className="container-fluid text-center m-4 p-3">
                <h4>Hello MedHack Tm</h4>
                <hr/>
                <div className="row text-center">
                    <small>Make sure your database is set before clicking below please...</small>
                    <button
                        onClick={this.handleInit}
                        className="btn btn-primary m-3 p-2"
                    >
                        Process csv files

                    </button>
                </div>
                <div className="shadow-lg">
                    {/*<ProgressMessage
                        message={message}
                    />*/}
                    <Log
                        log={log}
                    />
                    {this.renderCurrentProcess()}
                    {this.renderCurrentFile()}
                    {this.renderCsvFiles()}
                    {this.renderCsvData()}
                    {this.renderProcedureData()}
                    {this.renderLog()}
                    <Spinner
                        currentFile={currentFile}
                        totalItems={totalItems}
                    />
                    <div className="row">
                        <JsonItem
                            jsonItem={jsonItem}
                        />
                        <RefinedItem
                            refinedItem={refinedItem}
                        />

                    </div>
                </div>
            </div>
        );
    }
}

export default App;
