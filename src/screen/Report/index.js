import React, {Component, Fragment} from 'react';
import {styles} from './ReportStyleSheet';

import {Image, View, Text} from 'react-native';

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

    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${
        selectedvalue.citySelected
      },ng&appid=182a7a3fa380dc5efe7e62fb6fbbf390`,
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
  render() {
    return (
      <Fragment>
        <View>
          <Text>I DEY HERE WELLA</Text>
        </View>
      </Fragment>
    );
  }
}
