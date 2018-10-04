const theRoutes = require('./routes');

module.exports = function(app, db) {
    theRoutes(app, db)
}