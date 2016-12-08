import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');

let PRIMARY_COLOR = '#007e9e'

module.exports = StyleSheet.create({
    // styles
    mainContainer: {
      flex: 1
    },
    dropZone: {
      height: 200,
      marginTop: 50,
      backgroundColor: '#2c3e50',
      alignItems: 'center'
    },
    text: {
      marginTop: 25,
      marginLeft: 5,
      marginRight: 5,
      textAlign: 'center',
      color: '#fff'
    },
    draggableContainer: {
      position: 'absolute',
      top: Window.height / 2 - CIRCLE_RADIUS,
      left: Window.width / 2 - CIRCLE_RADIUS,
    },
    circle: {
      backgroundColor: '#1abc9c',
      width: CIRCLE_RADIUS * 2,
      height: CIRCLE_RADIUS * 2,
      borderRadius: CIRCLE_RADIUS
    },
    container: {
      flex: 1,
    },
    // styles
    contact_item: {
      flex: 1,
      padding: 15,
      backgroundColor: '#282828',
      margin: 10,
      alignItems: 'center',
    },
    contact_text: {
      color: '#FFFFFF'
    },
    body: {
      flex: 9,
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    textinput: {
      marginTop: 10,
      height: 30,
      width: 300,
    },
    transparent_button: {
      marginTop: 10,
      padding: 15
    },
    transparent_button_text: {
      color: '#0485A9',
      fontSize: 16
    },
    primary_button: {
      margin: 10,
      padding: 15,
      backgroundColor: '#529ecc'
    },
    primary_button_text: {
      color: '#FFF',
      fontSize: 18
    },
    image: {
      width: 100,
      height: 100
    },
    header: {
      height: 300,
      backgroundColor: PRIMARY_COLOR,
      paddingTop: 20,
      paddingBottom: 0,
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1
    },
    header_item: {
      alignItems: 'center',
      flex: 1
    },
    loading: {
      height: Window.height / 1.5,
      width: Window.width,
      justifyContent: 'center',
      backgroundColor: '#F5FCFF',
      margin: 0
    },
    header_text: {
      fontFamily: 'GeezaPro-Bold',
      color: 'white',
      fontSize: 18
    }
});
