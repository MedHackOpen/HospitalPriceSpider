// contains production specific settings/middleware
const helmet = require('helmet')
const compression = require('compression')

/**
 *
 * @param app
 */
module.exports = (app) => {
    app.use(helmet())
    app.use(compression())
}