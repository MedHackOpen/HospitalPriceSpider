'use strict'

const axios = require('axios')
const moveFile = require('move-file')
const _ = require('lodash')

/**
 * @param from
 * @param to
 * given full path names with filename plus extensions, from the folder to move in relation
 * to the folder where this function is called from, to the destination folder
 * from = where file is located
 * to = destination folder and filename to move to
 * example from = '../../rawCSVs/source/file_to_move.txt'
 *         to = '../../rawCSVs/destination/file_to_move.txt'
 *
 *         and make sure the file exists in the source (from) folder
 */
async function stageFilesForProcessing(from, to) {

    try {

        const files = await moveFile(from, to)

        if (files) {

            console.log('file has been moved', files)
            return files
        }
        //console.log('file has been moved')

    } catch (e) {
        //console.log(e)
        return e
    }

}


/**
 * @param dataUrl
 *
 * Given a url endpoint within our app, should return an
 * object list of available files to process
 * in ./rawCSVs folder
 */
async function filesReadyToProcess(dataUrl) {
    try {
        const request = await axios.get(dataUrl)

        if (request) {
            //console.log('Requestinging files_____|||__|||||_____',request.data)
            return request.data
        }


    } catch (e) {

        return e
    }
}

/**
 * @param homeUrl
 * @param fileName
 */
async function processCsvFile(homeUrl, fileName) {
    try {

        // const dataUrl = our epi endPoint the returns json data given a fileName(csv) + .ext
        const dataUrl = `${homeUrl}/api/csvdata/${fileName}`

        /**
         * data from a local csv file given its name
         */

        const request = await axios.get(dataUrl)

        // currently during testing we're getting data
        // from the two files in a rawCSVs folder

        const csvFileData = request.data

        //console.log(request.data)
        //console.log('request.data fileName == ',fileName)

        // map data items below and create a new item
        let $alldata = [];
        const newItem = _.map(request.data, (item, index) => {

            // array values now contain procedure and price ,decide which
            let rawItem = Object.values(item);

            let $counter=0;
            let $t = [];
            rawItem.forEach(($v,$i)=>{
                //console.log($v);
                isPrice($v)
                if(isPrice($v)) {
                    let $x = $v.replace(/[^0-9\.]+/g, '');
                    $t['price'+$counter]=$x;
                }
                if(isItemName($v)){
                    $t['service'+$counter]=$v;
                }
                $counter++;
            });
            //console.log($t);
            // TODO check if item contains both procedure and price before returning, discard anything else
            $alldata.push($t);
            /**/
            console.log('++++++++++++++++++++++');

        });

        console.log($alldata)


        return $alldata;
        //return csvFileData

    } catch (e) {
        return e
    }
}

/**
 * Check if column has price information using RegEx
 *
 * @param $col
 * @returns {boolean}
 */
function isPrice($col){
    let rgx = /^[^a-zA-Z]+$/;
    let $t = $col.match(rgx);
    if($t === null){
        let rgx2 = /[\$]/;
        let $tt = $col.match(rgx2);
        if($tt === null){
            return false
        }
        else{
            return true;
        }
    }
    else{
        return true;
    }
}

/**
 * Check if column has service/procedure information using RegEx
 *
 * @param $col
 * @returns {boolean}
 */
function isItemName($col){
    let rgx = /^[^\$]+$/;
    let $t = $col.match(rgx);
    if($t === null){
        return false
    }
    else{
        return true;
    }
}

module.exports = {
    stageFilesForProcessing,
    filesReadyToProcess,
    processCsvFile,
}