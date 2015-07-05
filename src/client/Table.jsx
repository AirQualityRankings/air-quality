/**
 * TasTable
 *
 * @jsx React.DOM
 */
Table = ReactMeteor.createClass({

  templateName: "Table",
  startMeteorSubscriptions: function() {
    Meteor.subscribe("measurement-data");
  },
  getMeteorState: function() {
    return {
      measurements: DatumRepository.find(
        {stationId: "AU_TAS-HT"},
        {
          sort: {
            dateTime: -1
          },
          limit: 10
        })
        .fetch()
    };
  },
  renderTableRow: function(datum) {
    console.log(datum)
    return <TableRow
      key={datum._id}
      datum={datum} />
    //return <tr></tr>
  },
  render: function() {
    console.log('rendering');
    var className = "table";
    return <table className={className}>
        <thead>
          <tr>
            <th>Station ID</th>
            <th>Collection Date</th>
            <th>PM 2.5 (ug/m3)</th>
          </tr>
        </thead>
        <tbody>{this.state.measurements.map(this.renderTableRow)}</tbody>
      </table>;

  }

});