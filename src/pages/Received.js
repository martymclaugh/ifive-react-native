import React, { Component } from 'react';
import {
  ScrollView,
  View,
  AsyncStorage
} from 'react-native';
import styles from '../styles/common-styles.js';
import Header from '../components/Header.js';
import HighFiveItem from '../components/HighFiveItem';
import HighFiveList from '../components/HighFiveList';
import Loading from '../components/Loading';


export default class Received extends Component {
  constructor(props){

    super(props);
    this.state = {
      loaded: false,
      received: []
    }
  }
  componentWillMount(){
    AsyncStorage.getItem('received').then( (data) => {
      this.setState({
        received: JSON.parse(data)
      })
    })
  }
  componentDidMount(){
    this.setState({
      loaded: true
    })
  }
  render(){
    if (!this.state.loaded){
      return (
        <View style={styles.container}>
          <Header text="Fives Received"/>
          <View style={styles.body}>
          <Loading />
          </View>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <Header text='Fives Received' />
        <HighFiveList list={this.state.given} />
      </ScrollView>
    );
  }
}
