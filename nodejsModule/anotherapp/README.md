            ========================================================
                             WHY THIS FOLDER AND SETUP
            ---------------------------------------------------------
*   Processing a folder with many csv files is hectic especially when files have
huge streams of data, some data is lost to memory, and some files are read
simultaneously before the first one is done with.
*   To leverage nodes event system with ease (`https://nodejs.org/api/events.html`)
I have opted to use electron because of it's well defined events api, that is  built on top
of nodes event (`https://electronjs.org/docs/api/ipc-main`), and react js because
it's easier to update it's (React js) states via events and also call or send data
to electron (back-end) via such events. Thus allowing simultaneous csv file processing.
    Other alternatives are welcome for suggestions and discussions.

            -------------------------------------------------
                                HOW IT WORKS
            -------------------------------------------------

*   In the root of this folder, fire up your favourite cli tool, make sure node is installed,
run `yarn install` OR `npm install` depending on your preferred package manager; to install
project dependencies.

*   After that run `yarn start` OR `npm start` (again depending on your package manager), to
start our render process on `localhost:3000`; this is react js powered, ignore the errors on
the tab that pops up. Open another cli window in the root of this folder and run `yarn electron`
OR `npm electron`, to start our electron process that loads `localhost:3000` as the view page.

*   Before firing up this app, make sure institution table is loaded with the latest data
as this app relies on that, check file name `institutions_latest.sql` in `SQLs` folder

*   Now our app is fired up, click Process csv files button to load csv data into database.
*   If you get an error on the console, click Process csv files button again to load another file.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
