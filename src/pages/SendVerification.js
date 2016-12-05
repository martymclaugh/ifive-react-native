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
import VerifyPhone from './VerifyPhone'
import styles from '../styles/common-styles.js';

export default class SendVerification extends Component {

  constructor(props){
    super(props);

    this.state = {
      phone_number: '',
      userId: '',
      loaded: false
    }
  }
  componentDidMount(){
    this.setState({
      loaded: true
    })
  }
  render(){
    return (
      <View style={styles.container}>
        <Header text="Add Phone Number" loaded={this.state.loaded} />
        <View style={styles.body}>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({phone_number: text})}
            value={this.state.phone_number}
            placeholder={"Phone Number"}
          />
          <Button
            text="Verify via SMS"
            onpress={this.sendVerificationCode.bind(this)}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text} />
        </View>
      </View>
    );
  }

  sendVerificationCode(){
    this.setState({
      loaded: false
    });
    AsyncStorage.setItem('phoneNumber', this.state.phone_number)
    AsyncStorage.multiGet(['token', 'userId']).then( (data) => {
      fetch('http://localhost:3000/phone_numbers', {
        method: 'POST',
        headers: {
          'Authorization': data[0][1],
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone_number: this.state.phone_number,
          user_id: data[1][1]
        })
      }).then( () => {
        alert('Verification PIN sent')
        this.props.navigator.push({
          component: VerifyPhone
        });
      })
    })
  }
}

AppRegistry.registerComponent('SendVerification', () => SendVerification);
