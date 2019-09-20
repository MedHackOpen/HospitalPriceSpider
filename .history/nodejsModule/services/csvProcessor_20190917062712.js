const path = require('path');
const fs = require('fs');

module.exports = class CsvProcessor {
    constructor(folderPath) {
        this.$csvPath = folderPath;
    }
    getFileList($csvPath) {
        var $f = fs.readdirSync($csvPath);
        return $f.filter(el => /\.csv$/.test(el));
    }
    getFileHeader($filePath) {
        var $content = fs.readFileSync(this.$csvPath + '\\' + $filePath, 'utf8');
        var $lines = $content.split('\n');
        var $linecount = $lines.length - 1;
        var $midfile = Math.round($linecount / 2, 0);
        var $testline = $lines[$midfile];
        //remove line breaks and split by delimiter (comma)
        var $t = $testline.replace(/(\r\n|\n|\r)/gm, "");
        var $tt = $t.match(/(?:[^\,"]+|"[^"]*")+/g);
        // Get derived column count
        var $colCount = $tt.length;
        // get header row (check the first 10 lines)
        var $counter = 0;
        var $header = null;
        while ($counter < 10) {
            var $headertest = $lines[$counter];
            var $a = $headertest.replace(/(\r\n|\n|\r)/gm, "");
            var $aa = $a.match(/(?:[^\,"]+|"[^"]*")+/g);
            if ($aa !== null && $aa.length === $colCount) {
                //this is it
                //console.log($aa);
                $header = $aa;
                break;
            }
            $counter++;
        }
        //do some cleanup (trim/remove whitespace and special chars)
        return $header;
    }

    cleanUpHeader($header){
        if(typeof $header === 'object'|| typeof $header === 'array'){
            for(let i =0; i < $header.length; i++){
                var $coldata = $header[i];
                // trim to remove white spaces
                var $a = $coldata.trim();
                // change all to lowercase
                var $b = $a.toLowerCase();
                $header[i] = $b;
            }
            return $header;
        }
    }

    colMapping($header){
        var $service = [];
        var $price = [];
        var $currency = [];
        var $hospital = [];
        
        if(typeof $header === 'object'|| typeof $header === 'array'){
            for(let i =0; i < $header.length; i++){
                //Get the Item Name column
                if(this.isItemName($header[i])){
                    $service.push(i);
                }
                // Get the Price column
                if(this.isPrice($header[i])){
                    $price.push(i);
                }
                // Get the Currency column
                if(this.isCurrency($header[i])){
                    $currency.push(i);
                }
                // Get the hospital name
                if(this.isHospitalID($header[i])){
                    $hospital.push(i);
                }
            }
            return $list={
                'itemName':$service,
                'price':$price,
                'currency':$currency,
                'hospitalID':$hospital,
            };
        }
    }

    isItemName($col){
        var $searchstring =new RegExp("/*service|description|desc|srv/");
        return $searchstring.test($col);
    }

    isPrice($col){
        var $searchstring =new RegExp("price|charge$|chg$|amount$|amnt$|^amt$|cost|payment/");
        return $searchstring.test($col);
    }

    isHospitalID($col){
        var $searchstring =new RegExp("name|hospital_name|hospitalname|hospital$");
        var $searchstring2 =new RegExp("facility");
        if($searchstring.test($col)){
            return true;
        }
        else{
            return $searchstring2.test($col);
        }
    }

    isCurrency($col){
        var $searchstring =new RegExp("/[\$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]/");
        return $searchstring.test($col);
    }
}
