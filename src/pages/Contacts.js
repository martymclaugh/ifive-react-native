import React, { Component } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  ScrollView,
  AsyncStorage,
  Image
} from 'react-native';

import Button from '../components/Button';
import ContactItem from '../components/ContactItem'
import Header from '../components/Header';
import styles from '../styles/common-styles.js';
import Account from './Account';
import HighFive from './HighFive'
var Friends = require('react-native-contacts');


export default class Contacts extends Component {

  constructor(props){

    super(props);
    this.state = {
      loaded: false,
      contacts: []
    }

  }


  componentWillMount(){
    Friends.getAll((err, friends) => {
      if(err && err.type === 'permissionDenied'){
        alert('If you want to send High Fives we need your contacts!')
      } else {
        this.setState({
          loaded:true,
          contacts: friends
        })
      }
    })
  }
  render(){

    return (
      <ScrollView style={styles.container}>
      <Header text="" loaded={this.state.loaded} />
      <View style={styles.body}>
        <Button
          text="< Account"
          onpress={this.goToAccount.bind(this)}
          button_styles={styles.transparent_button}
          button_text_styles={styles.transparent_button_text} />
          {this.state.contacts.map( (contact, i) => {
            {console.log(contact);}
            return (
            <ContactItem
              first_name={contact.familyName}
              last_name={contact.givenName}
              phone_number={contact.phoneNumbers[0].number}
              onpress={this.sendHighFive.bind(this)}/>
          )
          })}
        </View>
      </ScrollView>
    );
  }
  sendHighFive(){
    this.props.navigator.push({
      component: HighFive
    })
  }
  goToAccount(){
    this.props.navigator.push({
      component: Account
    })
  }


}
