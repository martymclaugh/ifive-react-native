import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

export default class ContactItem extends Component {

  render(){
    return (
      <View key={this.props.phone_number}>
        <Text>{this.props.first_name} {this.props.last_name}</Text>
        <Text>{this.props.phone_number}</Text>
      </View>
    );
  }
}
