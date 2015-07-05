/**
 * Created by andrewwharton on 5/07/15.
 */
TableRow = React.createClass({
  render: function() {
    var datum = this.props.datum;
    return <tr>
      <td>{datum.stationId}</td>
      <td>{datum.dateTime.toString()}</td>
      <td>{datum.pm2_5}</td>
    </tr>
  }
});