# MedHack Hospital Price Spider

CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Testing
 * The Idea
 * Folder Structure
 * Contributing
 * Contact


INTRODUCTION
------------
Making public hospital pricing data *actually* machine-readable and uniform, because the hospitals are 
developing all kinds of tricks to complicate, evade and mislead around the topic of pricing.


TESTING
-------

###To test on live server head to the below endpoints and what to get

General EndPoints
-----------------

* [http://api.medhackopen.com](http://api.medhackopen.com) Our app homepage

* [http://api.medhackopen.com/api/available-institutions](http://api.medhackopen.com/api/available-institutions) to view available institutions

* [http://api.medhackopen.com/api/available-procedures](http://api.medhackopen.com/api/available-procedures) to view available procedures (limit 100 currently)

Search Endpoints
----------------

* [http://api.medhackopen.com/api/search-procedure/:name](http://api.medhackopen.com/api/search-procedure/:name) to search procedures by name eg med, BREATHING ... 

* [http://api.medhackopen.com/averageprice/location?range=10000&lon=-165.37812474&lat=64.49906305](http://api.medhackopen.com/averageprice/location?range=10000&lon=-165.37812474&lat=64.49906305) // returns average price of institutions
 within a location. range = distance in miles, lon = the longitude, lat = the latitude.
 
* [http://api.medhackopen.com/costliestProcedure/containingPhrase?phrase=lib](http://api.medhackopen.com/costliestProcedure/containingPhrase?phrase=lib) // returns costliest procedure from the database containing a phrase. phrase = name of procedure
  
* [http://api.medhackopen.com/cheapestProcedure/containingPhrase?phrase=lib](http://api.medhackopen.com/cheapestProcedure/containingPhrase?phrase=lib) // returns cheapest procedure from the database containing a phrase. phrase = name of procedure

To run this repo in node js see README.md in ./nodejsModule folder 

THE IDEA
--------
Since hospitals do not release their pricing data in a standardized format (but at least release it now in the US by law), this repo seeks to provide universal conversion functions, as well as raw data of hospital pricing spreadsheets/Word Docs/other formats that contain medical pricing records. The reason this repo contains the data is because pricing data changes (URL locations, content, format, as well as availability).

`This is starting with US data; however, we plan to incorporate pricing for all countries eventually, and as soon as possible. America just happens to have one of the worst systems, so we're starting there.`

If we do a good job, it will be easier to hold the medical industry accountable and introduce interesting new tools like swaps for consumers that could VASTLY lower healthcare costs. This is the first step.

The format we are using at MedHack for procedures, medications, and devices look like this:

```json

{
	"rId":1,
	"itemName": "Whole Body MRI Scan",
	"hospitalId": 2,
	"price": 8229.00,
	"avgPrice": 8229.00,
	"type": "procedure",
	"medianPrice": 9000,
	"sampleSize":80,
	"outpatientAvgPrice": 9200.00,
	"inpatientAvgPrice":9200.00,
	"latestPriceDate": "2019-01-31",
	"firstPriceDate": "2019-01-01",
	"changeSinceLastUpdate": 0.23,
	"description": "...",
	"relatedItemsFromOthers": [10,15],
	"relatedItemsFromThisLocation": [3,4],
	"itemsRequiredForThis": [45, 72],
	"keywords": ["mri", "scan", "niobium"],
	"country":"US",
	"currency":"USD"

}



```

`Required feilds for all are itemName, hospitalId, currency and price.`


For Hospitals/Health Care institutions, example:

```json


{
	"rId": 2,
	"hospitalName": "Massachusetts General Hospital",
	"city":"Boston",
	"region":"MA",
	"country":"US",
	"streetAddress":"",
	"numberLocations":2,
	"ownedBy":"HCABC Example Corp",
	"managedBy": "HCABC Example Corp",
	"keyShareholdersAndPeople":[{"name": "John Doe", "title":"CEO"}],
	"grossRevenueFiscal": 93000039300,
	"annualReportDocs": ["url1", "url2"],
	"website":"https://msgexampleweb.org/",
	"currentPricingUrl": "https://msgexampleweb.org/somelocation/xyz.xsl",
	"itemColumnName": "Description",
	"avgPriceColumnName":"Avg Price",
	"priceSampleSizeColumnName":"Sample Size",
	"medianPricingColumnName":"Median Price",
	"outPatientPriceColumnName": "Outpatient Pricing",
	"inpatientPriceColumnName":"Inpatient Pricing",
	"removedHeaderRowsForCSV":3,
	"longitude": -70.3323,
	"latitude": 45.0003,
	"founded": 1930,
	"type":"hospital",
	"nonProfit":true,
	"communityHospital":false,
	"savedRepoTableName":"hospital_mgh"

}

```


The others are "nice-to-haves" that will make applications built on top of this much easier and will expose inconsistencies that make the medical industry what it is. The in surance companies have this data; however, they will never release it, so it's up to us. Also, this README should probably be rewritten to sound less angry at the medical industry.... Which leads us to contributions.

FOLDER STRUCTURE
----------------

## Folder structure

.`./browserJS` testing stuff

.`./nodejsModule` contains nodejs app(s) to convert file formats and output that data via an api endpoint for others to consume
see the **README.md** in this folder

. `./proposals ` project proposals in readme.md

. `./rawCSVs` contains .csv files to process(Check README.md in)

. `./rawXlsxs` contains .xlsx (spreadsheets) files to process

. `./SQLs` contains .sql files to process (check README.md in )

## Testing endpoints during development

Refer to **README.md** in ./nodejsFolder or wiki documentation [here](https://github.com/MedHackOpen/HospitalPriceSpider/wiki)

## Contributions 

We welcome pull requests, issues, and other contributions. This README could use a lot of work, as well as the converter code to get to our shared goal of making the world a better place. Please send pull requests to the `develop` branch.

## Contact

hello@medhack.info

