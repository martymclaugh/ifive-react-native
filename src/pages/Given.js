import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  ScrollView,
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
      <ScrollView style={styles.container}>
        <Header text='Given' />
          {this.state.given.map( (highFive) => {
              console.log(highFive);
            return(
              <HighFiveItem
                name={highFive.receiver_name}
                date={highFive.created_at}
                />
            )
          })}
      </ScrollView>
    );
  }
}
