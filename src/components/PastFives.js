import React, { Component } from 'react';
import { View } from 'react-native';
import styles from '../styles/common-styles.js';
import Header from './Header.js'

export default class PastFives extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Header text={this.props.header} />
        <View style={styles.body}>
          <HighFiveItem />
        </View>
      </View>
    );
  }
}
