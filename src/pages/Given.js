import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  AsyncStorage
} from 'react-native';
import styles from '../styles/common-styles.js';
import Header from '../components/Header.js'
import HighFiveItem from '../components/HighFiveItem'

export default class Given extends Component {
  constructor(props){

    super(props);
    this.state = {
      loaded: false,
      given: []
    }
  }
  componentWillMount(){
    AsyncStorage.getItem('given').then( (data) => {
      console.log(data);
      this.setState({
        given: JSON.parse(data)
      })
    })
  }
  render(){
    return (
      <View style={styles.container}>
        <Header text='Given' />
        <View style={styles.body}>
          {this.state.given.map( (highFive) => {
              console.log(this.state);
            return(
              <HighFiveItem
                name={highFive.receiver_name}
                phoneNumber={highFive.receiver_phone_number}
                />
            )
          })}
        </View>
      </View>
    );
  }
}
