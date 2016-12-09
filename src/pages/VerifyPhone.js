import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  StyleSheet,
  View,
  AsyncStorage
} from 'react-native';

import Button from '../components/Button';
import Header from '../components/Header';
import Account from './Account';
import styles from '../styles/common-styles';
import SendVerification from './SendVerification'
import TextField from 'react-native-md-textinput';
import Loading from '../components/Loading';



export default class VerifyPhone extends Component {

  constructor(props){
    super(props);

    this.state = {
      phone_number: '',
      code: '',
      loaded: true
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('phone_number').then( (data) => {
      this.setState({
        phone_number: data
      })
    })
  }
  goToSendVerifcation(){
    this.setState({
      loaded:false
    })
    this.props.navigator.push({
      component: SendVerification
    });
  }
  goToAccount(){
    this.props.navigator.push({
      component: Account
    });
  }
  render(){
    if (!this.state.loaded){
      return (
        <View style={styles.container}>
          <Header text="Signup"/>
          <View style={styles.body}>
          <Loading />
          </View>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Header text="Enter Pin Number" loaded={this.state.loaded} />
        <View style={styles.body}>
          <TextField
            label={'PIN Number'}
            highlightColor={'#1abc9c'}
            dense={true}
            style={styles.textinput}
            onChangeText={(text) => this.setState({code: text})}
            value={this.state.code}
            maxLength={4}
            keyboardType='numeric'
          />
          <Button
            text="Submit"
            onpress={this.checkPin.bind(this)}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text} />
          <Button
            text="Send new PIN"
            onpress={this.goToSendVerifcation.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />
        </View>
      </View>
    );
  }
  checkPin(){
    this.setState({
      loaded: false
    });
    fetch('http://localhost:3000/phone_numbers/' +  this.state.phone_number, {
      method: 'PUT',
      headers: {
        'Authorization': ':',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone_number: this.state.phone_number,
        code: this.state.code
      })
    })
    .then((response) => {
      this.setState({
        loaded: true
      })
      response.json().then( (data) => {
        if (data.verified === true) {
          this.props.navigator.push({
            component: Account
          })
        } else {
          alert('You have entered the wrong PIN')
        }
      })
    })
  }
}

AppRegistry.registerComponent('VerifyPhone', () => VerifyPhone);
