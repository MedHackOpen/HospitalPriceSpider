### Preview the project so far
run `yarn install` or `npm install` to download and install express and any other
library  defined in the package.json

In the project root dir, run `node index.js` to start express server,

### Endpoints so far NB homepage url = http://localhost:3007
. `/` home

. `/api/csv-files `// returns all available csv files in ./rawCSVs folder

. `/api/csvdata/:id`  // given the filename as the param in this request 
returns json data of the csv file name give as the url param

. `/api/data/local-spread-sheets` // returns all available spreadsheet files in
 the ./rawXlsxs folder
 
. `/api/data/local-xlsl-file/:id` //given the right name as the param (:id) 
it will return json data of the given file

 . `/api/data/google-spread-sheets` // should list all available spreadsheets 
 to be used with /api/data/google-spread-sheets/:id (where each spreadsheet 
 id should be used with this endpoint)
 
 .`/api/data/google-spread-sheets/:id` // returns data from google drive api 
 services if spreadsheet and id and credentials are well configured (check 
 app dir client_secret.json, client_email: 'Value to share'). 
 This `/api/data/google-spread-sheets` should be the reference to use for
 end point = `/api/data/google-spread-sheets/:id`
 
 see index.js in root dir for endpoint and maybe helpful comments