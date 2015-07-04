/**
 * Created by andrewwharton on 4/07/15.
 */
Meteor.publish("measurement-data", function () {

  /*
   Return only quotes for the current user
   */
  return DatumRepository.find({});
});