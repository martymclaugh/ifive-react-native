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
import ContactItem from '../components/ContactItem';
import Header from '../components/Header';
import styles from '../styles/common-styles.js';
import Account from './Account';
import HighFive from './HighFive';
import Loading from '../components/Loading';

export default class Contacts extends Component {

  constructor(props){

    super(props);
    this.state = {
      loaded: false,
      contacts: []
    }
  }


  componentWillMount(){
    AsyncStorage.getItem('contacts').then((data) => {
      this.setState({
        contacts: JSON.parse(data),
        loaded: true
      })
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
        <View style={styles.account_back_button}>
          <Button
            text="Back"
            onpress={this.goToAccount.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text}
          />
        </View>
            {
              this.state.contacts.map( (contact, i) => {
                if (contact.phoneNumbers[0] !== undefined){
                  return (
                    <ContactItem
                    key={i}
                    first_name={contact.givenName}
                    last_name={contact.familyName}
                    phone_number={contact.phoneNumbers[0].number}
                    onpress={() => this.sendHighFive(contact)}/>
                  )
                }
            })
          }
        </View>
      </ScrollView>
    );
  }
  sendHighFive(contact){
    if(contact.phoneNumbers.length > 1){
      contact.phoneNumbers.map( (number) => {
        if (number.label === 'mobile'){
          this.storeNumber(number.number, contact.givenName + contact.familyName)
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
    this.setState({
      loaded:false
    })
    this.props.navigator.push({
      component: HighFive
    })
  }
  goToAccount(){
    this.setState({
      loaded:false
    })
    this.props.navigator.push({
      component: Account
    })
  }
  componentWillUnmount(){
    this.setState({
      loaded: false
    })
  }


}
