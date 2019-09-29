# MedHack Hospital Spider Node.js Module

CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Folder Structure
 * Configuration
 * Testing
 * Troubleshooting
 * API Endpoints
 * Contributing

INTRODUCTION
------------
This directory contains the node module with utility functions for parsing and converting data in this repo as well as
raw hospital pricing records into the appropriate, standardized format

FOLDER STRUCTURE
----------------

`./database` (sequelize ORM )contains our database configs and model definitions, seeders and migration folders,

`./services` contains helper modules to help convert formats or fetch data to feed to the api (index.js)

`index.js` contains our api endpoints

`package.json` defines our dependencies

CONFIGURATION
-------------

To test the endpoints you must have node installed.

In the root of this folder, from your favorite cli 
run `npm install` or `yarn install` to install app dependencies defined in package.json.
After that run `node index.js` , `yarn start` or `npm start` to start the dev server (express js) 
configured to run on port 3007 during development ie `http://localhost:3007/`
**NOTE:** Remember to check README_database.md to configure your **database** connections

TESTING
-------
See API ENDPOINTS BELOW


TROUBLESHOOTING
---------------



API ENDPOINTS
-------------
###Below are the endpoints to test
##### homepage url = http://localhost:3007

EndPoint ITEMS
--------

 * Database Endpoints
 * Search Endpoints
 * Files and Files Data Endpoints
 * Test Endpoints

NOTE: During development our app is configured to run at `http://localhost:3007/` you can change that though

Database Endpoints
------------------

.`/api/update-script` updates the database tables with the field structure(s) defined in the models folder

.`/api/update/institutions-from-local-spreadsheet` This endpoint should create new or patch institutions table with data from a locally stored spreadsheet.(in our rawXlsxs folder) NOTE: run this request only once, updating the table on a second request removes some required data(@TODO fix)

. `/api/update/load-data-from-local-csv`, this endpoint should load data from csv files into procedures database see README.md in the rawCSVs folder on how to process the files. To avoid running into database memory error as of current implementation, move 5 files out of the processed folder and run the request, once success, move them elsewhere and get more files(5 or more depending on your database memory) out of the processed folder.

If you prefer to load data from a google spreadsheet, head here ( Config google drive api ) first before going to the below endpoint

.`/api/update/institutions-from-online-spreadsheet`, this endpoint should get data from a google spreadsheet and create or patch the institution table with the related items from the data

Search Endpoints
----------------

.`/averageprice/location?range=10000&lon=-165.37812474&lat=64.49906305` // returns average price of institutions
 within a location. range = distance in miles, lon = the longitude, lat = the latitude.
 
  .`/costliestProcedure/containingPhrase?phrase=lib` // returns costliest procedure from the database containing a phrase. phrase = name of procedure
  
  .`/cheapestProcedure/containingPhrase?phrase=lib` // returns cheapest procedure from the database containing a phrase. phrase = name of procedure
  

Files Endpoints
---------------

*  `/` home

*  `/api/csv-files `// returns all available csv files in ./rawCSVs folder

*   `/api/csvdata/:id`  // given the filename as the param in this request 
returns json data of the csv file name give as the url param

*  `/api/data/local-spread-sheets` // returns all available spreadsheet files in
 the ./rawXlsxs folder
 
*  `/api/data/local-xlsl-file/:id` //given the right name as the param (:id) 
it will return json data of the given file

*  `/api/data/google-spread-sheets` // should list all available spreadsheets 
 to be used with /api/data/google-spread-sheets/:id (where each spreadsheet 
 id should be used with this endpoint)
 
 .`/api/data/google-spread-sheets/:id` // returns data from google drive api 
 services if spreadsheet and id and credentials are well configured (check 
 app dir ./nodejsModule/client_secret.json, client_email: 'Value to share'). 
 This `/api/data/google-spread-sheets` should be the reference to use for
 end point = `/api/data/google-spread-sheets/:id`
To setup your google application to use with this endpoint refer [[HERE|Configure-google-drive-services-to-share-spreadsheets-via-their-api]].
 
 see nodejsModule/index.js in root dir for endpoint and maybe helpful comments

Test Endpoints
--------------
