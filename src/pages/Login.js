import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  StyleSheet,
  View,
  AsyncStorage
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';

import Signup from './signup';
import Account from './account';

import styles from '../styles/common-styles.js';

export default class Login extends Component {

  constructor(props){
    super(props);

    this.state = {
      phone_number: '',
      password: '',
      loaded: true
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <Header text="Login" loaded={this.state.loaded} />
        <View style={styles.body}>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({phone_number: text})}
            value={this.state.email}
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

  login(){

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
        alert('You have logged in!')
        AsyncStorage.setItem('user_data', JSON.stringify(response));
        const value = AsyncStorage.getItem('user_data');
        if (value !== null){
          // We have data!!
          alert(JSON.stringify(value))
        }
        this.props.navigator.push({
          component: Account
        });
      } else {
        alert('Login Failed. Please try again.')
        // alert(JSON.stringify(response))
      }
    })
    // set session state with ajax call
    // app.authWithPassword({
    //   "email": this.state.email,
    //   "password": this.state.password
    // }, (error, user_data) => {
    //

    //   if(error){
    //     alert('Login Failed. Please try again');
    //   }else{
    //   }
    // });


  }

  goToSignup(){
    this.props.navigator.push({
      component: Signup
    });
  }

}

AppRegistry.registerComponent('login', () => login);
