#This file should be ignored at the moment, was left  here for references, if you're here because you're lost please check the readme.md in the root of this project folder and also the readme in nodejsModule folder

#File contains steps and choices made in each

##Stage 1: Convert csv to json
##Stage 2
##Stage 3
##Stage 4: Load via endpoint list of local spreadsheets in a folder, as well as google spreadsheet to json

#Stage 1
I needed to atleast present some data to a browser, so I opted for
express js, to help me convert csv data to json, I used the library
csvtojson `https://www.npmjs.com/package/csvtojson` which is well 
maintained, instead of writing my own; read file functions which would
take alot of the project time, not to mention the bugs that comes with
such. I trust csvtojson is a good choice for this mission.

###Project setup
Added files/folders
+ package.json 
+ index.js // our express server file
+ ./services/csvToJson.js // module that converts csv to json given file path
+ ./services/spreadsheetToJson.js // 
+ ./services/spreadsheetGoogleApi.js // 

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
 
 ##Stage 2
 Clone this repo, cd into that directory, run `yarn install` or `npm install`,
 and after that run node index.js to start server on `http://localhost:3007/`.
 Go to `http://localhost:3007/api/csv-files` to access all csv files in
 our folder.
 Go to `http://localhost:3007/api/csvdata/availableFileName.csv` eg
 `http://localhost:3007/api/csvdata/hospital_Baton-Rouge-General-Medical-Center.csv`
 to view the content to each file in json.
 You many copy each of the names displayed on the list on `http://localhost:3007
 /api/csv-files` and add to `http://localhost:3007/api/csvdata/TheCopiedFileNamePlus.Extension`
 to test.
 
 ##Stage 3
 
 ##Stage 4 
 So far, I have added scripts to convert csv to json, and spreadsheet to json.
 To test, clone this repo and cd to the dir, run `yarn install` or `npm install` to install
 the required libraries.
 Then run `node index.js` to start the local server at port `http://localhost:3007`.
 The endpoint are(with the post current)
 
 1. `http://localhost:3007/api/data/local-spread-sheets`
 Lists all spreadsheets available in the local folder
 
 2.`http://localhost:3007/api/data/local-xlsl-file/{filename.xlsx}`
 Displays the content of the spreadsheet in json format, remember a valid
 name that is available in the local folder, for ideas see 
 `http://localhost:3007/api/data/local-spread-sheets`
 
 3. To avoid repetition, please refer to stage2 and 1 to know the other api
 endpoint and what the return.
 
 ## Added two api endpoints
 To be able to use the 2nd one though, you will have to configure google drive services
 and obtain the required credentials.See steps below
 
 4. 
 (i). `http://localhost:3007/api/data/google-spread-sheets`, lists all available sheets by id
 might load from a database or config, currently returns fake dummy data
 
 ####Configure google api
 . Head to `https://console.developers.google.com`
 . Create an app and enable google drive api and make sure to get the credentials
 . On Add credentials to your project, the CONTINUE button downloads a file to your computer
 . copy file to our project root dir and rename it to `client_secret.json`
 . In our client_secret.json file there's `client_email` key, copy its value and share
 your spreadsheets in your google drive with this email. Each spreadsheet you share can 
 be retrieved by another application given the right permissions(authenticate/authorize)
 . To test, see below
 
 (ii). `http://localhost:3007/api/data/google-spread-sheets/{speadsheet id }`
  eg `http://localhost:3007/api/data/google-spread-sheets/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`
  
  returns data from google drive api services if spreadsheet and id and credentials are
  well configured (check app dir client_secret.json, client_email: 'Value to share')
  
 