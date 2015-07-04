/**
 * Created by andrewwharton on 4/07/15.
 */
Meteor.setInterval(function() {
  new TasmaniaImporter().import()
}, 5*60*1000);



