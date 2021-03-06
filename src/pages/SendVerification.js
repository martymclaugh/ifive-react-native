import React, { Component } from 'react';
import {
  View,
  AsyncStorage
} from 'react-native';

import Button from '../components/Button';
import Header from '../components/Header';
import VerifyPhone from './VerifyPhone'
import styles from '../styles/common-styles.js';
import TextField from 'react-native-md-textinput';
import Loading from '../components/Loading';



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
        <Header text="Add Phone Number" loaded={this.state.loaded} />
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
    AsyncStorage.setItem('phone_number', this.state.phone_number)
    AsyncStorage.multiGet(['token', 'userId']).then( (data) => {
      fetch('https://ifive.herokuapp.com/phone_numbers', {
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
