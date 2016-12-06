import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableHighlight,
  Text,
  View
} from 'react-native';
import styles from '../styles/common-styles.js';
import Button from './Button'

export default class ContactItem extends Component {

  render(){
    return (
      <View key={this.props.phone_number} style={styles.contact_item}>

        <Text style={styles.contact_text}>{this.props.first_name} {this.props.last_name}</Text>
        <Button
            text="Send High Five"
            onpress={this.props.onpress}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />
        <Text>{this.props.phone_number}</Text>
      </View>
    );
  }
}
