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
    AsyncStorage.multiGet(['token', 'userId']).then( (data) => {
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
              first_name: data['first_name'],
              last_name: data['last_name'],
              email: data['email']
            })
          })
        } else {
          alert('Login Failed. Please try again.')
          // alert(JSON.stringify(response))
        }
      })
    })
  }
  render(){

    return (
      <View style={styles.container}>
      <Text>{this.state.first_name} {this.state.last_name}</Text>
      <Text>{this.state.email}</Text>
        {/* <Header text="Account" loaded={this.state.loaded} />
        <View style={styles.body}>
        {
          this.state.user &&
            <View style={styles.body}>
              <View style={page_styles.email_container}>
                <Text style={page_styles.email_text}>{this.state.user}</Text>
              </View>
              <Image
                style={styles.image}
                source={{uri: this.state.user}}
              />
              <Button
                  text="Logout"
                  onpress={this.logout.bind(this)}
                  button_styles={styles.primary_button}
                  button_text_styles={styles.primary_button_text} />
            </View>
        }
        </View> */}
      </View>
    );
  }

  logout(){

    AsyncStorage.removeItem('user_data').then(() => {
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
