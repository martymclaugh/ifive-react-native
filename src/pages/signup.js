import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';

import Login from './login';

import styles from '../styles/common-styles.js';

export default class Signup extends Component {
  constructor(props){
    super(props);

    this.state = {
      loaded: true,
      phone_number: '',
      password: ''
    };
  }

  signup(){

    this.setState({
      laded: false
    });

    app.createUser({
      'phone_number': this.state.phone_number,
      'password': this.state.password
    }, (error, userData) => {
      if(error){
        switch(error.code){

          case "EMAIL_TAKEN":
            alert("The new user account cannot be created because the Phone Number is already in use.");
          break;
          case "INVALID_EMAIL":
            alert("The specified Phone Number is not a valid Phone Number.");
          break;
          default:
            alert("Error creating user:");
        }
      } else {
        alert('Your account was created!')
      }

      this.setState({
        phone_number: '',
        password: '',
        loaded: true
      });

    });

  }

  goToLogin(){
    this.props.navigator.push({
      component: Login
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header text="Signup" loaded={this.state.loaded} />
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
            text="Signup"
            onpress={this.signup.bind(this)}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text} />

          <Button
            text="Got an Account?"
            onpress={this.goToLogin.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />
        </View>
      </View>
    )
  }
}

AppRegistry.registerComponent('signup', () => signup);
