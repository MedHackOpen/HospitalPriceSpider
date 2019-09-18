### This readme describes how to use/test/maybe improve endpoint `/api/update/google-spreadsheets-hospital-services`

####So far
NOTE:: our app is configured to run on `http://localhost:3007/` during development

1.Have nodejs installed

2.Have mysql running check ./database/config/config.json for environment configs, and edit to fit your own

3.Create a database with the name defined in config.json above

4.From this folder, to test and see the logs you can run `node index.js` after you have installed the required libs defined in package.json

5.Go to `/api/update-script` to create the tables required by our models.(make sure to have a database already as defined in step 2)

6. `/api/update/google-spreadsheets-hospital-services` endpoint now creates or updates the database rows as per rId

7.To help and contribute to this task see `index.js` in this folder on line 250..The fields need matching