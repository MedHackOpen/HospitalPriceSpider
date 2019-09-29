### This readme describes how to setup your database ready for testing in nodejs

#Step 1 : Setup database config

1.Have nodejs installed

2.Have mysql running check `./database/config/config.json` for environment configs, and edit to fit your own

3.Create a database with the name defined in config.json above (according to environment)

4.From this folder, to test and see the logs you can run `node index.js`, `yarn start` or `npm start` after you have installed the required libs defined in package.json

5.Go to `/api/update-script` to create the tables required by our models.(make sure to have a database already as defined in step 2)

After this, head database endpoints
