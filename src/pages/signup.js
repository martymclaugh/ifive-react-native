import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  AsyncStorage,
  View
} from 'react-native';

import Button from '../components/Button';
import Header from '../components/Header';
import SendVerification from './SendVerification';
import Login from './Login'
import styles from '../styles/common-styles';

export default class Signup extends Component {
  constructor(props){
    super(props);

    this.state = {
      phone_number: '',
      password: '',
      first_name: '',
      last_name: '',
      email: '',
      loaded: true
    };
  }
  goToLogin(){
    this.props.navigator.push({
      component: Login
    });
  }

  signup(){
    this.setState({
      loaded: false
    })
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone_number: this.state.phone_number,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation
      })
    })
    .then((response) => {
      this.setState({
        loaded: true
      })
      if (response.status >= 200 && response.status < 300) {
        response.json().then( (data) => {
          AsyncStorage.multiSet([
            ['token', data.access_token],
            ['userId', data.user_id.toString()]
          ]);
        })
        alert('Account Created!')
        this.props.navigator.push({
          component: SendVerification
        });
      } else {
        alert('Signup Failed. Please try again.')
      }
    })
    this.setState({
      phone_number: '',
      password: '',
      first_name: '',
      last_name: '',
      email: '',
      loaded: true
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
            onChangeText={(text) => this.setState({first_name: text})}
            value={this.state.first_name}
            placeholder={"First Name"}
          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({last_name: text})}
            value={this.state.last_name}
            placeholder={"Last Name"}
          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholder={"Email"}
          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password"}
          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({password_confirmation: text})}
            value={this.state.password_confirmation}
            secureTextEntry={true}
            placeholder={"Password Confirmation"}
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

AppRegistry.registerComponent('Signup', () => Signup);
