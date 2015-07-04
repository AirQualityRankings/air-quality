/**
 * Created by andrewwharton on 4/07/15.
 */
TasmaniaImporter = function() {

  const DATASET_SOURCE_URL = "http://epa.tas.gov.au/air/live/epa_tas_latest_particle_data.txt";

  this.import = function() {
    async.waterfall([
      downloadData,
      injestData
    ], function(err, result) {
      if(err) {
        // TODO notify that the datasource is down...
        console.log(JSON.stringify(err))
      } else {
        console.log("Datum successfully added to datastore", result)
      }
    })
  };

  var downloadData = function(next) {
    try {
      HTTP.get(DATASET_SOURCE_URL, next)
    } catch(err) {
      next(err)
    }
  };

  var injestData = function(data, next) {
    try {
      //new DataImporter();
      next()
    } catch(err) {
      next(err)
    }
  };

};