import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableHighlight,
  Text,
  View
} from 'react-native';
import styles from '../styles/common-styles.js';

export default class HighFiveItem extends Component {
  componentWillMount(){
  }
  render(){
    console.log(this.props);
    return (
      <View style={styles.contact_item}>
        <Text style={styles.contact_text}>{this.props.phoneNumber}</Text>
        <Text style={styles.contact_text}>{this.props.name}</Text>
      </View>
    );
  }
}
