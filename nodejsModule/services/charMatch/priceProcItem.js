'use strict'

const _ = require('lodash')

// contains methods to identify a procedure name and it's
// price give a csv file with such data

async function matchItem (data) {

    try {

        return await _.map(data, (item, index) => {
            // From here probably some assumptions
            // phrases with the word hospital doesn't rep a procedure name
            // any number starting with $ or is equal to or greater than 5 will be treated a price number
            // all numbers that pass the above will be included in the price item array @TODO, do better HERE!!

            //console.log('*****VALUE****',item)

            // Pattern for procedure phrase/name
            // has letters,doesn't end with a number \\ -v\\d+$
            let procedurePattern = /[a-z]/i


            let procedure = item.match(procedurePattern) ? item : null

            // Pattern for price and other price like fields
            // all numbers plus commas, greater than or equal to 5
            //let pricePattern = /[0-9]/

            //let price = item.match(pricePattern) ? item : null
            let price = 10


            if (procedure && price){

                //console.log('*****VALUE****',procedure)
                //console.log(newProcedure,'||||||||||||||||||||||||')
                //price = price.replace(/[^0-9\.]+/g, "") // remove text from price


                const genericData = {
                    procedure,
                    price,
                }

                console.log('*********genericData*********', genericData)

                return genericData

            }
        })




    } catch (e) {

        return e

    }

}
/**
 *
 * @param data
 * given a data item from a csv, this function should determine what among the values represent price
 */
async function csvGenericItem(data) {

    try {


        const generic = await matchItem(data)

        //console.log('*********data*********', generic)
        //console.log('*********data*********', generic)

        return generic

    } catch (e) {

        return e
    }

}


module.exports = {
    csvGenericItem
}