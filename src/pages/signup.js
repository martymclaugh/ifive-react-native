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

import Firebase from 'firebase';

let app = new Firebase("ifive-b8771.firebaseapp.com");

import styles from '../styles/common-styles.js';

export default class signup extends Component {
  constructor(props){
    super(props);

    this.state = {
      loaded: true,
      email: '',
      password: ''
    };
  }

  signup(){

    this.setState({
      laded: false
    });

    app.createUser({
      'email': this.state.email,
      'password': this.state.password
    }, (error, userData) => {
      if(error){
        switch(error.code){

          case "EMAIL_TAKEN":
            alert("The new user account cannot be created because the email is already in use.");
          break;
          case "INVALID_EMAIL":
            alert("The specified email is not a valid email.");
          break;
          default:
            alert("Error creating user:");
        }
      } else {
        alert('Your account was created!')
      }

      this.setState({
        email: '',
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
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholder={"Email Address"}
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
