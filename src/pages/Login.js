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
import SendVerification from './SendVerification'
import Signup from './Signup';
import Account from './Account';
import styles from '../styles/common-styles.js';

export default class Login extends Component {

  constructor(props){
    super(props);

    this.state = {
      token: '',
      phone_number: '',
      password: '',
      badLogin: null,
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
    fetch('http://localhost:3000/v1/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone_number: this.state.phone_number,
        password: this.state.password
      })
    })
    .then((response) => {
      this.setState({
        loaded: true
      })
      if (response.status >= 200 && response.status < 300) {
        response.json().then((data) => {
          alert('You have logged in!')
          AsyncStorage.multiSet([
            ['token', data[0].access_token],
            ['userId', data[0].id.toString()]
          ]);
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
    this.props.navigator.push({
      component: Signup
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <Header text="Login" loaded={this.state.loaded} />
        <View style={styles.body}>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({phone_number: text})}
            value={this.state.phone_number}
            placeholder={"Phone Number"}
          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password"}
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
