import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableHighlight,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HighFiveButton extends Component {

  render(){
    return (
      <View style={this.props.style}>
        <TouchableHighlight underlayColor={"#E8E8E8"} onPress={this.props.onpress}>
          <View>
              <Icon name="hand-paper-o" size={20} color="#0485A9" />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

AppRegistry.registerComponent('button', () => button);
