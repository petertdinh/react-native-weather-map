import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, MapView } from 'react-native';
import fetchWeather from './src/fetchWeather';
import _ from 'lodash';

class weather extends Component {
  constructor(props) {
    super(props);
    this.state = { pins: null, city: '', temperature: '', description: '' };
  }

  componentDidMount() {
    console.log('hello world');
  }

  onRegionChangeComplete = (region) => {
    const { latitude, longitude } = region;
    this.setState({
      pins: [{latitude, longitude}]
    });

    fetchWeather(latitude, longitude)
      .then((data) => {
        this.setState(data);
      });
  }

  render() {

    return(
      <View style={styles.container}>
        <MapView 
          annotations={this.state.pins}
          onRegionChangeComplete={this.onRegionChangeComplete}
          style={styles.map}>
        </MapView>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{this.state.city}</Text>
          <Text style={styles.text}>{this.state.temperature}</Text>
          <Text style={styles.text}>{_.capitalize(this.state.description)}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 2,
    marginTop: 30
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('weather', () => weather);
