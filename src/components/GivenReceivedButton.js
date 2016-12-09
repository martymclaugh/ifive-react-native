import React, { Component } from 'react';
import {
  TouchableHighlight,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HighFiveButton extends Component {

  render(){
    return (
      <View>
        <TouchableHighlight underlayColor={"#E8E8E8"} onPress={this.props.onpress}>
          <View>
              <Text style={this.props.style}><Icon name="hand-paper-o" size={20} color="black" />  {this.props.text}: {this.props.number}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
