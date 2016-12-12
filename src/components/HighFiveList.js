import React, { Component } from 'react';
import { View } from 'react-native';
import styles from '../styles/common-styles.js';
import HighFiveItem from '../components/HighFiveItem'

export default class HighFiveList extends Component {
  render(){
    return (
      <View style={styles.container}>
          {this.props.list.map( (highFive) => {
            if (this.props.type === 'giver'){
              return(
                <HighFiveItem
                  key={highFive.id}
                  name={highFive.giver_name}
                  date={highFive.created_at}
                />
              )
            } else {
              return(
                <HighFiveItem
                  key={highFive.id}
                  name={highFive.receiver_name}
                  date={highFive.created_at}
                />
              )
            }
          })}
      </View>
    );
  }
}
