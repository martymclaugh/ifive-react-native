import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  StyleSheet,
  View,
  AsyncStorage,
  Image
} from 'react-native';

import Button from '../components/Button';
import Header from '../components/Header';
import Login from './Login';
import styles from '../styles/common-styles.js';
import Contacts from './Contacts';

export default class Account extends Component {

  constructor(props){

    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      loaded: false
    }

  }


  componentWillMount(){
    console.log("here");
    AsyncStorage.multiGet(['token', 'userId', 'phone_number']).then( (data) => {
      fetch('http://localhost:3000/users/' + data[1][1], {
        method: 'GET',
        headers: {
          'Authorization': data[0][1],
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then( (response) => {
        if (response.status >= 200 && response.status < 300) {
          response.json().then((data) => {
            this.setState({
              loaded: true,
              first_name: data[0]['first_name'],
              last_name: data[0]['last_name'],
              email: data[0]['email'],
              phone_number: data[1]['phone_number']
            })
          })
        } else {
          alert('Login Failed. Please try again.')
        }
      })
    })
  }
  render(){

    return (
      <View style={styles.container}>
      <Header text="Account" loaded={this.state.loaded} />
        <View style={styles.body}>
            <View style={styles.body}>
              <View style={page_styles.email_container}>
                <Text>{this.state.first_name} {this.state.last_name}</Text>
                <Text>{this.state.email}</Text>
                <Text>{this.state.phone_number}</Text>
              </View>
              <Button
                  text="Logout"
                  onpress={this.logout.bind(this)}
                  button_styles={styles.primary_button}
                  button_text_styles={styles.primary_button_text} />
              <Button
                  text="Send High Fives"
                  onpress={this.goToContacts.bind(this)}
                  button_styles={styles.transparent_button}
                  button_text_styles={styles.transparent_button_text} />
            </View>
        </View>
      </View>
    );
  }
  goToContacts(){
    this.props.navigator.push({
      component: Contacts
    });
  }
  logout(){
    AsyncStorage.multiRemove(['userId', 'token', 'phone_number']).then(() => {
      // insert ajax call to delete session
      this.props.navigator.push({
        component: Login
      });
    });

  }

}

const page_styles = StyleSheet.create({
  email_container: {
    padding: 20
  },
  email_text: {
    fontSize: 18
  }
});
