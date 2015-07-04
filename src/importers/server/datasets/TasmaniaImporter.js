/**
 * Created by andrewwharton on 4/07/15.
 */
TasmaniaImporter = function() {

  const DATASET_SOURCE_URL = "http://epa.tas.gov.au/air/live/epa_tas_latest_particle_data.txt";

  this.import = function() {
    console.log('updating dataset');

    async.waterfall([
      Meteor.bindEnvironment(downloadData),
      Meteor.bindEnvironment(processData),
      Meteor.bindEnvironment(ingestData)
    ], function(err, result) {
      if(err) {
        // TODO notify that the datasource is down...
        console.log('error response', err)
      } else {
        console.log("Datum successfully added to datastore", result)
      }
    })
  };

  var downloadData = function(next) {
    console.log('downloading data');
    try {
      HTTP.get(DATASET_SOURCE_URL, next);
    } catch(err) {
      next(err)
    }
  };

  var processData = function(data, next) {

    try {
      var rows = Baby.parse(data.content).data;

      // TODO check for already imported data

      var generatedDateString = rows[1][0].split(":")[1].trim();
      var generatedTimeString = rows[1][1].split(":")[1].trim().replace('.', '');

      console.log(generatedTimeString);
      var dataRows = rows.slice(9, -1);

      var objectsToAdd = _(dataRows).collect(function(row) {

        var collectedTimeString = row[1].trim();
        var dateTimeString = convertToDateTimeString(generatedDateString, generatedTimeString, collectedTimeString);
        var dataSetID = "AU_TAS";

        return {
          dataSetId: dataSetID,
          dateTime: new Date(dateTimeString),
          stationId: dataSetID + "-" + row[0].trim(),
          pm2_5: parseFloat(row[2].trim()),
          pm10: parseFloat(row[3].trim()),
          lat: parseFloat(row[4].trim()),
          long: parseFloat(row[5].trim()),
          alt: parseFloat(row[6].trim())
        }

      });
      console.log(objectsToAdd);
      next(null, objectsToAdd)
    } catch(err) {
      next(err)
    }
  };

  var ingestData = function(data, next) {
    try {
      new DataImporter(data).import(next)
    } catch(err) {
      next(err)
    }
  };

  /**
   * Helper function to convert the non-standard date strings to
   * TODO handle edge case where the 'file generated' date it next day and data collection time is previous day
   * (there is a 10 min or so window where this can happen)
   *
   * @param {string} generatedDateString
   * @param generatedTimeString
   * @param collectedTimeString
   */
  var convertToDateTimeString = function(generatedDateString, generatedTimeString, collectedTimeString) {

    var year = generatedDateString.slice(0,4);
    var month = generatedDateString.slice(4,6);
    var day = generatedDateString.slice(6,8);
    var collectedHour = parseInt(collectedTimeString.split(0, 2));
    var generatedHour = parseInt(generatedTimeString.split(0,2));

    if(generatedHour < collectedHour) {
      day = (parseInt(day) - 1).toString()
    }

    var isoDateString = year + "-" + month + "-" + day;

    var hour = collectedTimeString.slice(0,2);
    var min = collectedTimeString.slice(2,4);
    var sec = collectedTimeString.slice(4,6);
    var isoTimeString = hour + ":" + min + ":" + sec + "+10:00";

    return isoDateString + "T" + isoTimeString;
  };

};