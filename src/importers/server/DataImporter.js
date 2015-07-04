/**
 * Responsible for co-ordinating the import of data into the mongo collection
 * Abstracts the parsing of the data by accepting a parser function as an argument
 * that can normalise the data into the format to be inserted in the datastore
 *
 * @param {string} data - The data to import
 * @constructor
 */
DataImporter = function(normalisedData) {

  /**
   * Imports the data in to the datastore using the given parser/transformation function
   *
   * @param {function} callback - A parser that can transform the data into a standardised format
   */
  this.import = function(callback) {
    Meteor.setTimeout(function() {
      importAsync(callback)
    }, 0)
  };

  var importAsync = function(callback) {
    try {
      assert.isArray(normalisedData);

      // Insert each of the measurements into the database
      var ids = _(normalisedData).collect(function(data) {
        console.log('adding data', data);

        var existingEntry = DatumRepository.findOne({
          dataSetID: data.dataSetID,
          dateTime: data.dateTime,
          stationId: data.stationId
        });
        console.log('found', existingEntry);

        if(!existingEntry) {
          console.log('adding to db', data);
          DatumRepository.insert(data)
        }

      });
      callback(null, ids);
    } catch(err) {
      callback(err)
    }
  }

};