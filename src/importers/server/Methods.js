/**
 * Created by andrewwharton on 4/07/15.
 */

Meteor.methods({
  updateDataSet: function() {
    console.log('clicked!!');
    new TasmaniaImporter().import()
  }
  //currentBest: function() {
  //  return DatumRepository.find()
  //}
});