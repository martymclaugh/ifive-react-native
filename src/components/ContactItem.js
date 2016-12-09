import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import styles from '../styles/common-styles.js';
import HighFiveButton from './HighFiveButton'

export default class ContactItem extends Component {

  render(){
    return (
      <View style={styles.contact_item}>
        <Text style={styles.contact_text}>{this.props.first_name} {this.props.last_name}</Text>
        <Text style={styles.contact_text}> {this.props.phone_number}</Text>
        <HighFiveButton
          style={styles.high_five_button}
          onpress={this.props.onpress}
          />
      </View>
    );
  }
}
