/**
 * Created by andrewwharton on 4/07/15.
 */
Meteor.publish("measurement-data", function () {
  return DatumRepository.find();
});