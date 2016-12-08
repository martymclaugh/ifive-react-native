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
    if (!this.state.loaded){
      return (
        <View style={styles.container}>
          <Header text="Contacts"/>
          <View style={styles.body}>
          <Loading />
          </View>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
      <Header text="Contacts" loaded={this.state.loaded} />
      <View style={styles.body}>
        <Button
          text="< Account"
          onpress={this.goToAccount.bind(this)}
          button_styles={styles.transparent_button}
          button_text_styles={styles.transparent_button_text} />
          {
            this.state.contacts.map( (contact, i) => {
            return (
            <ContactItem
              first_name={contact.givenName}
              last_name={contact.familyName}
              phone_number={contact.phoneNumbers[0].number}
              onpress={() => this.sendHighFive(contact)}/>
            )
          })
        }
        </View>
      </ScrollView>
    );
  }
  sendHighFive(contact){
    if(contact.phoneNumbers.length > 1){
      console.log(contact.phoneNumbers);
      contact.phoneNumbers.map( (number) => {
        if (number.label === 'mobile'){
          this.storeNumber(number.number, contact.givenName + ' ' + contact.familyName)
          this.goToHighFive()
        }
      })
    } else {
      this.storeNumber(contact.phoneNumbers[0].number, contact.givenName + ' ' + contact.familyName)
      this.goToHighFive()
    }
  }
  storeNumber(num, name){
    AsyncStorage.multiSet([
      ['friend_number', num],
      ['friend_name', name]
    ])
  }
  goToHighFive(){
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
