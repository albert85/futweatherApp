import React, {Component, Fragment} from 'react';
import {Image, View, Text} from 'react-native';
import {Container, Content, Card, CardItem} from 'native-base';
import moment from 'moment';

import {styles} from './ReportStyleSheet';

export default class Report extends Component {
  state = {
    weatherReport: [],
    code: 0,
    isLoading: true,
    city: {},
  };

  componentDidMount() {
    const {
      state: {
        params: {selectedvalue},
      },
    } = this.props.navigation;

    const selectedcityvalue = selectedvalue.citySelected.split(' ');
    const cityvalue = selectedcityvalue[0];

    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${cityvalue},ng&appid=182a7a3fa380dc5efe7e62fb6fbbf390`,
    )
      .then(data => {
        return data.json();
      })
      .then(cities => {
        const unOrderList =
          cities.list &&
          cities.list.map(res => {
            const new_date = res.dt_txt.split(' ');
            return {...res, dt_txt: new_date[0]};
          });

        // get the first days weather report
        const day = [];

        const filteredList =
          unOrderList &&
          unOrderList.filter(res => {
            if (day.includes(res.dt_txt)) {
              return;
            }
            day.push(res.dt_txt);
            return res;
          });
        this.setState({
          city: selectedvalue,
          weatherReport: filteredList,
          code: cities.cod,
          isLoading: false,
        });
      });
  }
  getWeatherIcon = weatherIcon => {
    switch (weatherIcon) {
      case 'Thunderstorm':
        return require('../../../assets/thunderstorm.png');
      case 'Clouds':
        return require('../../../assets/cloudy.png');
      case 'Rain':
        return require('../../../assets/rainy.png');
      case 'Clear':
        return require('../../../assets/sunny.png');
      default:
        return require('../../../assets/cloud-outline.png');
    }
  };

  renderWeatherList = () => {
    const forecastfilter = this.state.weatherReport;
    const weatherForcast = forecastfilter.map((forcast, index) => {
      return this.renderWeatherCard(forcast, index);
    });
    return weatherForcast;
  };

  renderWeatherCard = (report, index) => {
    const weatherIcon = report && this.getWeatherIcon(report.weather[0].main);
    return (
      <Card key={index}>
        {report && (
          <CardItem cardBody>
            <Image source={weatherIcon} style={styles.WeatherImg} />
          </CardItem>
        )}
        <CardItem style={styles.CardContentLayoutthird}>
          <Text style={styles.CardContentLayout}>
            <Text style={styles.BoldText}>Day: </Text>
            {moment(report.dt_txt).format('dddd')}
          </Text>
          <Text>
            <Text style={styles.BoldText}>Temp(F): </Text>
            {report.main.temp}
          </Text>
        </CardItem>
        <CardItem style={styles.CardContentLayoutthird}>
          <Text style={styles.CardContentLayoutsecond}>
            <Text style={styles.BoldText}>Date: </Text>
            {report.dt_txt}
          </Text>
          <Text>
            <Text style={styles.BoldText}>Status: </Text>
            {report.weather[0].main}
          </Text>
        </CardItem>
      </Card>
    );
  };

  render() {
    return (
      <Container style={styles.ReportLayout}>
        <Content>
          <Text>I DEY HERE WELLA</Text>
          {this.renderWeatherList()}
        </Content>
      </Container>
    );
  }
}
