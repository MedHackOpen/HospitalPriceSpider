'use strict'
// Creates and queries Logs related data/item(s)

// Database/Models
const Logs = require('../../../../database/models').Logs

async function createNewLogEntry(args){

    try {

        let newLog = Logs.build(args)

        let created = await newLog.save()

        created = created.dataValues

        let item = {
            created,
        }

        return item


    } catch (e) {

        return e
    }
}

function getLogs(){
    try {

        return Logs.findAll({
            attributes: [
                'recorded', 'missed', 'filename', 'processedBy', 'procedureKey',
                'priceKey', 'rId', 'totalItems', 'hospitalName', 'comment'
            ],
            raw: true
        })

    } catch (e) {

        return e
    }
}

module.exports = {
    createNewLogEntry,
    getLogs
}