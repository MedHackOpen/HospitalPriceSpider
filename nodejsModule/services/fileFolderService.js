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
        //console.log(csvFileData.length);
        // map data items below and create a new item
        let $alldata = [];
        const newItem = _.map(request.data, (item, index) => {
            // array values now contain procedure and price ,decide which
            let rawItem = Object.values(item);
            let header = Object.keys(item);

            if(header.length==1){
                var $c = /[,]/.test(header[0]);
                if( $c ){
                    var $hobj = header[0].split(',');
                }
            }

            if(rawItem.length==1){
                var $d = /[,]/.test(rawItem[0]);
                if( $d ) {
                    var $hobjct = header[0].split(',');
                    var $dobj = rawItem[0].split(',');
                    console.log($hobjct);
                    //GET PRICE COL INDEX
                    priceCheck($hobjct);
                    let $counter=0;
                    let $t = [];
                    $dobj.forEach(($v,$i)=>{
                        //console.log($v);
                        /*
                        isPrice($v)
                        if(isPrice($v)) {
                            let $x = $v.replace(/[^0-9\.]+/g, '');
                            $t['price'+$counter]=$x;
                        }
                        if(isItemName($v)){
                            $t['service'+$counter]=$v;
                        }
                        $counter++;
                        */
                    });
                    /**/
                    //console.log($t);
                    $alldata.push($t);
                }
            }
            else{

                console.log("File not processed");
                console.log(header);
                /**
                let $counter=0;
                let $t = [];
                rawItem.forEach(($v,$i)=>{
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
                **/
                //$alldata.push($t);
            }
            // TODO check if item contains both procedure and price before returning, discard anything else
        });
        //console.log($alldata)
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

function priceCheck($colList){
    var $indexId = 0;
    $colList.forEach(($a,$b)=>{
        //console.log($a);
        var $searchstring =new RegExp("price|charge$|chg$|amount$|amnt$|^amt$|fee|cost|payment/");
        var $c = $searchstring.test($col);
        if($c){
            console.log($col);
            // console.log($c);
        }
     });

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