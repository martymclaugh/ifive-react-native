import React, { Component } from 'react';
import {
  Text,
  View,
  AsyncStorage,
  PanResponder,
  Animated,
  Dimensions,
  Image
} from 'react-native';

import styles from '../styles/common-styles';
import Header from '../components/Header'

export default class HighFive extends Component {

  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      showDraggable: true,
      dropZoneValues: null,
      pan: new Animated.ValueXY()
    }
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {
        dx: this.state.pan.x,
        dy: this.state.pan.y
      }]),
      onPanResponderRelease: (e, gesture) => {
        if (this.isDropZone(gesture)){
          // send push notification, or text
          this.setState({
            showDraggable: false
          })
        } else {
          Animated.spring(
              this.state.pan,
              {toValue:{x:0,y:0}}
          ).start();
        }
      }
    })
  }
  isDropZone(gesture) {
    var dz = this.state.dropZoneValues;
    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
  }

  componentDidMount(){
    this.setState({
      loaded: true
    })
  }
  setDropZoneValues(event){
    this.setState({
      dropZoneValues: event.nativeEvent.layout
    })
  }
  render(){
    return (
      <View style={styles.mainContainer}>
        <View style={styles.dropZone}>
          <Image
          onLayout={this.setDropZoneValues.bind(this)}
          source={require('../images/receiving_five.png')}/>
        </View>
        {this.renderDraggable()}
      </View>
    );
  }

  renderDraggable(){
    if (this.state.showDraggable){
      return (
        <View style={styles.draggableContainer}>
        <Animated.View
                {...this.panResponder.panHandlers}
                style={[this.state.pan.getLayout()]}>
                <Image source={require('../images/sending_five.png')}/>
            </Animated.View>
        </View>
      );
    }
  }
}
