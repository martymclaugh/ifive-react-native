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

    AsyncStorage.getItem('user_data').then((user_data_json) => {

      let user_data = JSON.parse(user_data_json);
      let component = {component: Signup};
      // logic to check if user is already logged in
      // if(user_data != null){
      //   app.authWithCustomToken(user_data.token, (error, authData) => {
      //     if(error){
      //       this.setState(component);
          // }else{
      //       this.setState({component: Account});
      //     }
      //   });
      // }else{
        this.setState(component);
      // }
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
