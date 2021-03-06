var Datastore = require('nedb')
  , db = new Datastore({ filename: './datafile', autoload: true });

  module.exports = {db};