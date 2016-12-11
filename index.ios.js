/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  AsyncStorage,
  Text,
  PushNotificationIOS,
  View
} from 'react-native';

import Signup from './src/pages/Signup';
import Account from './src/pages/Account';
import Header from './src/components/Header';
import styles from './src/styles/common-styles.js';

class iFive extends Component {

  constructor(props){
    super(props);
    this.state = {
      component: null,
      loaded: false
    };
  }
  componentWillMount(){
    PushNotificationIOS.requestPermissions();
    PushNotificationIOS.addEventListener('register', function(device_token){
     alert('You are registered and the device token is: ' + device_token)
     AsyncStorage.setItem('device_token', device_token)
    });
    PushNotificationIOS.addEventListener("notification", function(notification){
     alert('You have received a new notification!' + notification);
    });
    AsyncStorage.getItem('token').then((token) => {
      console.log(token);
      let component = {component: Signup};
      // logic to check if user is already logged in
      if(token != null){
            this.setState({component: Account});
      }else{
        this.setState(component);
      }
    });
  }
  render(){

    if(this.state.component){
      return (
        <Navigator
          initialRoute={{component: this.state.component}}
          configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene={(route, navigator) => {
            if(route.component){
              return React.createElement(route.component, { navigator });
            }
          }}
        />
      );
    }else{
      return (
        <View style={styles.container}>
          <Header text="iFive" loaded={this.state.loaded} />
          <View style={styles.body}></View>
        </View>
      );
    }

  }

}
AppRegistry.registerComponent('iFive', () => iFive);
