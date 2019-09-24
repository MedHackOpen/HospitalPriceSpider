const parser = require('simple-excel-to-json')


/**
 *
 * Converts Xlsx files to json give path to the file
 */
async function convertXlsxToJson(filePath) {
    try {

        let doc = await parser.parseXls2Json(filePath, { isNested: true })

        return doc
    }
    catch (e) {
        return e
    }

}
 
module.exports = {
    convertXlsxToJson,
}
