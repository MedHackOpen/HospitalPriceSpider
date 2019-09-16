# MedHack Hospital Spider Node.js Module

## This directory contains the node module with utitlity functions for parsing and converting data in this repo as well as raw hospital pricing records into the appropriate, standardized format

Folder and file structure
`./services` contains helper modules to help convert formats or fetch data to feed to the api (index.js)

`./reactui` might contain a react app that consumes our endpoint for easier and better visualization during development
paginations.....

`index.js` contains our api endpoints

`package.json` defines our dependencies

To test the endpoints you must have node installed.
In the root of this folder, from your favorite cli run `npm install` or `yarn install` to install app dependencies defined in package.json.
After that run `node index.js` to start the dev server (express js) configured to run on port 3007 during development ie `http://localhost:3007/`

###Below are the endpoints to test
##### homepage url = http://localhost:3007

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
 end point = `/api/data/google-spread-sheets/:id`.
 
 For developers see .nodejsModule/index.js in root dir for endpoint and maybe helpful comments