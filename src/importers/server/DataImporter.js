/**
 * Responsible for co-ordinating the import of data into the mongo collection
 * Abstracts the parsing of the data by accepting a parser function as an argument
 * that can normalise the data into the format to be inserted in the datastore
 *
 * @param {string} data - The data to import
 * @constructor
 */
DataImporter = function(data) {

  /**
   * Imports the data in to the datastore using the given parser/transformation function
   *
   * @param {function} parser - A parser that can transform the data into a standardised format
   */

  this.import = function(parser) {
    var normalisedData = parser(data);
    assert.isList(normalisedData);

    // Insert each of the measurements into the database
    var ids = _(normalisedData).collect(function(data) {
      DatumRepository.insert(data)
    });

    return ids

  }

};