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

      var generatedDateString = rows[1][0].split(":")[1].trim();
      var generatedTimeString = rows[1][1].split(":")[1].trim().replace('.', '');
      var dataRows = rows.slice(9, -1);

      var objectsToAdd = _(dataRows).collect(function(row) {

        var collectedTimeString = row[1].trim();
        var dateTimeString = convertToDateTimeString(generatedDateString, generatedTimeString, collectedTimeString);
        var dataSetID = "AU_TAS";
        var date = new Date(dateTimeString);

        return {
          dataSetId: dataSetID,
          dateTime: date,
          stationId: dataSetID + "-" + row[0].trim(),
          pm2_5: parseFloat(row[2].trim()),
          pm10: parseFloat(row[3].trim()),
          lat: parseFloat(row[4].trim()),
          long: parseFloat(row[5].trim()),
          alt: parseFloat(row[6].trim())
        }

      });
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

    var year = generatedDateString.trim().slice(0,4);
    var month = generatedDateString.trim().slice(4,6);
    var day = generatedDateString.trim().slice(6,8);

    var generatedTime = parseInt(generatedTimeString.trim());
    var collectedTime = parseInt(collectedTimeString.trim());
    console.log(generatedTime, collectedTime);

    if(collectedTime < collectedTime) {
      day = (parseInt(day) - 1).toString(); // TODO what about the first day of the month?
    }
    if(day.length === 1) {
      day = "0" + day; // Hack to fit the date format 03 etc.
    }

    var isoDateString = year + "-" + month + "-" + day;

    var hour = collectedTimeString.slice(0,2);
    var min = collectedTimeString.slice(2,4);
    var sec = collectedTimeString.slice(4,6);
    var isoTimeString = hour + ":" + min + ":" + sec + "+10:00";

    return isoDateString + "T" + isoTimeString;
  };

};