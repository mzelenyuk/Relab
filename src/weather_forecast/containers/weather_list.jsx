import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Chart from '../components/chart';
import CityMap from '../components/city_map';

class WeatherList extends Component {
  renderWeather(cityData) {
    if (!cityData) { return }

    const city = cityData.city;
    const temperatures = _.map(cityData.list.map(weather => weather.main.temp), (temp) => temp - 273);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidity = cityData.list.map(weather => weather.main.humidity);
    const {lon, lat} = cityData.city.coord;

    return (
      <TableRow key={city.id}>
        <TableRowColumn>
          <CityMap lon={lon} lat={lat}/>
        </TableRowColumn>
        <TableRowColumn>
          <Chart data={temperatures} color="#ff5722" units="C"/>
        </TableRowColumn>
        <TableRowColumn>
          <Chart data={pressures} color="#cddc39" units="hPa"/>
        </TableRowColumn>
        <TableRowColumn>
          <Chart data={humidity} color="#2196f3" units="%"/>
        </TableRowColumn>
      </TableRow>
    );
  }

  render() {
    return (
      <Paper zDepth={4} className="cities-table">
        <Table fixedHeader={true} selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>City</TableHeaderColumn>
              <TableHeaderColumn>Temperature (C)</TableHeaderColumn>
              <TableHeaderColumn>Pressure (hPa)</TableHeaderColumn>
              <TableHeaderColumn>Humidity (%)</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover={true}>
            {this.props.weather.map(this.renderWeather)}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

function mapStateToProps({weather}) {
  return {weather};
}

export default connect(mapStateToProps)(WeatherList);
