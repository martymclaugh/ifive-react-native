import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import styles from '../styles/common-styles.js';

export default class HighFiveItem extends Component {
  componentWillMount(){
  }
  timeLapse(millisec) {
       var seconds = Math.ceil((millisec / 1000).toFixed(1));
       var minutes = Math.ceil((millisec / (1000 * 60)).toFixed(1));
       var hours = Math.ceil((millisec / (1000 * 60 * 60)).toFixed(1));
       var days = Math.ceil((millisec / (1000 * 60 * 60 * 24)).toFixed(1));
       if (seconds < 60) {
           return seconds + " seconds ago";
       } else if (minutes < 60) {
           return minutes + " minutes ago";
       } else if (hours < 24) {
           return hours + " hours ago";
       } else {
           return days + " days ago";
       }
   }
  parseDateTime(dateInput){
    let date = new Date(dateInput)
    let now = new Date()
    let milliseconds = Math.floor(Math.abs(date - now))
    return this.timeLapse(milliseconds)
  }
  render(){
    return (
      <View style={styles.contact_item}>
        <Text style={styles.contact_text}>{this.parseDateTime(this.props.date)}</Text>
        <Text style={styles.contact_text}>{this.props.name}</Text>
      </View>
    );
  }
}
