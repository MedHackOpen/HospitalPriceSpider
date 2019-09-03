# MedHack Hospital Price Spider

### Making public hospital pricing data *actually* machine-readable and uniform, because the hospitals are developing all kinds of tricks to complicate, evade and mislead around the topic of pricing.

Since hospitals do now release their pricing data in a standardized format, this repo seeks to provide javascript universal conversion functions, as well as raw data of hospital pricing spreadsheets/Word Docs/other formats that contain medical records. The reason this repo contains the data is because pricing data changes, as well as the format that hospitals release the data.

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
	"changeSinceLastUpdate": .23,
	"description": "...",
	"relatedItemsFromOthers": [10,15],
	"relatedItemsFromThisLocation": [3,4],
	"itemsRequiredForThis": [45, 72],
	"keywords": ["mri, "scan", "niobium"],
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


## Contributions 

We welcome pull requests, issues, and other contributions. This README could use a lot of work, as well as the converter code to get to our shared goal of making the world a better place. Please send pull requests to the `develop` repo.

## Contact

hello@medhack.info

