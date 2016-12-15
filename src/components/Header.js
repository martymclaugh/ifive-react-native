import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import styles from '../styles/common-styles.js';
import Loading from './Loading'

export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <View style={styles.header}>
        <View style={styles.header_item}>
          <Text style={styles.header_text}>{this.props.text}</Text>
        </View>
      </View>
    );
  }
}
