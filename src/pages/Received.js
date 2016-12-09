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
import Button from '../components/Button';
import Account from './Account';


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
  goToAccount(){
    this.setState({
      loaded: false
    })
    this.props.navigator.push({
      component: Account
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
        <Button
          text="Back"
          style={styles.high_five_back}
          onpress={this.goToAccount.bind(this)}
          button_styles={styles.transparent_button}
          button_text_styles={styles.transparent_button_text} />
        <HighFiveList list={this.state.received} type={'giver'}/>
      </ScrollView>
    );
  }
}
