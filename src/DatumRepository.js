/**
 * Created by andrewwharton on 4/07/15.
 */

DatumSchema = new SimpleSchema({
  dateTime: {
    type: Date
  },
  stationID: {
    type: String
  },
  dataSetID: {
    type: String
  },
  pm2_5: {
    type: Number,
    optional: true
  },
  pm10: {
    type: Number,
    optional: true
  }
});

DatumRepository = new Mongo.Collection("measurement-data");
DatumRepository.attachSchema(DatumSchema);