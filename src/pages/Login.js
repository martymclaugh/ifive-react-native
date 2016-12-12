import React, { Component } from 'react';
import {
  View,
  AsyncStorage
} from 'react-native';

import Button from '../components/Button';
import Header from '../components/Header';
import SendVerification from './SendVerification'
import Signup from './Signup';
import Account from './Account';
import styles from '../styles/common-styles.js';
import TextField from 'react-native-md-textinput';
import Loading from '../components/Loading';
var Friends = require('react-native-contacts');


export default class Login extends Component {

  constructor(props){
    super(props);

    this.state = {
      token: '',
      phone_number: '',
      password: '',
      badLogin: null,
      device_token: '',
      loaded: true
    }
  }
  submitCredentials(user){
    if (user.phone_number !== undefined && user.password !== undefined) {
      this.login({
        phone_number: user.phone_number,
        password: user.password
      }, () => {
        this.setState({ badLogin: true });
      });
    }
  }

  login(user, callback){

    this.setState({
      loaded: false
    });
    fetch('https://ifive.herokuapp.com/v1/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone_number: this.state.phone_number,
        device_token: this.state.device_token,
        password: this.state.password
      })
    })
    .then((response) => {
      this.setState({
        loaded: true
      })
      if (response.status >= 200 && response.status < 300) {
        response.json().then((data) => {
          AsyncStorage.multiSet([
            ['token', data[0].access_token],
            ['userId', data[0].id.toString()],
            ['phone_number', data[1].phone_number]
          ])
          Friends.getAll((err, friends) => {
            if(err && err.type === 'permissionDenied'){
              alert('If you want to send Fives we need your contacts!')
            } else {
              AsyncStorage.setItem('contacts', JSON.stringify(friends))
            }
          })
          if(data[1].verified !== true){
            this.props.navigator.push({
              component: SendVerification
            });
          } else {
            this.props.navigator.push({
              component: Account
            });
          }
        })
      } else {
        alert('Login Failed. Please try again.')
      }
    })
  }

  goToSignup(){
    this.setState({
      loaded:false
    })
    this.props.navigator.push({
      component: Signup
    });
  }
  componentWillMount(){
    AsyncStorage.getItem('device_token').then( (data) => {
      this.setState({
        device_token: data
      })
    })
  }
  render(){
    if (!this.state.loaded){
      return (
        <View style={styles.container}>
          <Header text="Login"/>
          <View style={styles.body}>
          <Loading />
          </View>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Header text="Login" loaded={this.state.loaded} />
        <View style={styles.body}>
          <TextField
            label={'Phone Number'}
            highlightColor={'#1abc9c'}
            dense={true}
            style={styles.textinput}
            onChangeText={(text) => this.setState({phone_number: text})}
            value={this.state.phone_number}
            maxLength={10}
            keyboardType='numeric'
          />
          <TextField
            label={'Password'}
            highlightColor={'#1abc9c'}
            dense={true}
            style={styles.textinput}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
          />
          <Button
            text="Login"
            onpress={this.login.bind(this)}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text} />

          <Button
            text="New here?"
            onpress={this.goToSignup.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />
        </View>
      </View>
    );
  }
}
