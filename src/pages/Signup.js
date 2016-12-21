import React, { Component } from 'react';
import {
  AsyncStorage,
  View,
  ScrollView,
  PushNotificationIOS
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '../components/Button';
import Header from '../components/Header';
import SendVerification from './SendVerification';
import Login from './Login'
import styles from '../styles/common-styles';
import Loading from '../components/Loading';
import TextField from 'react-native-md-textinput';
import DeviceInfo from 'react-native-device-info'
var Friends = require('react-native-contacts');

export default class Signup extends Component {
  constructor(props){
    super(props);

    this.state = {
      password: '',
      first_name: '',
      last_name: '',
      email: '',
      device_token: '',
      loaded: false
    };
  }
  isSimulator() {
    return DeviceInfo.getModel()==="Simulator";
  }
  goToLogin(){
    this.setState({
      loaded:false
    })
    this.props.navigator.push({
      component: Login
    });
  }

  signup(){
    this.setState({
      loaded: false
    })
    fetch('https://ifive.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        device_token: this.state.device_token,
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
      password: '',
      first_name: '',
      last_name: '',
      email: '',
      loaded: true
    });
  }
  componentWillMount(){
    Friends.getAll((err, friends) => {
      if(err && err.type === 'permissionDenied'){
        alert('If you want to send Fives we need your contacts!')
      } else {
        AsyncStorage.setItem('contacts', JSON.stringify(friends))
      }
    })
  }
  componentDidMount(){
    if (!this.isSimulator.bind(this)){
      PushNotificationIOS.addEventListener("notification", function(notification){
      });
      PushNotificationIOS.requestPermissions();
      PushNotificationIOS.addEventListener('register', function(device_token){
        AsyncStorage.setItem('device_token', device_token)
        this.setState({
          device_token: device_token,
          loaded: true
        })
      });
    } else {
      this.setState({
        loaded: true
      })
    }
  }

  render() {
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
      <KeyboardAwareScrollView style={styles.mainContainer}>
        <Header text="Signup" loaded={this.state.loaded} />
        <View style={styles.body}>
          <TextField
            label={'First Name'}
            highlightColor={'#1abc9c'}
            dense={true}
            style={styles.textinput}
            onChangeText={(text) => this.setState({first_name: text})}
            value={this.state.first_name}
          />
          <TextField
            label={'Last Name'}
            highlightColor={'#1abc9c'}
            dense={true}
            style={styles.textinput}
            onChangeText={(text) => this.setState({last_name: text})}
            value={this.state.last_name}
          />
          <TextField
            label={'Email'}
            highlightColor={'#1abc9c'}
            dense={true}
            style={styles.textinput}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
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
          <TextField
            label={'Password Confirmation'}
            highlightColor={'#1abc9c'}
            dense={true}
            style={styles.textinput}
            onChangeText={(text) => this.setState({password_confirmation: text})}
            value={this.state.password_confirmation}
            secureTextEntry={true}
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
      </KeyboardAwareScrollView>
    )
  }
}
