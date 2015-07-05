
MyComponent = ReactMeteor.createClass({

  templateName: "MyComponent",
  mixins: [ReactMeteor.Mixin],
  startMeteorSubscriptions: function() {
    Meteor.subscribe("measurement-data");
  },
  getMeteorState: function() {
    return {
      dataCount: DatumRepository.find().count()
    };
  },

  fetchData: function(event) {
    Meteor.call('updateDataSet')
  },

  render: function() {
    return <div>
             <p>Data points collected: {this.state.dataCount}</p>
             <button onClick={this.fetchData}>Fetch Data</button>
           </div>;
  }
});

//var HelloMessage = React.createClass({
//  displayName: "HelloMessage",
//  mixins: [ReactMeteor.Mixin],
//  startMeteorSubscriptions: function() {
//    Meteor.subscribe("measurement-data");
//  },
//  getMeteorState: function() {
//    return {
//      dataCount: DatumRepository.find().count()
//    };
//  },
//  render: function() {
//
//  }
//});