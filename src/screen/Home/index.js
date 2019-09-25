import React, {Component} from 'react';

import {Image, View} from 'react-native';
import {
  Container,
  Content,
  Footer,
  Button,
  Text,
  FooterTab,
  Icon,
  Picker,
  Form,
  Item,
} from 'native-base';

import {styles} from './HomeStyleSheet';

export default class Home extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    selectedStateValue: '',
    selectedCityValue: '',
    country: {
      name: '',
      states: [],
      city: [],
    },
  };
  componentDidMount() {
    fetch('http://locationsng-api.herokuapp.com/api/v1/states')
      .then(data => {
        return data.json();
      })
      .then(states => {
        this.setState({country: {name: 'Nigeria', states}});
      });
  }

  changeSelectedValue = value => {
    this.setState({selectedStateValue: value});
    fetch(`http://locationsng-api.herokuapp.com/api/v1/states/${value}/details`)
      .then(data => {
        return data.json();
      })
      .then(cities => {
        this.setState({country: {...this.state.country, city: cities.lgas}});
      });
  };

  changeSelectedCityValue = value => {
    this.setState({selectedCityValue: value});
  };

  renderStateInput = () => {
    const {
      country: {states},
    } = this.state;

    const statesLists =
      states &&
      states.map(state => {
        return (
          <Picker.Item label={state.name} value={state.name} key={state.name} />
        );
      });
    return (
      <Form>
        <Item picker>
          <Picker
            mode="dropdown"
            iosHeader="Select your State"
            iosIcon={<Icon name="arrow-down" />}
            style={styles.picker}
            selectedValue={this.state.selectedStateValue}
            onValueChange={this.changeSelectedValue}
            placeholder="Select your State">
            {statesLists}
          </Picker>
        </Item>
      </Form>
    );
  };

  renderCityInput = () => {
    const {
      country: {city},
    } = this.state;
    const cityLists =
      city &&
      city.map(cities => {
        return <Picker.Item label={cities} value={cities} key={cities} />;
      });
    return (
      <Form>
        <Item>
          <Picker
            mode="dropdown"
            iosHeader="Select your City"
            iosIcon={<Icon name="arrow-down" />}
            style={styles.pickerCity}
            selectedValue={this.state.selectedCityValue}
            onValueChange={this.changeSelectedCityValue}
            placeholder="Select your City">
            {cityLists}
          </Picker>
        </Item>
      </Form>
    );
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container>
        <Content>
          <View style={styles.reportPage}>
            <Image
              source={require('../../../assets/chooseLocationImg.png')}
              style={styles.imgSize}
            />
          </View>
          <View style={styles.location}>
            <Text style={styles.alignTextCenter}>Choose Location</Text>
            <Item>
              <Text style={styles.inputLabel}>State</Text>
              {this.renderStateInput()}
            </Item>
            <Item>
              <Text style={styles.inputLabel}>City</Text>
              {this.renderCityInput()}
            </Item>
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button
              full
              onPress={() =>
                navigate('Report', {
                  selectedvalue: {
                    stateSelected: this.state.selectedStateValue,
                    citySelected: this.state.selectedCityValue,
                  },
                })
              }
              style={styles.nextBtn}>
              <Text style={styles.textStyle}>Next</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
