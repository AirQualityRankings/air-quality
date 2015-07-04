/**
 * Created by andrewwharton on 4/07/15.
 */

var dataSets = {
  tas: TasmaniaImporter
};

Meteor.methods({
  updateDataSet: function() {
    console.log('clicked!!');
    new TasmaniaImporter().import()
  }
});