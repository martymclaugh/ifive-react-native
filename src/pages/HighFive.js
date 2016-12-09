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
import Header from '../components/Header';
import Account from './Account';
import Loading from '../components/Loading';
import Button from '../components/Button';
import Contacts from './Contacts'

export default class HighFive extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      showDraggable: true,
      dropZoneValues: null,
      phone_number: null,
      token: null,
      userId: null,
      friend_name: '',
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
          this.sendHighFive()
          this.setState({
            showDraggable: false
          })
          AsyncStorage.multiRemove(['friend_number', 'friend_name']).then(() => {
            this.props.navigator.push({
              component: Account
            });
          });
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
    AsyncStorage.multiGet(['userId', 'friend_number', 'friend_name', 'token']).then( (data) => {
      if (data[1][1] !== null){
          this.setState({
            phone_number: data[1][1],
            userId: data[0][1],
            friend_name: data[2][1],
            token: data[3][1],
            loaded: true
          })
      } else {
        alert('This person does not have a mobile number')
        this.props.navigator.push({
          component: Account
        })
      }
    })
  }
  componentWillUnmount(){
    setState({
      loaded: false
    })
  }
  setDropZoneValues(event){
    this.setState({
      dropZoneValues: event.nativeEvent.layout
    })
  }
  sendHighFive(){
    this.setState({
      loaded: false
    })
    fetch('http://localhost:3000/users/' + this.state.userId + '/high_fives', {
      method: 'POST',
      headers: {
        'Authorization': this.state.token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone_number: this.state.phone_number,
        friend_name: this.state.friend_name,
        user_id: this.state.userId
      })
    }).then( (data) => data.json().then((data) => {
      if (data.error){
        alert(data.error)
      } else {
        alert('You sent a High Five!')
      }
    }))
  }
  render(){
    if (!this.state.loaded){
      return (
        <View style={styles.container}>
          <Header text={"High Five " + this.state.friend}/>
          <View style={styles.body}>
          <Loading />
          </View>
        </View>
      )
    }
    return (
      <View style={styles.mainContainer}>

        <View style={styles.dropZone}>
          <Image
          onLayout={this.setDropZoneValues.bind(this)}
          source={require('../images/receiving_five.png')}/>
        </View>
        {this.renderDraggable()}
        <View style={styles.high_five_footer}>
          <Button
            text="Back"
            style={styles.high_five_back}
            onpress={this.goToAccount.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />
          <Text style={styles.high_five_text}>Send {this.state.friend_name} a High Five!</Text>
        </View>
      </View>
    );
  }
  goToAccount(){
    this.setState({
      loaded:false
    })
    this.props.navigator.push({
      component: Contacts
    })
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
