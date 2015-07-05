/**
 * Created by andrewwharton on 4/07/15.
 */
DatumSchema = new SimpleSchema({
  dataSetId: {
    type: String,
    index: 1
  },
  dateTime: {
    type: Date,
    index: 1
  },
  stationId: {
    type: String,
    index: 1
  },
  pm2_5: {
    type: Number,
    optional: true,
    decimal: true,
    index: 1
  },
  pm10: {
    type: Number,
    optional: true,
    decimal: true,
    index: 1
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