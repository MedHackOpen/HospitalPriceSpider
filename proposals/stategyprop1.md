# Proposed solution for CSV/SQL scraping
## The data that will be extracted:
After doing a thorough analysis on the files in the specified folders, I came up with a conclusion about the information that can be
retrieved. So far we can get the following data using only the data from the files.
```json5
{
	"rId":1,
	"itemName": "Whole Body MRI Scan",
	"hospitalId": 2,
	"price": 8229.00,
	"avgPrice": 8229.00,
	"medianPrice": 9000,
	"sampleSize":80,
	"latestPriceDate": "2019-01-31",
	"firstPriceDate": "2019-01-01",
	"changeSinceLastUpdate": 0.23,
	"description": "...",
	"country":"US",
	"currency":"USD"
}
```
## How the information will be extracted from the data
Hospital names will be retrieved from the files. The files will be converted to json
then regex patterns used to related different columns/fields of the files to common json keys then returned as response on a endpoint.

## Recommendations
I noticed JavaScript will be used in implementing the solution. JavaScript is a powerful language and can be used to solve the
problem with ease, however the information being scrapped may be complex and I would recommend Python because of it's powerful string manipulation abilities and many readily available tested libraries
that will process complex data efficiently.

More advanced tool such as TensorFlow can be used regardless of the programming language to train the system to identify procedures, drugs, investigations from the string passed
