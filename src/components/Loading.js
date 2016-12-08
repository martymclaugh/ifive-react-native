import React, { Component } from 'react';
import {
  ActivityIndicator,
  View
} from 'react-native';
import styles from '../styles/common-styles.js';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animating: true,
    };
  }
  render(){
    return (
      <View style={styles.loading}>
      {  !this.props.loaded &&
        <ActivityIndicator
        animating={this.state.animating}
        style={{height: 80}}
        size="large" />
      }
      </View>
    );
  }
}
