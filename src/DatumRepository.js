/**
 * Created by andrewwharton on 4/07/15.
 */
DatumSchema = new SimpleSchema({
  dataSetId: {
    type: String
  },
  dateTime: {
    type: Date
  },
  stationId: {
    type: String
  },
  pm2_5: {
    type: Number,
    optional: true,
    decimal: true
  },
  pm10: {
    type: Number,
    optional: true,
    decimal: true
  },
  lat: {
    type: Number,
    optional: true,
    decimal: true
  },
  long: {
    type: Number,
    optional: true,
    decimal: true
  },
  alt: {
    type: Number,
    optional: true,
    decimal: true
  }
});

DatumRepository = new Mongo.Collection("measurement-data");
DatumRepository.attachSchema(DatumSchema);